Template.chat.messages = function() {
  return Messages.find({room: Session.get("selected_room")}, {sort: {timestamp: 1}});
};

sendMessage = function() {
  message = $("#input-message").val();
  if (message) {
    Meteor.call("sendMessage", Session.get("selected_room"), message);
    $("#input-message").val("");
  }
};

Template.chat.events({
  "click .action-send": function() {
    sendMessage();
  },
  
  "keypress #input-message": function(e) {
    if (e.which === 13)
      sendMessage();
  }
});

//Deps.autorun(function() {
//  Messages.find({chat: Session.get("current_chat")}).observe({
//    added: function(document) {
//      $("#scrollable-chat").animate({scrollTop: $("#scrollable-chat")[0].scrollHeight}, 1000);
//    }
//  });
//});

Template.chat.rendered = function() {
  $("#scrollable-chat").animate({scrollTop: $("#scrollable-chat")[0].scrollHeight}, 1000);
};

Template.message.blue = function() {
  return Meteor.user()._id == this.id ? "text-info" : "muted";
};