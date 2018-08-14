import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile';

@connect(
  state => state
)
class Msg extends React.Component {

  getLast(arr) {
    return arr[arr.length - 1]
  }

  render() {
    // console.log(this.props)
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })

    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    return (
      <div>
        <List>
          {chatList.map(v => {
            const lastItem = this.getLast(v)
            // 聊天对象的 _id
            const targetId = lastItem.from === userid ? lastItem.to : lastItem.from
            const userInfo = this.props.chat.users[targetId]
            if (!userInfo) return null;
            const name = userInfo ? userInfo.name : ''
            const avatar = userInfo ? userInfo.avatar : ''

            const unreadNum = v.filter(i => !i.read && i.to===userid).length
            return (
            <Item 
              extra={<Badge text={unreadNum}></Badge>}
              key={lastItem._id}
              thumb={require(`../img/${avatar}.png`)}
              arrow="horizontal"
              onClick={() => {
                this.props.history.push(`/chat/${targetId}`)
              }}
            >
              {lastItem.content}
              <Brief>{ name }</Brief>
            </Item>
            )
          })}
        </List>
      </div>
    )
  }
}

export default Msg