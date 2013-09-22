if (Meteor.isClient) {
  Handlebars.registerHelper("prettifyTimestamp", function(timestamp) {
    return timestamp.format("hh:mm tt");
  });
}