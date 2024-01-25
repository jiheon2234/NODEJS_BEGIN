const SocketIo = require('socket.io');

module.exports = (server) => {
    const io = SocketIo(server, {path : '/socket.io'})

    io.on('connection', (socket) => {
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.log('새로운 클라이언트 접속', socket.id, req.ip);
        socket.on('disconnect', ()=>{
            console.log('클라이언트 접속 해제', ip, socket.id, req.ip);
            clearInterval(socket.interval);
        })

        io.on('message', (message) => {
            console.log((message.toString()));

        });

        io.on('error', console.error);

        io.on('reply',(data)=>{
            console.log(data);
        })


        socket.interval = setInterval(() => {
                socket.emit('news','Hello Socket.IO');
        }, 3000);
    });
};