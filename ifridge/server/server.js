if (Meteor.isServer) {
    
    var samplefoodListData = [
    {"foodName":"臭豆腐","expirationDate": "0714"},
    {"foodName":"燙青菜","expirationDate": "0714"},
	];

        
    var samplePostsData = [
    {"name":"Richard","text": "Meteor is great!", "deadline": "20140719","done":"N"},
    {"name":"Richard","text": "Meteor is so nice!","deadline" :"20140719","done":"N"},
    {"name":"Richard","text": "Meteor is the best!","deadline":"20140719","done":"N"},
	];

var Posts = new Meteor.Collection("myBookPosts");
var Foods = new Meteor.Collection("foodLists");
    
    console.log("count = "+ Posts.find().count());
  if (Posts.find().count() == 0){
    Posts.insert(samplePostsData[0]);
    Posts.insert(samplePostsData[1]);
    Posts.insert(samplePostsData[2]);
  }

    console.log("food count = "+ Foods.find().count());
  if (Foods.find().count() == 0){
    Foods.insert(samplefoodListData[0]);
    Foods.insert(samplefoodListData[1]);
  }
}