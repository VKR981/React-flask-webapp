import time
import json
import jwt
import datetime
import requests
import bcrypt
import os
from flask import Flask, request, jsonify, render_template
from flask_session import Session
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey

from flask_cors import CORS
from functools import wraps
pd=[]

app = Flask(__name__,static_folder="build/static", template_folder="build")



app.config["SECRET_KEY"] = os.getenv('SECRET_KEY')
app.config["WTF_CSRF_ENABLED"] = False

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"


CORS(app)

Base = declarative_base()

engine = create_engine(os.getenv('DATABASE_URL'), echo=False)


class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(40), unique=True, nullable=False)
    email = Column(String(40), unique=True, nullable=False)
    password = Column(String(80), nullable=False)
    review = relationship('bookreviews', backref='user')


class bookstable(Base):
    __tablename__ = 'books'
    id = Column(Integer, primary_key=True)
    isbn = Column(String(40), unique=True, nullable=False)
    title = Column(String(80), nullable=False)
    author = Column(String(80), nullable=False)
    year = Column(Integer, nullable=False)
    avgrating = Column(Integer, nullable=False)
    totalratings = Column(Integer, nullable=False)
    reviews = Column(Integer, nullable=False)


class bookreviews(Base):
    __tablename__ = 'review'
    id = Column(Integer, primary_key=True)
    isbn = Column(String(40), nullable=False)
    review = Column(String(300), nullable=False)
    rating = Column(Integer)
    user_id = Column(Integer)
    email = Column(String(40), ForeignKey('users.email'), nullable=False)


SQLSession = sessionmaker(bind=engine)
session = SQLSession()


def emailcheck(email):

    for i in session.query(Users.email):

        if i[0] == email:
            return 1
    else:
        0


def register(username, email, password):

    if not emailcheck(email):
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user = Users(username=username, email=email,
                     password=hashed.decode('utf-8'))
        session.add(user)
        session.commit()
        return 'registeration successfull'
    else:
        return 'email already exists'


def login(email, password):
    if emailcheck(email):
        hashed = session.query(Users.password).filter(
            Users.email == email)[0][0]

        if bcrypt.hashpw(password.encode('utf-8'), hashed.encode('utf-8')) == hashed.encode('utf-8'):
            return 'login successfull'
        else:

            return 'password mismatch'
    else:
        return 'unregistered email'


def fetchratings(isbn):
    res = requests.get('https://www.goodreads.com/book/review_counts.json',
                       params={"key": "cDo4XqMrHK7BAvVWXJVkQ", "isbns": isbn})

    data = res.json()['books']
    return data


def fetchratingsall(isbn_list):

    url = 'https://www.goodreads.com/book/review_counts.json?isbns='
    for i in isbn_list:
        url = url+str(i)+'%2C'
    url = url+'&key='+os.getenv('GD_API_KEY')
    print(url)
    res = requests.get(url)

    data = res.json()['books']
    d = pd.DataFrame(data)
    return d


def fetchbooks(page):

    data = {}
    isbn_list = []

    for j in range((16*page+1), (16*page+17)):
        i = session.query(bookstable).get(j)
        # gddata=fetchratings(i.isbn)
        isbn_list.append(i.isbn)
        data[i.id] = {'isbn': i.isbn,
                      'title': i.title,
                      'author': i.author,
                      'year': i.year,
                      'localavgrating': float(i.avgrating),
                      'localtotalratings': int(i.totalratings),
                      'reviews': i.reviews}
    gddata = fetchratingsall(isbn_list)

    data2 = pd.DataFrame(data.values())
    merged = pd.merge(left=data2, right=gddata,
                      left_on='isbn', right_on='isbn')
    merged['average_rating'] = merged['average_rating'].astype(float)
    merged['ratings_count'] = merged['ratings_count'] + \
        merged['localtotalratings']
    merged['average_rating'] = (merged['average_rating']*merged['ratings_count'] +
                                merged['localavgrating']*merged['localtotalratings'])/merged['ratings_count']
    merged = merged.to_json(orient='records')
    return merged


def searchbooks(query, page):

    data = {}
    isbn_list = []
    for keyword in query.split():
        result = session.query(bookstable).filter(
            bookstable.title.contains(keyword))[(16*page+1):(16*page+17)]
        for book in result:
            isbn_list.append(book.isbn)
            data[book.id] = {
                'isbn': book.isbn,
                'title': book.title,
                'author': book.author,
                'year': book.year,
                'localavgrating': float(book.avgrating),
                'localtotalratings': int(book.totalratings),
                'reviews': book.reviews}

    data2 = pd.DataFrame(data.values())
    if not (len(data2.index)):
        return data2.to_json(orient='records')
    gddata = fetchratingsall(isbn_list)
    merged = pd.merge(left=data2, right=gddata,
                      left_on='isbn', right_on='isbn')

    merged['average_rating'] = merged['average_rating'].astype(float)
    merged['ratings_count'] = merged['ratings_count'] + \
        merged['localtotalratings']
    merged['average_rating'] = (merged['average_rating']*merged['ratings_count'] +
                                merged['localavgrating']*merged['localtotalratings'])/merged['ratings_count']
    merged = merged.to_json(orient='records')
    return merged


def fetchreviews(isbn):
    data = {}

    for i in session.query(bookreviews).filter(bookreviews.isbn == isbn):

        data[i.id] = {'review': i.review,
                      'rating': i.rating,
                      'userid': i.user.username
                      }

    data = pd.DataFrame(data.values())
    data = data.to_json(orient='records')

    return data


def savereview(isbn, review, rating, email):
    userid = session.query(Users.id).filter(Users.email == email)
    userid = userid[0][0]
    entry = session.query(bookreviews).filter(
        bookreviews.isbn == isbn).filter(bookreviews.email == email).first()
    if entry:
        book = session.query(bookstable).filter(bookstable.isbn == isbn)[0]
        book.avgrating = (book.avgrating*book.totalratings +
                          int(rating)-entry.rating)/(book.totalratings)
        entry.review = review
        entry.rating = rating

    else:
        entry = bookreviews(isbn=isbn, review=review,
                            rating=rating, email=email)
        session.add(entry)
        book = session.query(bookstable).filter(bookstable.isbn == isbn)[0]
        book.avgrating = (book.avgrating*book.totalratings +
                          int(rating))/(book.totalratings+1)
        book.totalratings = book.totalratings+1
        book.reviews = book.reviews+1

    session.commit()


class Registeration(FlaskForm):
    username = StringField('username', validators=[
                           InputRequired(), Length(min=2, max=40)])
    email = StringField('email', validators=[
                        InputRequired(), Length(min=2, max=40)])
    password = StringField('password', validators=[
                           InputRequired(), Length(min=8, max=80)])
    cpassword = StringField('password', validators=[
                            InputRequired(), Length(min=8, max=80)])


class Loginform(FlaskForm):
    email = StringField('username', validators=[
                        InputRequired(), Length(min=2, max=40)])
    password = StringField('password', validators=[
                           InputRequired(), Length(min=8, max=80)])


def tokenvalidator():

    token = request.form['token']

    if not token:
        return {'token missing'}
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'])
    except:
        return {'invalid token'}

    if data['email'] != request.form['email']:
        return 0
    else:
        return 1


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')
    


@app.route('/register', methods=['POST', 'GET'])
def userregisteration():

    form = Registeration()
    if form.validate_on_submit():
        if (form.data['password'] != form.data['cpassword']):
            return 'password mismatch'
        else:
            return register(form.data['username'], form.data['email'], form.data['password'])

    return 'invalid fields'


@app.route('/login', methods=['POST', 'GET'])
def userlogin():
    form = Loginform()
    if form.validate_on_submit():
        passcheck = login(form.data['email'], form.data['password'])
        if passcheck == 'login successfull':
            username = session.query(Users.username).filter(Users.email == form.data['email'])[0][0]
            token = jwt.encode({'email': form.data['email'],'username':username, 'exp': datetime.datetime.utcnow(
            )+datetime.timedelta(hours=48)}, app.config['SECRET_KEY'])
            return {'token': token.decode('UTF-8')}
        else:
            return passcheck
    else:
        return 'invalid fields'


@app.route('/books/<int:page_id>', methods=['POST', 'GET'])
def sendbooks(page_id):
    return fetchbooks(page_id)


@app.route('/reviews/<string:isbn>', methods=['POST', 'GET'])
def reviews(isbn):
    return fetchreviews(isbn)


@app.route('/submitreview', methods=['POST', 'GET'])
def submitreview():
    if tokenvalidator():
        savereview(request.form['isbn'], request.form['review'],
                   request.form['rating'], request.form['email'])
        return '1'
    else:
        return '0'


@app.route('/search/<string:query>/<int:page>', methods=['POST', 'GET'])
def search(query, page):

    return searchbooks(query, page)


app.run(host='localhost')
