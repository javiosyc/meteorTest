Meteor.autorun(function() {
    Meteor.subscribe("foodLists");  																					
});

Template.foodList.events({
    "click #submitFoodButton": insertFoodList,
    "click #addFoodButton": showFoodForm,
    "click #searchFoodButton": searchFoodByCriteria,
    "click .delete_item": deleteFood
});
Session.set("addFood", false);
Template.foodList.new_food = function() {
    return Session.equals('addFood', true);
}
Template.foodList.FoodList = searchFood;

Template.foodList.colorText = function(color) {
    if(color =='danger') {
        return "過期";
    }
}

function insertFoodList(e, template) {
    e.preventDefault();
    var post = {
        "foodName": template.find("#foodName").value,
        "expirationDate": template.find("#expirationDate").value
    };
    post._id = Foods.insert(post);
    Session.set('addFood', false);
    $(e.target).find("[id=foodName]").val("");
    $(e.target).find("[id=expirationDate]").val("");
}

function isWarning(date) {
    if(date == "" || date.length != 4) {
        return "success";
    }
    var now = new Date();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if(month > date.substr(0, 2)) {
        return "danger";
    } else if(month == date.substr(0, 2)) {																		
        if(day >= date.substr(2, 4)) {
            return "danger";
        } else {
            return "info";
        }
    } else {
        return "info";
    }
}

function setFoodWarningColor(foods) {
    for(var i = 0; i < foods.length; i++) {
        foods[i].color = isWarning(foods[i].expirationDate);
    }
    return foods;
}

function showFoodForm(event, template) {
    Session.set("addFood", true);
    Meteor.flush();
    focusText(template.find("#foodName"));
}

function searchFood() {
    console.log("criteria=" + Session.get("criteria"));
    if(Session.equals("criteria", undefined)) {
        var foods = Foods.find().fetch();
        
        console.log(foods.length);
        return setFoodWarningColor(foods);
    } else {
        var criteria = Session.get("criteria");
        return setFoodWarningColor(Foods.find({
            foodName: {
                $regex: criteria
            }
        }));
    }
}

function focusText(i) {
    i.focus();
    i.select();
};

function deleteFood(event, template) {
    Foods.remove(this._id);
}

function searchFoodByCriteria(event, template) {
        console.log(event);
        var foodName = template.find("#searchFood").value;
        if(foodName != "") {
            Session.set("criteria", foodName);
        } else {
            Session.set("criteria", undefined);
        }
    }