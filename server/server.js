const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const model = require('./model')
const Chat = model.getModel('chat')

const app = express()

const userRouter = require('./user')

var server = require('http').Server(app)
var io = require('socket.io')(server)

io.on('connection', function(socket) {
	console.log('user login')
	socket.on('sendmsg', function(data) {
		// console.log(data)
		const { from, to, msg } = data
		const chatid = [from, to].sort().join('_')
		Chat.create({ chatid, from, to, content: msg, create_time: new Date().getTime()}, function(err, doc) {
			// console.log(doc._doc)
			io.emit('recvmsg', Object.assign({}, doc._doc))
		})
	})
})
// 重开一个端口，不然无法直接跨域到 9093
io.listen(9095)

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)


app.listen(9093, function(){
	console.log('Node app start at port 9093')
})