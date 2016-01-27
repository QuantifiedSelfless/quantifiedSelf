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

var SocialAuth = React.createClass({
    getInitialState: function () {
      return {}
    },
    authorize: function () {
      this.state.loginWindow = window.open(this.props.url, this.props.name + " Login", "location=1,scrollbars=1,width=500,height=400")
      this.state.loginWindowTimer = setInterval(this.tick, 1000)
    },
    noshare: function () {
      window.open(this.props.url + "?share=noshare", this.props.name + " Login", "location=1,scrollbars=1,width=500,height=400")
      $("#noshareButton").css("background-color", "red")
    },
    nouse: function () {
      window.open(this.props.url + "?share=noacct", this.props.name + " Login", "location=1,scrollbars=1,width=500,height=400")
      $("#nouseButton").css("background-color", "yellow")
    },
    tick: function () {
      console.log('Still Checking: ')
      console.log(this.state)
      if(this.state.loginWindow.closed) {
        clearInterval(this.state.loginWindowTimer)
        $("#authorizeButton").css("background-color", "green")
      }
    },
    render: function () {
      return (
        <div className="row social">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">{this.props.name}</div>
          <div id="authorizeButton" className="col-xs-4 col-sm-4 col-md-4 col-lg-4" onClick={this.authorize}>Authorize</div>
          <div id="noshareButton" className="col-xs-2 col-sm-2 col-md-2 col-lg-2" onClick={this.noshare}>Will not share</div>
          <div id="nouseButton" className="col-xs-2 col-sm-2 col-md-2 col-lg-2" onClick={this.nouse}>Do not use</div>
        </div>)
    }
})

React.render(
        <Nav />,
        document.getElementById('sign-head')
);

React.render(
        <Footer />,
        document.getElementById('sign-foot')
);

React.render(
        <div className="container center">
            <SocialAuth name="Facebook" url="/auth/facebook"/>
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
