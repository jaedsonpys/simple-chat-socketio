import socketio
from aiohttp import web

sio = socketio.AsyncServer()
app = web.Application()
sio.attach(app)


if __name__ == '__main__':
    web.run_app(app, host='0.0.0.0', port=5500)
