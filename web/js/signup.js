// Setup fullpage.js
$(document).ready(function() {
    $('#fullpage').fullpage({
      controlArrows: false
    });
});

//Currently am loading React from CDN
var GoogleAuth = require('./signup_comps/GoogleAuth.js');
var FacebookAuth = require('./signup_comps/FacebookAuth.js');

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
