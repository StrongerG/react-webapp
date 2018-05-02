import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class NavlinkBar extends React.Component {

	static propTypes = {
  	data: PropTypes.array.isRequired,
	}

	render() {
				//如果是genius则看不到boss，反之
		const navList = this.props.data.filter(v => !v.hide)
		const { pathname } = this.props.location

		return (
			<TabBar>
				{navList.map( v => (
					<TabBar.Item 
						key={v.path} 
						title={v.text}
						icon={{url: require(`./img/${v.icon}.png`)}}
						selectedIcon={{url: require(`./img/${v.icon}.JPG`)}}
						selected={pathname===v.path}
						onPress={() => {
							this.props.history.push(v.path)
						}}
					>
					</TabBar.Item> 
				))}
			</TabBar>
		)
	}
}

export default NavlinkBar