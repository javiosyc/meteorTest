if(Meteor.isClient) {
    var Posts = new Meteor.Collection("myBookPosts");
    var Foods = new Meteor.Collection("foodLists");
    Template.message.helpers({
        "posts": Posts.find()
    });
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
    
    Template.foodList.events({
        "click #submitFoodButton": insertFoodList,
        "click #addFoodButton": showFoodForm,
        "click #test": searchFood
    });
    Template.foodList.helpers({
        "foods": Foods.find()
    });
    Template.foodList.new_food = function() {
        return Session.equals('addFood', true);
    }
    Session.set("addFood", false);
    timer();
}

function insertMessage(e) {
    e.preventDefault();
    var post = {
        "name": $(e.target).find("[id=name]").val(),
        "text": $(e.target).find("[id=text]").val(),
        "deadline": $(e.target).find("[id=deadline]").val(),
        "done": "N"
    };
    post._id = Posts.insert(post);
    $(e.target).find("[id=name]").val("");
    $(e.target).find("[id=text]").val("");
    $(e.target).find("[id=deadline]").val("");
}

function insertFoodList(e,template) {
    e.preventDefault();
    var post = {
        "foodName": template.find("#foodName").value,
        "expirationDate": template.find("#expirationDate").value
    };
    console.log(post);
    post._id = Foods.insert(post);
    Session.set('addFood', false);
    $(e.target).find("[id=foodName]").val("");
    $(e.target).find("[id=expirationDate]").val("");
}

function timer() {
    setInterval(setTime, 60 * 1000);
}

function setTime() {
    var time = new Date();
    $("#time").html(time);
}

function showFoodForm(event, template) {
    Session.set("addFood", true);
    Meteor.flush();
    focusText(template.find("#foodName"));
}

function searchFood() {
    console.log("do search foods by criteria" );
    
    var foodList = Foods.find(
        {"name":"臭豆腐"}
         );
    
    Template.foodList.helpers({
        "foods": Foods.find(
        {"name":"臭豆腐"})
    });
}
function focusText(i) {
    i.focus();
    i.select();
};