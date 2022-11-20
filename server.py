import socketio
from aiohttp import web

sio = socketio.AsyncServer()
app = web.Application()
sio.attach(app)

users = {}


@sio.event
def connect(sid, environ):
    users[sid] = None


@sio.event
async def set_username(sid, username):
    users[sid] = username
    await sio.emit('new_user', data=username, skip_sid=sid)


@sio.event
async def send_message(sid, message):
    if users.get(sid):
        from_user = users[sid]
        sio.emit('new_message', data={'from': from_user, 'message': message}, skip_sid=sid)


if __name__ == '__main__':
    web.run_app(app, host='0.0.0.0', port=5500)
