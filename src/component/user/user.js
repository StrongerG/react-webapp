import React from 'react'
import { connect } from 'react-redux'
import { logoutSubmit } from '../../redux/user.redux'
import { Result, List, WhiteSpace, Button, WingBlank, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { Redirect } from 'react-router-dom'

@connect(
	state => state.user,
	{ logoutSubmit }
)
class User extends React.Component {

	constructor(props) {
		super(props)
		this.logOut = this.logOut.bind(this)
	}

	logOut() {
		// browserCookie.erase('userid')
		// window.location.href = window.location.href
		// console.log('logout')
		const alert = Modal.alert

		alert('注销', '您确认要退出登入吗？', [
			{ text: 'Cancel', onPress: () => console.log('cancel') },
			{ text: 'Ok', onPress: () => {
				browserCookie.erase('userid')
				this.props.logoutSubmit()
			} },
		])
	}

	render() {

		const props = this.props
		const Item = List.Item
		const Brief = Item.Brief
		return props.user ?(
			<div>
				<Result
					img={<img src={require(`../img/${props.avatar}.png`)} alt="avatar"/>}
					title={props.user}
					message={props.type==='boss'? props.company : null}
				/>

				<List renderHeader={() => '简介'}>
					<Item multipleLine>
						{props.title}
						{this.props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
						{props.money? <Brief>薪资：{props.money}</Brief> : null}
					</Item>
				</List>
				<WhiteSpace />
				<WingBlank>
				<Button onClick={this.logOut} type="primary">退出登入</Button>
				</WingBlank>
			</div>
		 ): <Redirect to={props.redirectTo}></Redirect>
	}
}

export default User