const { Room } = require('colyseus');

class MyRoom extends Room {
  onCreate(options) {
    this.setState({ players: {}, shapes: {} });

    this.onMessage('move_shape', (client, data) => {
      this.state.shapes[client.sessionId] = data;
      this.broadcast('shape_moved', { id: client.sessionId, shape: data });
    });
  }

  onJoin(client) {
    this.state.players[client.sessionId] = {};
  }

  onLeave(client) {
    delete this.state.players[client.sessionId];
    delete this.state.shapes[client.sessionId];
  }
}

module.exports = MyRoom;
