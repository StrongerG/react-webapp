import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'

function Msg() {
	return <div>msg</div>
}

@connect(
	state => state
)
class Dashboard extends React.Component {

	render() {
		const { pathname } = this.props.location
		// console.log(pathname)
		const user = this.props.user

		const navList = [
			{
				path     : '/boss',
        text     : '牛人',
        icon     : 'boss',
        title    : '牛人列表',
        component: Boss,
        hide     :user.type==='genius'
			},
			{
				path     : '/genius',
        text     : 'Boss',
        icon     : 'job',
        title    : 'BOSS列表',
        component: Genius,
        hide     :user.type==='boss'
			},
			{
				path     : '/msg',
        text     : '消息',
        icon     : 'msg',
        title    : '消息列表',
        component: Msg,
			},
			{
				path     : '/me',
        text     : '我',
        icon     : 'user',
        title    : '个人中心',
        component: User,
			}
		]



		return (
			<div className="dashboard">
				<div>
					<NavBar mode="dark" className="fixed-header">
						{navList.find(v => v.path===pathname).title}
					</NavBar>
				</div>
				<div style={{marginTop: 50}}>
					<Switch>
						{navList.map( v => (
							<Route key={v.icon} path={v.path} component={v.component}></Route>
						))}
					</Switch>
				</div>

				<NavLinkBar data={navList}></NavLinkBar>
			</div>
		)
	}
}

export default Dashboard