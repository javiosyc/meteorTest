
function timer() {
    Meteor.setInterval(setTime, 2 * 1000)
    //setInterval(setClock, 5 * 1000);																	
}

Template.navigation.rendered = function() {
console.log("message render");
	timer();    
};
function setTime() {														
    var now = new Date();
 //   now.getHours() now.getMinutes() + now.getSeconds()
    $("#time").html(padDigits(now.getHours(),2)+":"+padDigits(now.getMinutes(),2)+" "+padDigits(now.getSeconds(),2));
}

function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}
