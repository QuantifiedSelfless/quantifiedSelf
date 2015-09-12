//Currently am loading React from CDN
var Intro = require('./home_comps/Intro.js');
var Sign = require('./home_comps/Sign.js');
var Footer = require('./home_comps/Footer.js');

React.render(
        <Intro />,
        document.getElementById('intro')
);
React.render(
        <Sign />,
        document.getElementById('signup')
);
React.render(
        <Footer />,
        document.getElementById('footer')
);
