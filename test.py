from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import create_engine
import pandas as pd
from sqlalchemy.orm import scoped_session, sessionmaker, relationship
import os
data = pd.read_csv('books.csv')


Base = declarative_base()
# engine = create_engine(os.getenv('DATABASE_URL'), echo=False)
engine = create_engine(
    'postgres://eriiqwwnobgpfp:0910bf434fd8657e7981d9d23d1da7463449291139472fcce8551622d9bbcc6f@ec2-35-172-73-125.compute-1.amazonaws.com:5432/d72nbdo9dc9lcu', echo=False)


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
	avgrating = Column(Integer, default=0)
	totalratings = Column(Integer, default=0)
	reviews = Column(Integer, default=0)

class bookreviews(Base):
	 __tablename__ = 'review'
	 id = Column(Integer, primary_key=True)
	 isbn = Column(String(40), nullable=False)
	 review = Column(String(300), nullable=False)
	 rating = Column(Integer,default=0)
	 email = Column(String(40), ForeignKey('users.email'), nullable=False)

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session=Session()

# data=session.query(bookstable).filter(bookstable.id==1)
# for row in data:
#    print ("Name: ",row.title)


name=session.query(bookstable).filter(bookstable.id==2)[0]

print(name.title)