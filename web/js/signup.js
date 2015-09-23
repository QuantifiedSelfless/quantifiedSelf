// Setup fullpage.js
$(document).ready(function() {
    $('#fullpage').fullpage({
      controlArrows: false
    });
});

//Currently am loading React from CDN
var GAuth = require('./signup_comps/GAuth.js');
var FacebookAuth = require('./signup_comps/FacebookAuth.js');

React.render(
        <GAuth />,
        document.getElementById('google')
);

React.render(
        <FacebookAuth />,
        document.getElementById('facebook')
);
