import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { update } from '../../redux/user.redux'
import AvatarSelector from '../../component/avatar-selector/avatarselector'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

@connect(
	state => state.user,
	{ update }
)
class Bossinfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			desc: '',
			money: '',
			company: ''
		}
	}

	onChange(key, val) {
		this.setState({
			[key]: val
		})
	}

	selectAvatar = (imgname) => {
		this.setState({
			avatar: imgname
		})
	}

	render() {
		const redirect = this.props.redirectTo
		const path = this.props.location.pathname
		return (
			<div>
				{redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
				<NavBar mode="dark">Boss完善信息页</NavBar>
				<AvatarSelector 
					selectAvatar={this.selectAvatar}  
				/>
				<InputItem onChange={v=>this.onChange('title', v)}>
					招聘职位
        </InputItem>
        <InputItem onChange={v=>this.onChange('company', v)}>
					公司名称
        </InputItem> 
        <InputItem onChange={v=>this.onChange('money', v)}>
					职位薪资
       </InputItem> 
        <TextareaItem
          rows={3}
          autoHeight
          title="招聘要求"
          onChange={v=>this.onChange('desc', v)}
         >
         </TextareaItem>
         <Button type='primary' onClick={() =>this.props.update(this.state)}>保存</Button>      
			</div>
		)
	}
}

export default Bossinfo