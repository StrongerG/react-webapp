import React from 'react';
import { List, InputItem, NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
// import io from 'socket.io-client'
// const socket = io('localhost:9095')

@connect(
	state => state, 
	{ getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {
	constructor(props) {
		super(props)
		this.state = { text: '' }
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount() {
		if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
		}
		this.props.recvMsg()
	}
	
	handleSubmit() {
		// socket.emit('sendmsg', { text: this.state.text })
		// this.setState({ text: '' })
		// 自己的id  to是接受人的id
		const from = this.props.user._id
		const to = this.props.match.params.userid
		const msg = this.state.text
		this.props.sendMsg({ from, to ,msg })
		this.setState({ text: ''})
	}

	render() {
		// console.log(this.props)
		// 消息接收人的 _id
		const userid = this.props.match.params.user
		const Item = List.Item
		const users = this.props.chat.users
		if (!users[userid]) {
			return null
		}
		return (
			<div id="chat-page">
				<NavBar 
					mode="dark"
					icon={<Icon type="left" />}
					onLeftClick={() => {
						this.props.history.goBack()
					}}
				>
					{ users[userid].name }
				</NavBar>
				<div>
					{this.props.chat.chatmsg.map((item, i) => {
						const avatar = require(`../img/${users[item.from].avatar}.png`)
						return item.from === userid ? (
							<List key={i}>
								<Item thumb={avatar}>{ item.content }</Item>
							</List>
						) : (
							<List key={i}>
								<Item
									extra={<img src={avatar} alt="hello world!" />}
									className="chat-me"
								>{ item.content }</Item>
							</List>
						)
					})}
				</div>
				<div className="stick-footer">
					<List>
						<InputItem
							placeholder="请输入"
							value={this.state.text}
							onChange={v => {this.setState({ text: v })}}
							extra={<span onClick={this.handleSubmit}>发送</span>}
						/>
					</List>
				</div>
			</div>
		)
	}
}

export default Chat