import React from 'react'
// eslint-disable-next-line
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile';
import Logo from '../../component/logo/logo'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
	state => state.user,
	{ register }
)
class Register extends React.Component {

	constructor(props){
    super(props);
    this.state = {
    	user: '',
    	pwd: '',
    	repeatpwd: '',
    	type: 'genius'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange(key, val) {
  	this.setState({
  		//不加中括号，key就成字符串了 把这个看成state[key]=val
  		[key]: val
  	})
  }
  handleRegister() {
  	// console.log(this.props)
  	this.props.register(this.state)
  	
  }

	render() {
		const RadioItem = Radio.RadioItem
		return (
			<div>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
				<Logo />
				<List>
					{this.props.msg? <p className='error-msg'>{this.props.msg}</p> :null}
					<InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
					<WhiteSpace />
					<InputItem onChange={v => this.handleChange('pwd', v)} type='password'>密码</InputItem>
					<WhiteSpace />
					<InputItem onChange={v => this.handleChange('repeatpwd', v)} type='password'>确认密码</InputItem>
	        <WhiteSpace />
					<RadioItem 
						checked={this.state.type==='genius'}
						onChange={() => this.handleChange('type', 'genius')}
					>
						牛人
					</RadioItem>
					<RadioItem 
						checked={this.state.type==='boss'} 
						onChange={() => this.handleChange('type', 'boss')}
					>
						老板
					</RadioItem>
					<Button type="primary" onClick={this.handleRegister}>注册</Button>
				</List>
			</div>
		)
	}
}

export default Register