import React from 'react';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util';
// import io from 'socket.io-client'
// const socket = io('localhost:9095')

@connect(
	state => state, 
	{ getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
			text: '',
			showEmoji: false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount() {
		if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()
		}
		// 放入willMount理论上更合理些
		// const to = this.props.match.params.user
		// this.props.readMsg(to)
	}
	
	componentWillMount() {
		const to = this.props.match.params.user
		this.props.readMsg(to)
	}

	fixCarousel() {
		setTimeout(function() {
			window.dispatchEvent(new Event('resize'))
		}, 0)
	}

	handleSubmit() {
		// socket.emit('sendmsg', { text: this.state.text })
		// this.setState({ text: '' })
		// 自己的id  to是接受人的id
		const from = this.props.user._id
		const to = this.props.match.params.user
		const msg = this.state.text
		this.props.sendMsg({ from, to ,msg })
		this.setState({ 
			text: '',
			showEmoji: false
		})
	}

	render() {

		const emoji = '😀 😂 😋 😎 🤗 😏 😝 🤐 🙁 😱 😇 🙄'.split(' ').map(v => ({text: v}))
										

		// console.log(this.props)
		// 消息接收人的 _id
		const userid = this.props.match.params.user
		const Item = List.Item
		const users = this.props.chat.users
		// if (!users[userid]) {
		// 	return null
		// }

		const chatid = getChatId(userid, this.props.user._id)
		const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
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
					{chatmsgs.map((item, i) => {
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
							extra={
							<div>
								<span 
									style={{"marginRight": 15}}
									onClick={() => {
										this.setState({showEmoji: !this.state.showEmoji})
										this.fixCarousel()
									}}
								>😀</span>
								<span onClick={this.handleSubmit}>发送</span>
							</div>
						}
						/>
					</List>
					{this.state.showEmoji ? 
						<Grid
						data={emoji}
						columnNum={4}
						carouselMaxRow={2}
						isCarousel={true}
						onClick={v => {
							this.setState({
								text: this.state.text + v.text
							})
						}}
						/> : null}
				</div>
			</div>
		)
	}
}

export default Chat