// Setup fullpage.js
$(document).ready(function() {
    $('#fullpage').fullpage({
      controlArrows: false
    });
});

//Currently am loading React from CDN
var Nav = require('./home_comps/Nav.js');
var Footer = require('./home_comps/Footer.js');
var Agree = require('./signup_comps/Agree.js');
var GoogleAuth = require('./signup_comps/GoogleAuth.js');
var FacebookAuth = require('./signup_comps/FacebookAuth.js');
var SpotifyAuth = require('./signup_comps/SpotifyAuth.js');
var TwitterAuth = require('./signup_comps/TwitterAuth.js');
var User = require('./signup_comps/User.js');
var RedditAuth = require('./signup_comps/RedditAuth.js');
var TumblrAuth = require('./signup_comps/TumblrAuth.js');
var InstagramAuth = require('./signup_comps/InstagramAuth.js');
var Thanks = require('./signup_comps/Thanks.js');

React.render(
        <Nav />,
        document.getElementById('sign-head')
);

React.render(
        <Footer />,
        document.getElementById('sign-foot')
);

React.render(
        <div className="center">
            <Agree />
        </div>,
        document.getElementById('start')
);

React.render(
        <div className="center">
            <User />
        </div>,
        document.getElementById('user')
);

React.render(
        <div className="center">
          <GoogleAuth />
        </div>,
        document.getElementById('google')
);

React.render(
        <div className="center">
          <FacebookAuth />
        </div>,
        document.getElementById('facebook')
);

React.render(
        <div className="center">
          <SpotifyAuth />
        </div>,
        document.getElementById('spotify')
);

React.render(
        <div className="center">
            <TwitterAuth />
        </div>,
        document.getElementById('twitter')
);

React.render(
        <div className="center">
            <RedditAuth />
        </div>,
        document.getElementById('reddit')
);

React.render(
        <div className="center">
            <TumblrAuth />
        </div>,
        document.getElementById('tumblr')
);

React.render(
        <div className="center">
            <InstagramAuth />
        </div>,
        document.getElementById('instagram')
);

React.render(
        <div className="center">
            <Thanks />
        </div>,
        document.getElementById('thankyou')
);
