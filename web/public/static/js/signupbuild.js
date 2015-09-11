(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/Warren/QSelf/quantifiedSelf/web/js/signup.js":[function(require,module,exports){
//Currently am loading React from CDN
var GAuth = require('./signup_comps/GAuth.js');

React.render(
        React.createElement(GAuth, null),
        document.getElementById('test')
);

},{"./signup_comps/GAuth.js":"/Users/Warren/QSelf/quantifiedSelf/web/js/signup_comps/GAuth.js"}],"/Users/Warren/QSelf/quantifiedSelf/web/js/signup_comps/GAuth.js":[function(require,module,exports){
var GAuth = React.createClass({displayName: "GAuth",
    
    getInitialState: function() {
        // Check cookie
        var authed = false;


        return {
            data: []
        };
    },


        //Set AJAX request
        //Ideally will not see anything from server until oauth process is done.
        //May need to open a new tab in browser? Or, check if Tornado can send this popup.

    render: function() {
        return (
            React.createElement("div", {className: "authbtn google"}, 
                React.createElement("a", {className: "zocial google", href: "http://iamadatapoint.com/auth/google"}, 
                    "Authorize with Google"
                )
            )
        );
    }

});

module.exports = GAuth;
    //May want a handleclick function

},{}]},{},["/Users/Warren/QSelf/quantifiedSelf/web/js/signup.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvV2FycmVuL1FTZWxmL3F1YW50aWZpZWRTZWxmL3dlYi9qcy9zaWdudXAuanMiLCIvVXNlcnMvV2FycmVuL1FTZWxmL3F1YW50aWZpZWRTZWxmL3dlYi9qcy9zaWdudXBfY29tcHMvR0F1dGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxxQ0FBcUM7QUFDckMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7O0FBRS9DLEtBQUssQ0FBQyxNQUFNO1FBQ0osb0JBQUMsS0FBSyxFQUFBLElBQUEsQ0FBRyxDQUFBO1FBQ1QsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7Q0FDdEMsQ0FBQzs7O0FDTkYsSUFBSSwyQkFBMkIscUJBQUE7O0FBRS9CLElBQUksZUFBZSxFQUFFLFdBQVc7O0FBRWhDLFFBQVEsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQzNCOztRQUVRLE9BQU87WUFDSCxJQUFJLEVBQUUsRUFBRTtTQUNYLENBQUM7QUFDVixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFFSSxNQUFNLEVBQUUsV0FBVztRQUNmO1lBQ0ksb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxnQkFBaUIsQ0FBQSxFQUFBO2dCQUM1QixvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGVBQUEsRUFBZSxDQUFDLElBQUEsRUFBSSxDQUFDLHNDQUF1QyxDQUFBLEVBQUE7QUFBQSxvQkFBQSx1QkFBQTtBQUFBLGdCQUVyRSxDQUFBO1lBQ0YsQ0FBQTtVQUNSO0FBQ1YsS0FBSzs7QUFFTCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNuQixpQ0FBaUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy9DdXJyZW50bHkgYW0gbG9hZGluZyBSZWFjdCBmcm9tIENETlxudmFyIEdBdXRoID0gcmVxdWlyZSgnLi9zaWdudXBfY29tcHMvR0F1dGguanMnKTtcblxuUmVhY3QucmVuZGVyKFxuICAgICAgICA8R0F1dGggLz4sXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXN0Jylcbik7XG4iLCJ2YXIgR0F1dGggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gQ2hlY2sgY29va2llXG4gICAgICAgIHZhciBhdXRoZWQgPSBmYWxzZTtcblxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiBbXVxuICAgICAgICB9O1xuICAgIH0sXG5cblxuICAgICAgICAvL1NldCBBSkFYIHJlcXVlc3RcbiAgICAgICAgLy9JZGVhbGx5IHdpbGwgbm90IHNlZSBhbnl0aGluZyBmcm9tIHNlcnZlciB1bnRpbCBvYXV0aCBwcm9jZXNzIGlzIGRvbmUuXG4gICAgICAgIC8vTWF5IG5lZWQgdG8gb3BlbiBhIG5ldyB0YWIgaW4gYnJvd3Nlcj8gT3IsIGNoZWNrIGlmIFRvcm5hZG8gY2FuIHNlbmQgdGhpcyBwb3B1cC5cblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF1dGhidG4gZ29vZ2xlXCI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiem9jaWFsIGdvb2dsZVwiIGhyZWY9XCJodHRwOi8vaWFtYWRhdGFwb2ludC5jb20vYXV0aC9nb29nbGVcIj5cbiAgICAgICAgICAgICAgICAgICAgQXV0aG9yaXplIHdpdGggR29vZ2xlXG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBHQXV0aDtcbiAgICAvL01heSB3YW50IGEgaGFuZGxlY2xpY2sgZnVuY3Rpb25cbiJdfQ==
