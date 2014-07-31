Posts = new Meteor.Collection("myBookPosts");
Template.message.posts = function() {
    return Posts.find({}, {
        sort: {
            createDate: -1
        }
    });
};
Template.message.events({
    "submit #messageForm": insertMessage
});
Template.message.messageFormate = function(message) {
    return message.substring(0, 30);
};
Template.message.messageColor = function() {
    var color = Math.floor((Math.random() * 5));
    switch(color) {
        case 0:
            return "warning";
        case 1:
            return "success";
        case 2:
            return "info";
        case 3:
            return "danger";
        case 4:
            return "primary";
    }
};
Template.message.timeFormate = function(date) {
    var createDate = new Date(date);
    return(createDate.getMonth() + 1) + "/" + padDigits(createDate.getDate(), 2) + " " + padDigits(createDate.getHours(), 2) + ":" + padDigits(createDate.getMinutes(), 2);
};

function insertMessage(e) {
    e.preventDefault();
    var post = {
        "name": $(e.target).find("[id=name]").val(),
        "text": $(e.target).find("[id=text]").val(),
        "deadline": $(e.target).find("[id=deadline]").val(),
        "createDate": new Date().getTime(),
        "done": "N"
    };
    post._id = Posts.insert(post);
    $(e.target).find("[id=name]").val("");
    $(e.target).find("[id=text]").val("");
    $(e.target).find("[id=deadline]").val("");
}

function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}