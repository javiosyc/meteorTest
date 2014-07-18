if (Meteor.isServer) {
    
    var samplePostsData = [
    {"name":"Richard","text": "Meteor is great!", "deadline": "20140719","done":"N"},
    {"name":"Richard","text": "Meteor is so nice!","deadline" :"20140719","done":"N"},
    {"name":"Richard","text": "Meteor is the best!","deadline":"20140719","done":"N"},
	];

var Posts = new Meteor.Collection("myBookPosts");

    
    console.log("count = "+ Posts.find().count());
  if (Posts.find().count() == 0){
    Posts.insert(samplePostsData[0]);
    Posts.insert(samplePostsData[1]);
    Posts.insert(samplePostsData[2]);
  }

}