/**
 * Created on: 24/12/15
 *     Author: Bobby Lin
 */

$(document).ready(function() {
    var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb", 
                 "thomasballinger","noobs2ninjas","MedryBW","beohoff","brunofin","comster404"];
    for(var i = 0 ; i < users.length; i++) {
        var url = "https://api.twitch.tv/kraken/channels/" + users[i];
        var html = "";
        $.getJSON(url, function(data) {
            console.log(data);
            if(data.logo !== null) {
                html = "<li><img class='user-img' src='" + data.logo + "'>" + data.name + "</li>";
            }
            else {
                html = "<li><img class='user-img' src='http://placehold.it/50x50'>" + data.name + "</li>";
            }
            $("#user-list").append(html);
        }).fail(function(err) {
            console.log(err);
        });
        
    }
});
