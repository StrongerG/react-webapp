import React from 'react'
import Logo from '../../component/logo/logo'
// eslint-disable-next-line
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { login } from '../../redux/user.redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

@connect(
	state => state.user,
	{ login }
)
class Login extends React.Component {

	constructor(props){
    super(props)
    this.state = {
    	user: '',
    	pwd: '',
    }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  register = () => {
  	//Router4和3不一样的地方 history等
  	//console.log(this.props.history) 
  	this.props.history.push('/register');
  }

  handleLogin() {
  	this.props.login(this.state)
  }

  handleChange(key, val) {
  	this.setState({
  		//不加中括号，key就成字符串了 把这个看成state[key]=val
  		[key]: val
  	})
  }

	render() {
		return (
			<div>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
				<Logo />
				<WingBlank>
					<List>
						{this.props.msg? <p className='error-msg'>{this.props.msg}</p> :null}
						<InputItem onChange={v => this.handleChange('user', v)}>用户</InputItem>
						<WhiteSpace />
						<InputItem type='password' onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
					</List>
					<Button type="primary" onClick={this.handleLogin}>登入</Button>
					<WhiteSpace />
					<Button onClick={this.register} type="primary">注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Login