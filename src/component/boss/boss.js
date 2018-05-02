import React from 'react'

/*import { Card, WingBlank } from 'antd-mobile'*/
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
	state => state.chatuser,
	{ getUserList }
)
class Boss extends React.Component {

	componentDidMount() {
		this.props.getUserList('genius')
		//将状态一律放到redux中统一管理
		/*axios.get('/user/list?type=genius')
			.then( res => {
				if (res.data.code === 0) {
					dispatch(userList(res.data.data))
				}
			})*/
	}
	render() {
		return (
			<UserCard userlist={this.props.userList}></UserCard>
		)
	}
}

export default Boss