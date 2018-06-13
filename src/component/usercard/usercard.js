import React from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends React.Component {

	static propTypes = {
		userlist: PropTypes.array.isRequired
	}

	handleClick(v) {
		this.props.history.push(`/chat/${v.user}`)
	}

	render() {

		const Header = Card.Header
		const Body = Card.Body

		return (
			<div>
				<WingBlank>
					{this.props.userlist.map( v => (
						v.avatar?
						(<Card key={v._id} onClick={(v) => this.handleClick(v)}>
							<Header
								title={v.user}
								thumb={require(`../img/${v.avatar}.png`)}
								extra={<span>{v.title}</span>}
							></Header>
							<Body>
								{ v.type==='boss'? <div>公司：{v.company}</div> : null}
								{ v.desc } 
								{ v.type==='boss'? <div>薪资：{v.money}</div> : null}
							</Body>
						</Card>) : null
					))}
				</WingBlank>
			</div>
		)
	}

}

export default UserCard