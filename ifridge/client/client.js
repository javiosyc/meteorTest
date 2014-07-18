
if (Meteor.isClient) {
  var Posts = new Meteor.Collection("myBookPosts");

  Template.main.helpers({
    "posts": Posts.find()
  });

  Template.main.events({
    "submit form": function(e){
      e.preventDefault();
      var post = {
    	"name": $(e.target).find("[id=name]").val(),
        "text": $(e.target).find("[id=text]").val(),
    	"deadline": $(e.target).find("[id=deadline]").val(),
    	"done": $(e.target).find("[id=done]").val()
      };

    	console.log(post);
    
      post._id = Posts.insert(post);

      $(e.target).find("[id=name]").val("");
    $(e.target).find("[id=text]").val("");
    $(e.target).find("[id=deadline]").val("");
    $(e.target).find("[id=done]").val("");

    }
  })
}


