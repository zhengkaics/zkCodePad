const express = require('express')
const app = express()
var restRouter=require("./routes/rest");
var mongoose =require("mongoose");
var indexRouter=require("./routes/index");
var path=require("path");
var http=require('http');

var socket_io=require('socket.io');
var io=socket_io();
var SocketService=require('./services/SocketService.js')(io);


mongoose.connect("mongodb://user:zzj90518@ds135382.mlab.com:35382/zhengkaioj");
app.use(express.static(path.join(__dirname,'../public')));
app.use("/",indexRouter);
app.use("/api/v1",restRouter);
app.use(function (req,res) {
    res.sendFile("index.html",{root:path.join(__dirname,'../public')});
})
//app.listen(3000, () => console.log('Example app listening on port 3000!'));

var server = http.createServer(app);
//var io=require('socket.io').listen(server);
io.attach(server);

server.listen(3000);

server.on('error',onError);
server.on('listening',onListening);

function onError(error) {
    throw error;
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr == 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
// function onListening() {
//     var addr=server.address();
//     var bind=typeof addr=='string' ?'pipe '+addr :'port '+addr.port;
//     console.log('Listening on'+bind);
// }