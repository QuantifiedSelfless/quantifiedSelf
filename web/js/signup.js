
//Currently am loading React from CDN
var Agree = require('./signup_comps/Agree.js');
var Start = require('./signup_comps/Start.js');
var Info = require('./signup_comps/Info.js');
var Auth = require('./signup_comps/Auth.js');
var Thanks = require('./signup_comps/Thanks.js');
appState = 0;

stateChange = function () {
  if (appState == 0){
    React.render(
      <div>
        <Start />
      </div>,
      document.getElementById('signup-content')
    );
  } else if (appState == 3){

    React.render(
      <div>
        <Auth />
      </div>,
      document.getElementById('signup-content')
    );
  } else if (appState == 1){
    React.render(
      <div className="center">
          <Agree />
      </div>,
      document.getElementById('signup-content')
    );
  } else if (appState == 2){

    React.render(
      <div>
          <Info />
      </div>,
      document.getElementById('signup-content')
    );
  } else if (appState == 4){
    React.render(
      <div className="center">
          <Thanks />
      </div>,
      document.getElementById('signup-content')
    );
  }
};

stateChange();
