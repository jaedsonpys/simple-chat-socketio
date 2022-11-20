const sio = io();

const userRegisterDiv = document.querySelector('#user-register');
const usernameInput = document.querySelector('#username');
const chatTextArea = document.querySelector('#chat');
const chatBox = document.querySelector('.chat-area')

const messageInput = document.querySelector('#input-message');

const setUsername = () => {
    const username = usernameInput.value;

    if(username.length !== 0) {
        userRegisterDiv.style.display = 'none';
        usernameInput.style.border = 'none';
        chatBox.style.display = 'block';
        chatTextArea.innerHTML += `You joined the chat as "${username}"\n\n`;
        sio.emit('set_username', username);
    } else {
        usernameInput.style.border = 'solid 1px red';
    }
};

const sendMessage = () => {
    const message = messageInput.value;
    if(message.length !== 0) {
        sio.emit('send_message', message);
        chatTextArea.innerHTML += `You: ${message}\n`;
        messageInput.style.border = 'solid 1px gray';
        messageInput.value = '';
    } else {
        messageInput.style.border = 'solid 1px red';
    }
};

sio.on('connect', (socket) => {
    chatTextArea.innerHTML += 'Connected!\n';
});

sio.on('new_message', (data) => {
    let from = data.from;
    let message = data.message;
    chatTextArea.innerHTML += `${from}: ${message}\n`;
})