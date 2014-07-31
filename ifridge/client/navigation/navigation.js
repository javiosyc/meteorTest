function timer() {
    console.log(setTime);
    console.log(typeof(setTime));
    //Meteor.setInterval(setTime, 5 * 1000)
    setInterval(setTime, 5 * 1000);
}

function setTime() {
    var time = new Date();
    console(time.toString());
    $("#time").html(time);
}

