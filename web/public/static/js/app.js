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

},{}],"/Users/Warren/QSelf/quantifiedSelf/web/js/signup.js":[function(require,module,exports){
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

},{}]},{},["/Users/Warren/QSelf/quantifiedSelf/web/js/home.js","/Users/Warren/QSelf/quantifiedSelf/web/js/signup.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvV2FycmVuL1FTZWxmL3F1YW50aWZpZWRTZWxmL3dlYi9qcy9ob21lLmpzIiwiL1VzZXJzL1dhcnJlbi9RU2VsZi9xdWFudGlmaWVkU2VsZi93ZWIvanMvaG9tZV9jb21wcy9HQXV0aC5qcyIsIi9Vc2Vycy9XYXJyZW4vUVNlbGYvcXVhbnRpZmllZFNlbGYvd2ViL2pzL3NpZ251cC5qcyIsIi9Vc2Vycy9XYXJyZW4vUVNlbGYvcXVhbnRpZmllZFNlbGYvd2ViL2pzL3NpZ251cF9jb21wcy9HQXV0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLHFDQUFxQztBQUNyQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7QUFFN0MsS0FBSyxDQUFDLE1BQU07UUFDSixvQkFBQyxLQUFLLEVBQUEsSUFBQSxDQUFHLENBQUE7UUFDVCxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztDQUN0QyxDQUFDOzs7QUNORixJQUFJLDJCQUEyQixxQkFBQTs7QUFFL0IsSUFBSSxlQUFlLEVBQUUsV0FBVzs7QUFFaEMsUUFBUSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDM0I7O1FBRVEsT0FBTztZQUNILElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQztBQUNWLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVJLE1BQU0sRUFBRSxXQUFXO1FBQ2Y7WUFDSSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGdCQUFpQixDQUFBLEVBQUE7Z0JBQzVCLG9CQUFBLEdBQUUsRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsZUFBQSxFQUFlLENBQUMsSUFBQSxFQUFJLENBQUMsc0NBQXVDLENBQUEsRUFBQTtBQUFBLG9CQUFBLHVCQUFBO0FBQUEsZ0JBRXJFLENBQUE7WUFDRixDQUFBO1VBQ1I7QUFDVixLQUFLOztBQUVMLENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ25CLGlDQUFpQzs7O0FDOUJyQyxxQ0FBcUM7QUFDckMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7O0FBRS9DLEtBQUssQ0FBQyxNQUFNO1FBQ0osb0JBQUMsS0FBSyxFQUFBLElBQUEsQ0FBRyxDQUFBO1FBQ1QsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7Q0FDdEMsQ0FBQzs7O0FDTkYsSUFBSSwyQkFBMkIscUJBQUE7O0FBRS9CLElBQUksZUFBZSxFQUFFLFdBQVc7O0FBRWhDLFFBQVEsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQzNCOztRQUVRLE9BQU87WUFDSCxJQUFJLEVBQUUsRUFBRTtTQUNYLENBQUM7QUFDVixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFFSSxNQUFNLEVBQUUsV0FBVztRQUNmO1lBQ0ksb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxnQkFBaUIsQ0FBQSxFQUFBO2dCQUM1QixvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGVBQUEsRUFBZSxDQUFDLElBQUEsRUFBSSxDQUFDLHNDQUF1QyxDQUFBLEVBQUE7QUFBQSxvQkFBQSx1QkFBQTtBQUFBLGdCQUVyRSxDQUFBO1lBQ0YsQ0FBQTtVQUNSO0FBQ1YsS0FBSzs7QUFFTCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNuQixpQ0FBaUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy9DdXJyZW50bHkgYW0gbG9hZGluZyBSZWFjdCBmcm9tIENETlxudmFyIEdBdXRoID0gcmVxdWlyZSgnLi9ob21lX2NvbXBzL0dBdXRoLmpzJyk7XG5cblJlYWN0LnJlbmRlcihcbiAgICAgICAgPEdBdXRoIC8+LFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVzdCcpXG4pO1xuIiwidmFyIEdBdXRoID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIENoZWNrIGNvb2tpZVxuICAgICAgICB2YXIgYXV0aGVkID0gZmFsc2U7XG5cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogW11cbiAgICAgICAgfTtcbiAgICB9LFxuXG5cbiAgICAgICAgLy9TZXQgQUpBWCByZXF1ZXN0XG4gICAgICAgIC8vSWRlYWxseSB3aWxsIG5vdCBzZWUgYW55dGhpbmcgZnJvbSBzZXJ2ZXIgdW50aWwgb2F1dGggcHJvY2VzcyBpcyBkb25lLlxuICAgICAgICAvL01heSBuZWVkIHRvIG9wZW4gYSBuZXcgdGFiIGluIGJyb3dzZXI/IE9yLCBjaGVjayBpZiBUb3JuYWRvIGNhbiBzZW5kIHRoaXMgcG9wdXAuXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdXRoYnRuIGdvb2dsZVwiPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInpvY2lhbCBnb29nbGVcIiBocmVmPVwiaHR0cDovL2lhbWFkYXRhcG9pbnQuY29tL2F1dGgvZ29vZ2xlXCI+XG4gICAgICAgICAgICAgICAgICAgIEF1dGhvcml6ZSB3aXRoIEdvb2dsZVxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gR0F1dGg7XG4gICAgLy9NYXkgd2FudCBhIGhhbmRsZWNsaWNrIGZ1bmN0aW9uXG4iLCIvL0N1cnJlbnRseSBhbSBsb2FkaW5nIFJlYWN0IGZyb20gQ0ROXG52YXIgR0F1dGggPSByZXF1aXJlKCcuL3NpZ251cF9jb21wcy9HQXV0aC5qcycpO1xuXG5SZWFjdC5yZW5kZXIoXG4gICAgICAgIDxHQXV0aCAvPixcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rlc3QnKVxuKTtcbiIsInZhciBHQXV0aCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBDaGVjayBjb29raWVcbiAgICAgICAgdmFyIGF1dGhlZCA9IGZhbHNlO1xuXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IFtdXG4gICAgICAgIH07XG4gICAgfSxcblxuXG4gICAgICAgIC8vU2V0IEFKQVggcmVxdWVzdFxuICAgICAgICAvL0lkZWFsbHkgd2lsbCBub3Qgc2VlIGFueXRoaW5nIGZyb20gc2VydmVyIHVudGlsIG9hdXRoIHByb2Nlc3MgaXMgZG9uZS5cbiAgICAgICAgLy9NYXkgbmVlZCB0byBvcGVuIGEgbmV3IHRhYiBpbiBicm93c2VyPyBPciwgY2hlY2sgaWYgVG9ybmFkbyBjYW4gc2VuZCB0aGlzIHBvcHVwLlxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXV0aGJ0biBnb29nbGVcIj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJ6b2NpYWwgZ29vZ2xlXCIgaHJlZj1cImh0dHA6Ly9pYW1hZGF0YXBvaW50LmNvbS9hdXRoL2dvb2dsZVwiPlxuICAgICAgICAgICAgICAgICAgICBBdXRob3JpemUgd2l0aCBHb29nbGVcbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdBdXRoO1xuICAgIC8vTWF5IHdhbnQgYSBoYW5kbGVjbGljayBmdW5jdGlvblxuIl19
