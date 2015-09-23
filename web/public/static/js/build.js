(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/Warren/QSelf/quantifiedSelf/web/js/app.js":[function(require,module,exports){
//Currently am loading React from CDN
var GAuth = require('./components/GAuth.js');

React.render(
        React.createElement(GAuth, null),
        document.getElementById('test')
);

},{"./components/GAuth.js":"/Users/Warren/QSelf/quantifiedSelf/web/js/components/GAuth.js"}],"/Users/Warren/QSelf/quantifiedSelf/web/js/components/GAuth.js":[function(require,module,exports){
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

},{}]},{},["/Users/Warren/QSelf/quantifiedSelf/web/js/app.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvV2FycmVuL1FTZWxmL3F1YW50aWZpZWRTZWxmL3dlYi9qcy9hcHAuanMiLCIvVXNlcnMvV2FycmVuL1FTZWxmL3F1YW50aWZpZWRTZWxmL3dlYi9qcy9jb21wb25lbnRzL0dBdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEscUNBQXFDO0FBQ3JDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOztBQUU3QyxLQUFLLENBQUMsTUFBTTtRQUNKLG9CQUFDLEtBQUssRUFBQSxJQUFBLENBQUcsQ0FBQTtRQUNULFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO0NBQ3RDLENBQUM7OztBQ05GLElBQUksMkJBQTJCLHFCQUFBOztBQUUvQixJQUFJLGVBQWUsRUFBRSxXQUFXOztBQUVoQyxRQUFRLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztBQUMzQjs7UUFFUSxPQUFPO1lBQ0gsSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO0FBQ1YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRUksTUFBTSxFQUFFLFdBQVc7UUFDZjtZQUNJLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsZ0JBQWlCLENBQUEsRUFBQTtnQkFDNUIsb0JBQUEsR0FBRSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxlQUFBLEVBQWUsQ0FBQyxJQUFBLEVBQUksQ0FBQyxzQ0FBdUMsQ0FBQSxFQUFBO0FBQUEsb0JBQUEsdUJBQUE7QUFBQSxnQkFFckUsQ0FBQTtZQUNGLENBQUE7VUFDUjtBQUNWLEtBQUs7O0FBRUwsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDbkIsaUNBQWlDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vQ3VycmVudGx5IGFtIGxvYWRpbmcgUmVhY3QgZnJvbSBDRE5cbnZhciBHQXV0aCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9HQXV0aC5qcycpO1xuXG5SZWFjdC5yZW5kZXIoXG4gICAgICAgIDxHQXV0aCAvPixcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rlc3QnKVxuKTtcbiIsInZhciBHQXV0aCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBDaGVjayBjb29raWVcbiAgICAgICAgdmFyIGF1dGhlZCA9IGZhbHNlO1xuXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IFtdXG4gICAgICAgIH07XG4gICAgfSxcblxuXG4gICAgICAgIC8vU2V0IEFKQVggcmVxdWVzdFxuICAgICAgICAvL0lkZWFsbHkgd2lsbCBub3Qgc2VlIGFueXRoaW5nIGZyb20gc2VydmVyIHVudGlsIG9hdXRoIHByb2Nlc3MgaXMgZG9uZS5cbiAgICAgICAgLy9NYXkgbmVlZCB0byBvcGVuIGEgbmV3IHRhYiBpbiBicm93c2VyPyBPciwgY2hlY2sgaWYgVG9ybmFkbyBjYW4gc2VuZCB0aGlzIHBvcHVwLlxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXV0aGJ0biBnb29nbGVcIj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJ6b2NpYWwgZ29vZ2xlXCIgaHJlZj1cImh0dHA6Ly9pYW1hZGF0YXBvaW50LmNvbS9hdXRoL2dvb2dsZVwiPlxuICAgICAgICAgICAgICAgICAgICBBdXRob3JpemUgd2l0aCBHb29nbGVcbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdBdXRoO1xuICAgIC8vTWF5IHdhbnQgYSBoYW5kbGVjbGljayBmdW5jdGlvblxuIl19
