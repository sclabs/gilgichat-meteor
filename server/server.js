// helper functions
isOnline = function(userId) {
  var sockets = Meteor.default_server.stream_server.open_sockets;
  return _.any(sockets,function(socket){
    if (socket.meteor_session) {
      return userId === socket.meteor_session.userId;
    }
  });
  return false;
};

// API
Meteor.methods({
  joinRoom: function(roomName) {
    if (Rooms.find({name: roomName}).count()) {
      // room exists, just join it
      Rooms.update({name: roomName}, {$addToSet: {subscribers: this.userId}});
    } else {
      // room doesn't exist yet: create and join
      Rooms.insert({name: roomName, created_by: this.userId, subscribers: [this.userId]});
    }
  },
  
  leaveRoom: function(roomId) {
    if (Rooms.findOne({_id: roomId}).created_by == this.userId) {
      // snag the room name for future use
      roomName = Rooms.findOne(roomId);
      // we own this room, so it gets deleted forever
      Rooms.remove(roomId);
      // remove associated messages and timestamps
      Messages.remove({name: roomName});
      Timestamps.remove({room: roomName});
    } else {
      // just unsubscribe us from this room
      Rooms.update({_id: roomId}, {$pull: {subscribers: this.userId}});
    }
  },
  
  getUsers: function(roomName) {
    var users = [];
    var room = Rooms.findOne({name: roomName});
    if (room) {
      for (var i = 0; i < room.subscribers.length; i++) {
        var profile = Meteor.users.findOne(room.subscribers[i]).profile;
        var user = {id: room.subscribers[i], name: profile.name, picture: profile.picture, online: isOnline(room.subscribers[i])};
        users.push(user);
      }
    }
    return users;
  },
  
  sendMessage: function(roomName, message) {
    var profile = Meteor.users.findOne(this.userId).profile;
    Messages.insert({name: profile.name, id: this.userId, timestamp: new Date(), message: message, room: roomName});
  },
  
  updateTimestamp: function(roomName) {
    if (this.userId && roomName) {
      var timestampDoc = Timestamps.findOne({user: this.userId, room: roomName});
      if (timestampDoc)
        Timestamps.update({user: this.userId, room: roomName}, {$set: {timestamp: new Date()}});
      else
        Timestamps.insert({user: this.userId, room: roomName, timestamp: new Date()});
    }
  }
});