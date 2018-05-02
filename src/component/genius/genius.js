import React from 'react'


import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
	state => state.chatuser,
	{ getUserList }
)
class Genius extends React.Component {

	componentDidMount() {
		this.props.getUserList('boss')
		//将状态一律放到redux中统一管理
		/*axios.get('/user/list?type=genius')
			.then( res => {
				if (res.data.code === 0) {
					dispatch(userList(res.data.data))
				}
			})*/
	}

	render() {
		// console.log(this.props.userList)
		return (
			<UserCard userlist={this.props.userList}></UserCard>
		)
	}
}

export default Genius