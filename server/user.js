const express = require('express')
const utils =require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
//后端往前端传回数据时把password过滤掉 顺便把__v也过滤
const _filter = {'pwd': 0, '__v': 0}

Router.get('/list', function(req, res) {
 //get的参数由query获取， post由body
	const { type } = req.query
	// User.remove({}, function(e, d) {})
	User.find({type}, function(err, doc) {
		return res.json({code: 0, data: doc})
	})
})

// Chat.remove({}, function(e, d) {
// })

Router.get('/getmsglist', function(req, res) {
	const user = req.cookies.userid
	// console.log(user)
	User.find({}, function(e, userdoc) {
		let users = {}
		userdoc.forEach(v => {
			users[v._id] = { name: v.user, avatar: v.avatar }
		})
		// 只查找 我发送的信息  和  我接受的信息
		Chat.find({$or: [{from: user}, {to: user}]}, function(err, doc) {
			if (!err) {
				return res.json({ code: 0, msgs: doc, users: users })
			}
		})
	})
})

Router.post('/readmsg', function(req, res) {
	const userid = req.cookies.userid
	const { from } = req.body
	Chat.update(
		{from, to: userid}, 
		{$set: {read: true}}, 
		{'multi': true},
		function(err, doc) {
			if (!err) {
				console.log(doc)
				return res.json({code: 0, num: doc.nModified})
			}
			return res.json({code: 1, msg: '修改失败'})
		}
	)
})

Router.post('/update', function(req, res) {
	const userid = req.cookies.userid
	if (!userid) {
		return json.dumps({code: 1})
	}
	const body = req.body
	User.findByIdAndUpdate(userid, body, function(err, doc) {
		const data = Object.assign({}, {
			user: doc.user,
			type: doc.type
		}, body)
		return res.json({code: 0, data})
	})
})

Router.post('/login', function(req, res) {
	const { user, pwd } = req.body
	User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function(err, doc) {
		if (!doc) {
			return res.json({code: 1, msg: '用户名或密码错误'})
		}
		res.cookie('userid', doc._id)
		return res.json({code: 0, data: doc})
	})
})

Router.post('/register', function(req, res) {
	// console.log(req.body.data)
	const { user, pwd, type } = req.body
	User.findOne({ user }, function(err, doc) {
		if (doc) {
			return res.json({code: 1, msg: '用户名已存在'})
		}
		const userModel = new User({user, type, pwd: md5Pwd(pwd)})
		userModel.save(function(e, d) {
			if (e) {
				return res.json({code: 1, msg: '后端出错了'})
			}
			const { user, type, _id } = d
			res.cookie('userid', _id)
			return res.json({code: 0, data: {user, type, _id}})
		})
		//因为create不能返回_id(使用唯一的_id来标识cookie, 因此换用save写法
		/*User.create({user, type, pwd: md5Pwd(pwd)}, function(e, d) {
			if (e) {
				return res.json({code: 1, msg: '后端出错了'})
			}
			return res.json({code: 0})
		})*/
	})
})
Router.get('/info', function(req, res) {
	//用户有没有cookie
	const { userid } = req.cookies
	if (!userid) {
		return res.json({code:0})
	}
	User.findOne({_id: userid}, _filter, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: '后端出错了！'})
		}
		if (doc) {
			return res.json({code: 0, data: doc})
		}
	})
})

function md5Pwd(pwd) {
	const salt = 'i_will_make_a_big_progress@@google_facebook!'
	return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router
