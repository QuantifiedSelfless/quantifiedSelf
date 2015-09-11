(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/Warren/QSelf/quantifiedSelf/web/js/home.js":[function(require,module,exports){
//Currently am loading React from CDN
var Intro = require('./home_comps/Intro.js');

React.render(
        React.createElement(Intro, null),
        document.getElementById('intro')
);

},{"./home_comps/Intro.js":"/Users/Warren/QSelf/quantifiedSelf/web/js/home_comps/Intro.js"}],"/Users/Warren/QSelf/quantifiedSelf/web/js/home_comps/Intro.js":[function(require,module,exports){
var Intro = React.createClass({displayName: "Intro",
    
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
            React.createElement("div", {className: "p10 mx-auto"}, 
               React.createElement("p", null, "I will never do this again without going to the mall. Seriously it's scaring me to see all the things that we can do these days with these machines. I'm not sure I even know if my friends are my friends or if dudes are dudes or anything. I always just wanted to bro out. ")
            )
        );
    }

});

module.exports = Intro;
    //May want a handleclick function

},{}]},{},["/Users/Warren/QSelf/quantifiedSelf/web/js/home.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvV2FycmVuL1FTZWxmL3F1YW50aWZpZWRTZWxmL3dlYi9qcy9ob21lLmpzIiwiL1VzZXJzL1dhcnJlbi9RU2VsZi9xdWFudGlmaWVkU2VsZi93ZWIvanMvaG9tZV9jb21wcy9JbnRyby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLHFDQUFxQztBQUNyQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7QUFFN0MsS0FBSyxDQUFDLE1BQU07UUFDSixvQkFBQyxLQUFLLEVBQUEsSUFBQSxDQUFHLENBQUE7UUFDVCxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztBQUN4QyxDQUFDLENBQUM7QUFDRjs7QUNQQSxJQUFJLDJCQUEyQixxQkFBQTs7QUFFL0IsSUFBSSxlQUFlLEVBQUUsV0FBVzs7QUFFaEMsUUFBUSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDM0I7O1FBRVEsT0FBTztZQUNILElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQztBQUNWLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVJLE1BQU0sRUFBRSxXQUFXO1FBQ2Y7WUFDSSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGFBQWMsQ0FBQSxFQUFBO2VBQzFCLG9CQUFBLEdBQUUsRUFBQSxJQUFDLEVBQUEsaVJBQW1SLENBQUE7WUFDblIsQ0FBQTtVQUNSO0FBQ1YsS0FBSzs7QUFFTCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNuQixpQ0FBaUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy9DdXJyZW50bHkgYW0gbG9hZGluZyBSZWFjdCBmcm9tIENETlxudmFyIEludHJvID0gcmVxdWlyZSgnLi9ob21lX2NvbXBzL0ludHJvLmpzJyk7XG5cblJlYWN0LnJlbmRlcihcbiAgICAgICAgPEludHJvIC8+LFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW50cm8nKVxuKTtcblxuXG4iLCJ2YXIgSW50cm8gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gQ2hlY2sgY29va2llXG4gICAgICAgIHZhciBhdXRoZWQgPSBmYWxzZTtcblxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiBbXVxuICAgICAgICB9O1xuICAgIH0sXG5cblxuICAgICAgICAvL1NldCBBSkFYIHJlcXVlc3RcbiAgICAgICAgLy9JZGVhbGx5IHdpbGwgbm90IHNlZSBhbnl0aGluZyBmcm9tIHNlcnZlciB1bnRpbCBvYXV0aCBwcm9jZXNzIGlzIGRvbmUuXG4gICAgICAgIC8vTWF5IG5lZWQgdG8gb3BlbiBhIG5ldyB0YWIgaW4gYnJvd3Nlcj8gT3IsIGNoZWNrIGlmIFRvcm5hZG8gY2FuIHNlbmQgdGhpcyBwb3B1cC5cblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAxMCBteC1hdXRvXCI+XG4gICAgICAgICAgICAgICA8cD5JIHdpbGwgbmV2ZXIgZG8gdGhpcyBhZ2FpbiB3aXRob3V0IGdvaW5nIHRvIHRoZSBtYWxsLiBTZXJpb3VzbHkgaXQncyBzY2FyaW5nIG1lIHRvIHNlZSBhbGwgdGhlIHRoaW5ncyB0aGF0IHdlIGNhbiBkbyB0aGVzZSBkYXlzIHdpdGggdGhlc2UgbWFjaGluZXMuIEknbSBub3Qgc3VyZSBJIGV2ZW4ga25vdyBpZiBteSBmcmllbmRzIGFyZSBteSBmcmllbmRzIG9yIGlmIGR1ZGVzIGFyZSBkdWRlcyBvciBhbnl0aGluZy4gSSBhbHdheXMganVzdCB3YW50ZWQgdG8gYnJvIG91dC4gPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRybztcbiAgICAvL01heSB3YW50IGEgaGFuZGxlY2xpY2sgZnVuY3Rpb25cbiJdfQ==
