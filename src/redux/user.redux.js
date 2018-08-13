import axios from 'axios'
import { getRedirectPath } from '../util'

const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

//把登入和注册都看作是验证的一部分，可以把他们的状态统一起来
/*const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'*/
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'

const initState = {
	redirectTo: '',
	// isAuth: '',
	msg: '',
	user: '',
	type: ''
}


//reducer
export function user(state=initState, action) {
	switch(action.type) {
		/*case REGISTER_SUCCESS:
			return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
		case LOGIN_SUCCESS:
			return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}*/
		case ERROR_MSG:
			return {...state, isAuth: false, msg: action.msg}
		case LOAD_DATA:
			return {...state, ...action.payload}
		case AUTH_SUCCESS:
			return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
		case LOGOUT:
			return {...initState, redirectTo: '/login'}
		default: 
			return state
	}
}

/*function registerSuccess(data) {
	return { type: REGISTER_SUCCESS, payload: data }
}

function loginSuccess(data) {
	return { type: LOGIN_SUCCESS, payload: data}
}*/

function authSuccess(obj) {
	//注册（登入、更新）成功后，pwd也会被后端传回来，在这个地方把它过滤掉
	// 登入时，已经在后端用_filter过滤了一遍了
	// 经过登入和注册的过滤，更新时已经没有pwd了，因此主要过滤注册返回来的pwd
	const { pwd, ...data } = obj
	return { type: AUTH_SUCCESS, payload: data }
}

function errorMsg(msg) {
	return { msg, type: ERROR_MSG }
}

export function loadData(userinfo) {
	return { type: LOAD_DATA, payload: userinfo}
}

export function update(data) {
	return dispatch => {
		axios.post('/user/update', data)
			.then( res => {
				if (res.status === 200 && res.data.code === 0) {
				//整个返回的数据都在res.data里面 
					dispatch(authSuccess(res.data.data))
				} else {
					dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function login({user, pwd}) {
	if (!user || !pwd) {
		return errorMsg('用户名和密码必须输入')
	}
	return dispatch => {
		axios.post('/user/login', { user, pwd })
		.then( res => {
			// console.log(res)
			if (res.status === 200 && res.data.code === 0) {
				//整个返回的数据都在res.data里面 
				dispatch(authSuccess(res.data.data))
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function register({user, pwd, repeatpwd, type}) {
	if (!user || !pwd || !type) {
		return errorMsg('用户名和密码以及身份必须输入')
	}  
	if (pwd !== repeatpwd) {
		return errorMsg('密码和确认密码不相同')
	}
	return dispatch => {
		axios.post('/user/register', { user, pwd, type })
		.then( res => {
			if (res.status === 200 && res.data.code === 0) {
				dispatch(authSuccess({user, pwd, type}))
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function logoutSubmit() {
	return { type: LOGOUT }
}