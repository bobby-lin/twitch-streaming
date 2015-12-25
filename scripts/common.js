/**
 * Created on: 24/12/15
 *     Author: Bobby Lin
 */

function filter(element) {
    var value = $(element).val();
    $('li').each(function() {
        if ($(this).text().search(value) > -1) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
}

$(document).ready(function() {
    function addOnline(url_user,user) {
        $.getJSON(url_user, function (data) {
            description = data.status;
            if (data.logo !== null) {
                html = "<li><a href='" + data.url + "' target='_blank'>" +
                    "<img class='user-img' src='" + data.logo + "'><span class='online-header'>"
                    + data.name + "</span><br>" + description + "</br>" + "</li>";
            }
            else {
                html = "<li><a href='" + data.url + "' target='_blank'>" +
                    "<img class='user-img' src='http://placehold.it/50/95A5A6/white?text=No+logo'>"
                    + "<a class='online-header'>" + data.name + "</span></a></li>";
            }
            $('#user-list').append(html);
        }).fail(function (err) {
            addClosedAccount(user)
        });
    }
    
    function addOffline(url_user,user) {
        $.getJSON(url_user, function (data) {
            if (data.logo !== null) {
                html = "<li><a href='" + data.url + "' target='_blank'>" +
                    "<img class='user-img' src='" + data.logo + "'><span class='offline-header'>"
                    + data.name + "</span>" + "</a></li>";
            }
            else {
                html = "<li><a href='" + data.url + "' target='_blank'>" +
                    "<img class='user-img' src='http://placehold.it/50/95A5A6/white?text=No+logo'>" 
                    + "<span class='offline-header'>" + data.name + "</span></a></li>";
            }
            $("#user-list").append(html);
        }).fail(function (err) {
            addClosedAccount(user)
        });
    }
    
    function addClosedAccount(user) {
        var span_user = "<span class='closed-header'>" + user +" (Closed)</span>";
        html = "<li><img class='user-img' src='http://placehold.it/50?text=No+logo'>"
            + span_user + "</li>";
        $("#user-list").append(html);
    }
    
    var users = ["freecodecamp", "storbeck", "terakilobyte", "MedryBW", "habathcx", "RobotCaleb",
                    "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404"];
    users.forEach(function (user) {
        var url = "https://api.twitch.tv/kraken/";
        var html = "";
        var url_stream = url + "streams/" + user + "?callback=?";
        var url_user = url + "channels/" + user;
        $.getJSON(url_stream, function (json) {
            var description = "";
            if (json.stream === null) {
                console.log("Offline: " + user);
                addOffline(url_user,user)
            } else {
                console.log("Now streaming: " + user);
                addOnline(url_user,user)
            }
        });
    });
});
