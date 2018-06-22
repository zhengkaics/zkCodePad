//let redisClient = require('../modules/redisClient');
//const TIMEOUT_IN_SECONDS = 3600;

module.exports = function(io) {
    //collaboration sessions
    var collaborations = [];
    //map from socketId to sessionId
    var socketIdToSessionId = [];
    io.on('connection', socket => {
        let sessionId = socket.handshake.query['sessionId'];
        socketIdToSessionId[socket.id] = sessionId;
        // add socket.id to corresponding collaboration session participants
        if(!(sessionId in collaborations)){
            collaborations[sessionId]={
                'participants':[]
            };
        }
        collaborations[sessionId]['participants'].push(socket.id);
        //socket event listeners
        socket.on('change', delta => {
            console.log("change " + socketIdToSessionId[socket.id] + " " + delta);
            let sessionId = socketIdToSessionId[socket.id];
            if (sessionId in collaborations) {
                let participants = collaborations[sessionId]['participants'];
                for (let i = 0; i < participants.length; i++) {
                    if (socket.id != participants[i]) {
                        io.to(participants[i]).emit("change",delta);
                    }
                }
            }else{
                    console.log("WARNING: coult not tie socket_id to any collaboration");
                }

        });

        socket.on('drawing', data =>{
           // console.log("drawing " + socketIdToSessionId[socket.id] + "  haha " + data);
            //data=JSON.parse(data);
            forwardEvents(socket.id,'drawing',data);

        });
        socket.on('cleanBoard',data=>{
            forwardEvents(socket.id,'cleanBoard',data);
        })
        //handle cursorMove events
        socket.on('cursorMove', cursor => {
           // console.log("cursorMove " + socketIdToSessionId[socket.id] + " " + cursor);
            cursor = JSON.parse(cursor);
            cursor['socketId'] = socket.id;
            forwardEvents(socket.id, 'cursorMove', JSON.stringify(cursor));
        });

        function forwardEvents(socketId, eventName, dataString) {
            let sessionId = socketIdToSessionId[socketId];
            if (sessionId in collaborations) {
                let participants = collaborations[sessionId]['participants'];
                for (let i=0; i<participants.length; i++) {
                    if (socketId != participants[i]) {
                        io.to(participants[i]).emit(eventName, dataString);
                    }
                }
            } else {
                console.log("WARNING: could not tie socket_id to any collaboration");
            }
        }

    });
}





// module.exports=function (io) {
//     io.on('connection',(socket)=>{
//         console.log(socket);
//
//         var message=socket.handshake.query['message'];
//         console.log(message);
//
//         io.to(socket.id).emit('message','hehe from server');
//     });
// }