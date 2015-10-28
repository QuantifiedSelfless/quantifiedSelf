//Currently am loading React from CDN
var Policy = require('./policy_comps/DPolicy.js');
var Footer = require('./home_comps/Footer.js');
var Nav = require('./home_comps/Nav.js');

React.render(
        <Nav />,
        document.getElementById('nav')
);
React.render(
        <Policy />,
        document.getElementById('policy')
);
React.render(
        <Footer />,
        document.getElementById('footer')
);
