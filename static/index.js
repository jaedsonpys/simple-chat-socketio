const sio = io();

const userRegisterDiv = document.querySelector('#user-register');
const usernameInput = document.querySelector('#username');
const chatTextArea = document.querySelector('#chat');
const chatBox = document.querySelector('.chat-area')

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
}

sio.on('connect', (socket) => {
    chatTextArea.innerHTML += 'Connected!\n';
});