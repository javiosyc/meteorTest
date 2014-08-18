Posts = new Meteor.Collection("myBookPosts");
Foods = new Meteor.Collection("foodLists");

Session.setDefault("pageSize",5);
Session.setDefault("messageCursor",0);

