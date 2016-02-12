updateUserList = function() {
  Meteor.call("getUsers", Session.get("selected_room"), function(err, result) {
    Session.set("user_list", result);
  });
  // TODO: make this not ridiculously inefficient
  setTimeout(updateUserList, 30000);
};

userCompare = function(a,b) {
  if (a.name < b.name)
     return -1;
  if (a.name > b.name)
    return 1;
  return 0;
};

Deps.autorun(function() {
  Rooms.find({name: Session.get("selected_room")}).observe({
    changed: function(newDocument, oldDocument) {
      updateUserList();
    }
  });
});

Template.user_list.users = function() {
  updateUserList();
  userList = Session.get("user_list");
  if (!userList) {
    return userList;
  }
  return userList.sort(userCompare);
};

Template.user.blue = function() {
  return Meteor.user()._id == this._id ? "text-info" : "muted";
};
