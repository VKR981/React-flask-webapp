import React from 'react'
import { Container, Popup, Item, Button, Segment, Comment, Form, Header, TextArea, TransitionablePortal, Rating } from 'semantic-ui-react'
import { Component } from 'react'
import axios from 'axios';
import Navbar from './Navbar'
import jwt_decode from 'jwt-decode'
import { profileicon } from './pp.png'
import Footernav from './Footer'

class BookMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,
      review: '',
      email: '',
      token: '',
      isbn: '',
      loginstatus: false

    }
  }

  componentWillMount() {

    axios.get('/reviews/' + this.props.match.params.isbn).then(res => { this.setState({ data: res.data }); })


    const token = localStorage.usertoken
    if (token) {
      const decoded = jwt_decode(token)
      this.setState({

        email: decoded.email,
        token: token,
        isbn: this.props.match.params.isbn,
        loginstatus: true

      })
    }

  }
  imgurlgen(isbn) {
    return 'http://covers.openlibrary.org/b/isbn/' + isbn + '-L.jpg';
  }

  handlechange(e, d) {
    this.setState({ review: d.value })
  }

  handlereviewsubmit(event, data) {

    const formdata = new FormData()
    formdata.append('email', this.state.email)
    formdata.append('review', this.state.review)
    formdata.append('rating', this.state.rating)
    formdata.append('token', this.state.token)
    formdata.append('isbn', this.state.isbn)


    axios.post("/submitreview", formdata,).then(res => { if (res.data) { this.state.data.push({ userid: this.state.email, review: this.state.review, rating: this.state.rating }) } })

  }
  handleRate = (e, { rating, maxRating }) => {
    this.setState({ rating: rating })
  }
  render() {
    const data = this.props.match.params;
    const { open } = this.state
    return (
      <div>

        <Navbar style={{ marginbottom: '2em' }} />

        <Segment basic />
        <Container>
          <Segment compact>
            <Item.Group divided inverted>
              <Item>
                <Item.Image size='small' src={this.imgurlgen(data.isbn)} />

                <Item.Content>
                  <Item.Header as='a'>{data.title}</Item.Header>
                  <Item.Meta>
                    <p>Author:{data.author}</p>
                  </Item.Meta>
                  <Item.Extra>
                    <p>Average rating:{data.avgrating} </p>
                    <p>Total ratings:{data.totalratings}</p>
                    <p>Year:{data.year}</p>
                    <Rating icon='star' defaultRating={Math.round(data.avgrating)} maxRating={5} disabled />
                  </Item.Extra>
                  <TransitionablePortal
                    open={open}

                    openOnTriggerClick
                    trigger={
                      <Popup
                        disabled={this.state.loginstatus}
                        trigger={<Button
                          content='Write review'
                          labelPosition='left' icon='edit' primary onClick={res => { if (this.state.loginstatus) { this.setState({ open: true }) } }}



                        />}
                        content="You have to sign in first."
                        basic
                      />

                    }
                  >
                    <Segment
                      style={{ left: '40%', position: 'fixed', top: '30%', zIndex: 1000, }}
                      size='massive'
                    >

                      <Form >
                        <Form.Field
                          width='16'
                          control={TextArea}
                          onChange={(e, d) => { this.setState({ open: true }); this.handlechange(e, d) }}
                          label='press submit when you are done'
                          placeholder='Less than 300 charaters...'
                        />
                        <Rating icon='star' defaultRating={this.state.rating} maxRating={5} onRate={this.handleRate} />
                        <Button onClick={(e, d) => { this.setState({ open: false }); this.handlereviewsubmit(e, d) }}>Submit</Button>
                      </Form>

                    </Segment>
                  </TransitionablePortal>

                </Item.Content>


              </Item>
            </Item.Group>
          </Segment>
        </Container><Container>
          <Comment.Group>

            <Header as='h3' dividing style={{ margin: "1em " }}>
              Reviews
    </Header>
            {this.state.data.map(comment => (
              <Comment>
                <Comment.Avatar src={require('../pp.png')} />
                <Comment.Content>
                  <Comment.Author as='a'>{comment.userid}</Comment.Author>
                  <Comment.Metadata>
                    <div>{comment.time}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.review}</Comment.Text>
                  <Comment.Actions>
                    <Rating icon='star' defaultRating={comment.rating} maxRating={5} disabled />
                  </Comment.Actions>
                </Comment.Content>
              </Comment>

            ))}


          </Comment.Group>


        </Container>
        <Segment basic />
        <Footernav />
      </div>

    );
  }

}

export default BookMain;

