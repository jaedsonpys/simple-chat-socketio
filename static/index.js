const sio = io();

const usernameInput = document.querySelector('#username');
const chatTextArea = document.querySelector('#chat');

const setUsername = () => {
    const username = usernameInput.value;
    sio.emit('set_username', username);
}

sio.on('connect', (socket) => {
    chatTextArea.innerHTML += 'Connected!\n';
    console.log('Connected!')
})