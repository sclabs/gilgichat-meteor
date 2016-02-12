Emoji = {};

Emoji.convert = function (str) {
    if (typeof str !== "string") {
        return "";
    }

    return str.replace(/:[\+\-a-zA-Z0-9_]+:/g, function(match) {
        var imgName = match.slice(1, -1);
        var path = 'https://dl.dropboxusercontent.com/u/60098753/emoji/' + imgName + '.png';
        return "<img class='emoji' title='" + match + "' src='" + path + "'/>";
    });
}

Handlebars.registerHelper('Emoji',function(name, options){
    return new Handlebars.SafeString(Emoji.convert(name));
});
