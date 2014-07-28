timer();

function timer() {
    setInterval(setTime, 60 * 1000);
}

function setTime() {
    var time = new Date();
    console(time.toString());
    $("#time").html(time);
}