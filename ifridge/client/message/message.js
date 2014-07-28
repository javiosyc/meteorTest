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