import axios from 'axios'
import io from 'socket.io-client'

const socket = io('localhost:9095')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ  = 'MSG_READ'

const initState = {
  chatmsg: [],
  users: {},
	unread: 0
}

export function chat(state=initState, action) {
	switch(action.type) {
		case MSG_LIST:
			//					unread的消息数目的 对象是登入的当前用户
			return {...state,users: action.payload.users, chatmsg: [...action.payload.msgs], unread: action.payload.msgs.filter(v => (!v.read && v.to === action.payload.userid)).length}
		case MSG_RECV:
			const idNum = action.payload.msg.to === action.payload.userid ? 1 : 0
			// console.log(idNum)
			return {...state, chatmsg: [...state.chatmsg, action.payload.msg], unread: state.unread + idNum}
		case MSG_READ:
			const { from, num } = action.payload
		// 因为 与后端 readMsg这一交互中  只是后端改变 chatmsg消息数组, 且并没有传到前端, 因此前端想要不重新获取数据列表(刷新网页), 就需要先自己更改, 并且只改当前读取的消息数, 也就是来自from的消息
			return {...state, chatmsg: state.chatmsg.map(v => ({...v, read: from===v.from? true : v.read})), unread: state.unread - num}
		default:
			return state
	}
}

function msgList(msgs, users, userid) {
	return { type: MSG_LIST, payload: { msgs, users, userid } }
}

function msgRecv(msg, userid) {
  return { type: MSG_RECV, payload: { msg, userid }}
}

export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', function(data) {
			// console.log('recvmsg', data)
			const userid = getState().user._id
      dispatch(msgRecv(data, userid))
    })
  }
}

export function sendMsg({ from, to ,msg }) {
  return dispatch => {
    socket.emit('sendmsg', { from, to, msg })
  }
}

export function getMsgList() {
	return (dispatch, getState) => {
		axios.get('/user/getmsglist')
			.then( res => {
				// 从 getState 里面获取 当前用户的 id 
				const userid = getState().user._id
				if (res.data.code === 0 && res.status === 200) {
					dispatch(msgList(res.data.msgs, res.data.users, userid))
				}
			})
	}
}

function msgRead({ from, to ,num }) {
	return { type: MSG_READ, payload: { from, to, num}}
}

export function readMsg(from) {
	return (dispatch, getState) => {
		axios.post('/user/readmsg', { from })
			.then(res => {
				const userid = getState().user._id
				if (res.status === 200 && res.data.code === 0) {
					dispatch(msgRead({ from, userid, num: res.data.num }))
				}
			})
	}
}