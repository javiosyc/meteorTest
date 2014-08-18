var samplefoodListData = [{
    "foodName": "臭豆腐",
    "expirationDate": "0714"
}, {
    "foodName": "燙青菜",
    "expirationDate": "0714"
}, ];
var samplePostsData = [{
    "name": "Richard",
    "text": "Meteor is great!",
    "deadline": "2014-07-19",
    "done": "N",
    "createDate": new Date(2014, 6, 31).getTime()
}, {
    "name": "Richard",
    "text": "Meteor is so nice!",
    "deadline": "2014-07-19",
    "done": "N",
    "createDate": new Date(2014, 6, 30).getTime()
}, {
    "name": "Richard",
    "text": "Meteor is the best!",
    "deadline": "2014-07-19",
    "done": "N",
    "createDate": new Date(2014, 6, 29).getTime()
}];

Posts = new Meteor.Collection("myBookPosts");
Foods = new Meteor.Collection("foodLists");

console.log("count = " + Posts.find().count());

if(Posts.find().count() == 0) {
    Posts.insert(samplePostsData[0]);
    Posts.insert(samplePostsData[1]);
    Posts.insert(samplePostsData[2]);
}
console.log("food count = " + Foods.find().count());
if(Foods.find().count() == 0) {
    Foods.insert(samplefoodListData[0]);
    Foods.insert(samplefoodListData[1]);
}
Meteor.publish("messageLists", function(messageCursor) {
    return Posts.find({}, {
        limit: 5,
        skip: messageCursor,
        sort: {
            createDate: -1
        }
    });
});
Meteor.publish("foodLists", function(test) {
    return Foods.find();
});