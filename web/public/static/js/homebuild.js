(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/Warren/QSelf/quantifiedSelf/web/js/home.js":[function(require,module,exports){
//Currently am loading React from CDN
var GAuth = require('./home_comps/GAuth.js');

React.render(
        React.createElement(GAuth, null),
        document.getElementById('test')
);

},{"./home_comps/GAuth.js":"/Users/Warren/QSelf/quantifiedSelf/web/js/home_comps/GAuth.js"}],"/Users/Warren/QSelf/quantifiedSelf/web/js/home_comps/GAuth.js":[function(require,module,exports){
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

},{}]},{},["/Users/Warren/QSelf/quantifiedSelf/web/js/home.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvV2FycmVuL1FTZWxmL3F1YW50aWZpZWRTZWxmL3dlYi9qcy9ob21lLmpzIiwiL1VzZXJzL1dhcnJlbi9RU2VsZi9xdWFudGlmaWVkU2VsZi93ZWIvanMvaG9tZV9jb21wcy9HQXV0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLHFDQUFxQztBQUNyQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7QUFFN0MsS0FBSyxDQUFDLE1BQU07UUFDSixvQkFBQyxLQUFLLEVBQUEsSUFBQSxDQUFHLENBQUE7UUFDVCxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztBQUN2QyxDQUFDLENBQUM7QUFDRjs7QUNQQSxJQUFJLDJCQUEyQixxQkFBQTs7QUFFL0IsSUFBSSxlQUFlLEVBQUUsV0FBVzs7QUFFaEMsUUFBUSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDM0I7O1FBRVEsT0FBTztZQUNILElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQztBQUNWLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVJLE1BQU0sRUFBRSxXQUFXO1FBQ2Y7WUFDSSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGdCQUFpQixDQUFBLEVBQUE7Z0JBQzVCLG9CQUFBLEdBQUUsRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsZUFBQSxFQUFlLENBQUMsSUFBQSxFQUFJLENBQUMsc0NBQXVDLENBQUEsRUFBQTtBQUFBLG9CQUFBLHVCQUFBO0FBQUEsZ0JBRXJFLENBQUE7WUFDRixDQUFBO1VBQ1I7QUFDVixLQUFLOztBQUVMLENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ25CLGlDQUFpQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL0N1cnJlbnRseSBhbSBsb2FkaW5nIFJlYWN0IGZyb20gQ0ROXG52YXIgR0F1dGggPSByZXF1aXJlKCcuL2hvbWVfY29tcHMvR0F1dGguanMnKTtcblxuUmVhY3QucmVuZGVyKFxuICAgICAgICA8R0F1dGggLz4sXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXN0Jylcbik7XG5cblxuIiwidmFyIEdBdXRoID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIENoZWNrIGNvb2tpZVxuICAgICAgICB2YXIgYXV0aGVkID0gZmFsc2U7XG5cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogW11cbiAgICAgICAgfTtcbiAgICB9LFxuXG5cbiAgICAgICAgLy9TZXQgQUpBWCByZXF1ZXN0XG4gICAgICAgIC8vSWRlYWxseSB3aWxsIG5vdCBzZWUgYW55dGhpbmcgZnJvbSBzZXJ2ZXIgdW50aWwgb2F1dGggcHJvY2VzcyBpcyBkb25lLlxuICAgICAgICAvL01heSBuZWVkIHRvIG9wZW4gYSBuZXcgdGFiIGluIGJyb3dzZXI/IE9yLCBjaGVjayBpZiBUb3JuYWRvIGNhbiBzZW5kIHRoaXMgcG9wdXAuXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdXRoYnRuIGdvb2dsZVwiPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInpvY2lhbCBnb29nbGVcIiBocmVmPVwiaHR0cDovL2lhbWFkYXRhcG9pbnQuY29tL2F1dGgvZ29vZ2xlXCI+XG4gICAgICAgICAgICAgICAgICAgIEF1dGhvcml6ZSB3aXRoIEdvb2dsZVxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gR0F1dGg7XG4gICAgLy9NYXkgd2FudCBhIGhhbmRsZWNsaWNrIGZ1bmN0aW9uXG4iXX0=
