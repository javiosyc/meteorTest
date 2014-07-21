if(Meteor.isClient) {
    var Posts = new Meteor.Collection("myBookPosts");
    var Foods = new Meteor.Collection("foodLists");
    Template.message.helpers({
        "posts": Posts.find()
    });
    Template.foodList.helpers({
        "foods": Foods.find()
    });
    Template.message.events({
        "submit #messageForm": insertMessage,
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
    Template.foodList.events({
        "submit #foodListForm": insertFoodList
    })
    timer();
}

function insertMessage(e) {
    e.preventDefault();
    var post = {
        "name": $(e.target).find("[id=name]").val(),
        "text": $(e.target).find("[id=text]").val(),
        "deadline": $(e.target).find("[id=deadline]").val(),
        "done": $(e.target).find("[id=done]").val()
    };
    post._id = Posts.insert(post);
    $(e.target).find("[id=name]").val("");
    $(e.target).find("[id=text]").val("");
    $(e.target).find("[id=deadline]").val("");
    $(e.target).find("[id=done]").val("");
}

function insertFoodList(e) {
    e.preventDefault();
    var post = {
        "foodName": $(e.target).find("[id=foodName]").val(),
        "expirationDate": $(e.target).find("[id=expirationDate]").val()
    };
    post._id = Foods.insert(post);
    $(e.target).find("[id=foodName]").val("");
    $(e.target).find("[id=expirationDate]").val("");
}

function timer() {
    setInterval(setTime, 60 * 1000);
}

function setTime() {
    var time = new Date().toLocaleString() + ' 星期' + '日一二三四五六'.charAt(new Date().getDay());
    $("#time").html(time);
}