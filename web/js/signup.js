// Setup fullpage.js
$(document).ready(function() {
    $('#fullpage').fullpage({
      controlArrows: false,
      autoScrolling: false,
      fitToSection: false,
      scrollOverflow: false,
      scrollBar: false
    });
});

//Currently am loading React from CDN
var Agree = require('./signup_comps/Agree.js');
var Start = require('./signup_comps/Start.js');
var Info = require('./signup_comps/Info.js');
var Auth = require('./signup_comps/Auth.js');
var Thanks = require('./signup_comps/Thanks.js');


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
