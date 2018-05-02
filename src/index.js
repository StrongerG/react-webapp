import './config';
import './index.css'

import React from 'react'
import thunk from 'redux-thunk'
import reducers from './reducer'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import 'antd-mobile/dist/antd-mobile.css';
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import Bossinfo from './container/bossinfo/bossinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
));



ReactDom.render(
	(<Provider store={store}> 
		<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path='/login' component={Login}></Route>
					<Route path='/register' component={Register}></Route>                   
					<Route path='/bossinfo' component={Bossinfo}></Route>
					<Route path='/geniusinfo' component={Geniusinfo}></Route>
					<Route path='/chat/:user' component={Chat}></Route> 
					<Route component={Dashboard}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)