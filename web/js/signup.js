// Setup fullpage.js
$(document).ready(function() {
    $('#fullpage').fullpage({
      controlArrows: false,
      autoScrolling: false,
      fitToSection: false,
      scrollOverflow: true,
    });
});

//Currently am loading React from CDN
var Agree = require('./signup_comps/Agree.js');
var Start = require('./signup_comps/Start.js');
var Info = require('./signup_comps/Info.js');
var Auth = require('./signup_comps/Auth.js');
var FacebookAuth = require('./signup_comps/FacebookAuth.js');
var SpotifyAuth = require('./signup_comps/SpotifyAuth.js');
var TwitterAuth = require('./signup_comps/TwitterAuth.js');
var User = require('./signup_comps/User.js');
var RedditAuth = require('./signup_comps/RedditAuth.js');
var TumblrAuth = require('./signup_comps/TumblrAuth.js');
var InstagramAuth = require('./signup_comps/InstagramAuth.js');
var Thanks = require('./signup_comps/Thanks.js');

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

React.render(
  <div>
    <Start />
  </div>,
  document.getElementById('start')
);

React.render(
  <div>
    <Auth />
  </div>,
  document.getElementById('auth')
);

React.render(
        <div className="center">
            <Agree />
        </div>,
        document.getElementById('privacy')
);

React.render(
        <div>
            <Info />
        </div>,
        document.getElementById('info')
);

React.render(
        <div className="center">
            <Thanks />
        </div>,
        document.getElementById('thankyou')
);
