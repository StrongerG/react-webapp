import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

@withRouter
@connect(
	state => state.chat
)
class NavlinkBar extends React.Component {

	static propTypes = {
  	data: PropTypes.array.isRequired,
	}

	render() {
				//如果是genius则看不到boss，反之
		const navList = this.props.data.filter(v => !v.hide)
		const { pathname } = this.props.location

		return (
			<div className="tabBarFix">
				<TabBar>
					{navList.map( v => (
						<TabBar.Item 
							badge={v.path === '/msg' ? this.props.unread : ''}
							key={v.path} 
							title={v.text}
							icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
							selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
							selected={pathname===v.path}
							onPress={() => {
								this.props.history.push(v.path)
							}}
						>
						</TabBar.Item> 
					))}
				</TabBar>
			</div>
		)
	}
}

export default NavlinkBar