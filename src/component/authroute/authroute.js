import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'

@withRouter
@connect(
	state => state.user,
	{ loadData }
)
class AuthRoute extends React.Component {
	componentDidMount() {
		//如果已经在登入页或者注册页则不跳转
		const publicList = ['/login', '/register']
		const pathname = this.props.location.pathname
		if (publicList.indexOf(pathname) > -1) {
			return null
		}

		//获取用户信息
		axios.get('/user/info').then(
			res => {
				if (res.status===200) {
					if (res.data.code===0) {
						//有登入信息
						this.props.loadData(res.data.data)
					} else {
						this.props.history.push('/login')
					}
				}
			}
		)
	}
	render() {
		return null
	}
}

export default AuthRoute