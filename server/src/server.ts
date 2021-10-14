import socketIo from 'socket.io';
const io = socketIo(5000);
//const io = require('socket.io')(5000);

io.on('connect', (socket: any) => {
    const id = socket.handshake.query.id;
    socket.join(id);

    socket.on('send-message', ({ recipients, text }: { recipients: string[], text: string }) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient);
            newRecipients.push(id);
            socket.broadcast.to(recipients).emit('receive-message', {
                recipients: newRecipients, sender: id, text
            })
        })
    })
})