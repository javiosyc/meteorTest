Meteor.autorun(function() {
    Meteor.subscribe("messageLists", Session.get("messageCursor")
                    ,function() {
                        $(".make-switch").bootstrapSwitch();
                    }    
                    );
});
Template.message.posts = function() {
    return Posts.find(
        {}, {sort: {createDate: -1}}
    )
};


Template.message.rendered = function() {
    $('#deadline').datepicker({format: "yyyy-mm-dd"});    
};

Template.message.events({
    "submit #messageForm": insertMessage,
    "click #messagePrevious": function(event, template) {
        if(Number(Session.get("messageCursor")) > Session.get("pageSize") - 1) {
            Session.set("messageCursor", Number(Session.get("messageCursor")) - Session.get("pageSize"));
        }
    },
    "click #messageNext": function(event, template) {
        Session.set("messageCursor", Number(Session.get("messageCursor")) + Session.get("pageSize"));
    },
    "click .close": function() {
        Posts.remove(this._id);
    },
  
    "switch-change" :function(e,data) {
        var done = this.done;
        var result;
        if(done=="Y") {
            result ="N";
        } else {
            result="Y";
        }
        Posts.update(this._id,{$set: {done: result}});
    }
   
});
Template.message.nextText = function() {
    var pageSize = Number(Session.get("pageSize"));
    var cursor = Number(Session.get("messageCursor"));
    return(cursor + pageSize) + "-" + (cursor + 2 * pageSize);
};
Template.message.prevText = function() {
    var pageSize = Number(Session.get("pageSize"));
    var cursor = Number(Session.get("messageCursor"));
    if(cursor < pageSize) {
        return "";
    } else {
        return(cursor - pageSize) + "-" + cursor;
    }
};
Template.message.messageFormate = function(message) {
    return message.substring(0, 30);
};
Template.message.isNew = function(dateTime) {
    var diff = new Date().getTime() - dateTime;
    if(diff < 2 * 60 * 60 * 1000) {
        return "new";
    } else {
        return "";
    }
}
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
    var now = new Date();
   
    if(now.getDate() != createDate.getDate()) {
        return padDigits(createDate.getMonth() + 1,2) + "/" + padDigits(createDate.getDate(), 2);
    } else {   
        return padDigits(createDate.getHours(), 2) + ":" + padDigits(createDate.getMinutes(), 2);
    }
};

Template.message.test = function(done) {
    if(done=="Y") {
        return "checked";
    } else{
        return"";
    }
}

function insertMessage(e) {
    e.preventDefault();
    var name = $(e.target).find("[id=name]");
    var text = $(e.target).find("[id=text]");
    var deadLine = $(e.target).find("[id=deadline]");
    clearInputColor();
    var noValueInput = findNoInputValue();
    if(noValueInput.length === 0) {
        var post = {
            "name": name.val(),
            "text": text.val(),
            "deadline": deadLine.val(),
            "createDate": new Date().getTime(),
            "done": "N"
        };
        post._id = Posts.insert(post);
        $(e.target).find("[id=name]").val("");
        $(e.target).find("[id=text]").val("");
        $(e.target).find("[id=deadline]").val("");
        $("#modalCloseButton").click();
    }   
    
}

function padDigits(number, digits) {
    return 
    Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

function clearInputColor() {
    $(".checkValue").each(function(index, element) {
        $(element).parent().removeClass("has-error");
    });
}

function findNoInputValue() {
    var noValueInputs = new Array();
    $(".checkValue").each(function(index, element) {
        if(element.value == "") {
            $(element).parent().addClass("has-error");
            noValueInputs.push(element);
        }
    });
    return noValueInputs;
}

function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}