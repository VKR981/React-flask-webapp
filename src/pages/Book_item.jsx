import React, { Component } from 'react'
import { Segment, Modal, Dimmer, Rating, Card, Image, Icon, Container, Pagination, Header } from 'semantic-ui-react'
import axios from 'axios';
import Navbar from './Navbar'
import { loadinganim } from './loading.gif'
import Footernav from './Footer'

class Bookitem extends Component {

	constructor(props) {
		super(props);

		this.state = {

			page: 0,
			data2: [],
			email: '',
			open: false,
			active: true,
			search: false,
			searchresults: true



		};
		this.PageChange = this.PageChange.bind(this)
	}

	componentWillMount() {

		const query = this.props.match.params.query

		if (query) {

			this.setState({ active: true, search: true })
			axios.get('/search/' + this.props.match.params.query + '/' + this.state.page).then(res => { if (!res.data.length) { this.setState({ searchresults: false }) } this.setState({ data2: res.data }); this.setState({ active: false }); })
		}
		else {

			this.setState({ active: true })
			axios.get('/books/' + this.state.page).then(res => { this.setState({ data2: res.data }); this.setState({ active: false }) })

		}


	}

	componentWillReceiveProps(nextProps) {
		const query = this.props.match.params.query

		if (query) {

			this.setState({ active: true, search: true, page: 0 })
			axios.get('/search/' + nextProps.match.params.query + '/' + this.state.page).then(res => { if (!res.data.length) { this.setState({ searchresults: false }) } else { this.setState({ data2: res.data }); this.setState({ searchresults: true }) } this.setState({ active: false }); })
		}
		else {

			this.setState({ active: true })
			axios.get('/books/' + this.state.page).then(res => { this.setState({ data2: res.data }); this.setState({ active: false }) })

		}
	}


	PageChange(event, data) {

		if (this.state.search) {
			this.setState({ active: true, searchresults: true })
			this.setState({ data2: [], page: (data.activePage - 1) })
			axios.get('/search/' + this.props.match.params.query + '/' + (data.activePage - 1)).then(res => { if (!res.data.length) { this.setState({ searchresults: false }) } this.setState({ data2: res.data }); this.setState({ active: false }) })

		}

		else {
			this.setState({ active: true })
			this.setState({ page: (data.activePage - 1) })
			this.setState({ data2: [] })
			axios.get('/books/' + (data.activePage - 1)).then(res => { this.setState({ data2: res.data }); this.setState({ active: false }) })
		}




	}

	genurl(isbn) {

		let url = 'http://covers.openlibrary.org/b/isbn/' + isbn + '-L.jpg';
		return url;
	}

	genbookurl(isbn, title, author, avgrating, totalratings, reviews, year) {
		let url = '/reviews/' + isbn + '/' + title + '/' + author + '/' + avgrating + '/' + totalratings + '/' + reviews + '/' + year;
		return url
	}

	render() {
		const { active } = this.state


		return (
			<div>

				<Dimmer active={active} page>
					<Image src={require('../loading.gif')} />
					<p>Fetching data</p>
				</Dimmer>
				<Navbar style={{ marginbottom: '2em' }} />

				<style>
					{`
       body {
        
  
      }
      
    }
    `}
				</style>
				<Segment basic />
				{(!active && this.state.searchresults) && <Container>

					<div style={{ padding: "0em 0em", textAlign: "center" }}>
						<div style={{ textAlign: "center", padding: '4rem' }}>
							<Pagination defaultActivePage={1} activePage={this.state.page + 1} totalPages={10} onPageChange={this.PageChange} /></div>

						<Card.Group stackable={true} doubling={true} >

							{(this.state.data2.map(card => (
								<Card href={this.genbookurl(card.isbn, card.title, card.author, (card.localavgrating).toFixed(2), card.localtotalratings, card.reviews, card.year)} style={{ width: '250px' }}>

									<Image src={this.genurl(card.isbn)} size='massive' wrapped style={{ width: '250px' }} />

									<Card.Content>
										<Card.Header>{card.title}</Card.Header>
										<Card.Meta>
											<span className='date'>Author:{card.author}</span>
										</Card.Meta>
										<Card.Meta>
											<span className='date'>Year:{card.year}</span>
										</Card.Meta>
										<Card.Content >
											<Rating icon='star' defaultRating={Math.round(card.localavgrating, 2)} maxRating={5} disabled />
										</Card.Content>
										<Card.Description>
											{(card.localavgrating).toFixed(2)} Avg rating, {card.localtotalratings} total ratings.
      									</Card.Description>
									</Card.Content>
									<Card.Content >
										<a>
											<Icon name='pencil alternate' />
											{card.reviews} Reviews
      									</a>
									</Card.Content>
								</Card>
							)))}

						</Card.Group>


					</div>
					<div style={{ textAlign: "center", padding: '4rem' }}>
						<Pagination defaultActivePage={1} activePage={this.state.page + 1} totalPages={10} onPageChange={this.PageChange} /></div>

				</Container>}
				{!this.state.searchresults && <Header textAlign='center' content='No results' />}
				<Footernav />
			</div>
		)
	}
}

export default Bookitem