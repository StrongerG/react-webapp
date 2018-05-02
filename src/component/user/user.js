import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Button, WingBlank } from 'antd-mobile'
// import browserCookie from 'browser-cookies'

@connect(
	state => state.user,
)
class User extends React.Component {

	/*constructor(props) {
		super(props)
		// this.logtoout = this.logtoout.bind(this)
	}*/

	// logtoout() {
	// 	console.log('logout')
	// }

	render() {

		const props = this.props
		const Item = List.Item
		const Brief = Item.Brief
		return props.user? 
			(<div>
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
				<Button onClick={() => console.log('logout')} type="primary">退出登入</Button>
				</WingBlank>
			</div>
		 ): null
	}
}

export default User