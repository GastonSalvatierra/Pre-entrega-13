const socket = io();
let user;
const chatBox = document.getElementById('chatBox')


Swal.fire({
    icon: 'info',
    title: "INGRESA TU NOMBRE !!",
    input: 'text',
    text: "NOMBRE EN EL CHAT",
    inputValidator: (value) => {
        if (!value) {
            return "Necesitas escribir tu Nombre"
        } else {
            socket.emit('userConnected', { user: value })
        }
    },
    allowOutsideClick: false 
}).then(result => {
    user = result.value;


    const myName = document.getElementById('myName')
    myName.innerHTML = user;
})



chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user: user, message: chatBox.value })
            chatBox.value = '';
        }
    }
})



socket.on('messageLogs', data => {
    const messageLog = document.getElementById('messageLogs')
    let logs = '';
    data.forEach(log => {
        logs += `${log.user} escribió: ${log.message}<br/>`
    });
  
    messageLog.innerHTML = logs;
})

