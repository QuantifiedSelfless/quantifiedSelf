(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/Warren/QSelf/quantifiedSelf/web/js/home.js":[function(require,module,exports){
//Currently am loading React from CDN
var Intro = require('./home_comps/Intro.js');
var Sign = require('./home_comps/Sign.js');
var Footer = require('./home_comps/Footer.js');

React.render(
        React.createElement(Intro, null),
        document.getElementById('intro')
);
React.render(
        React.createElement(Sign, null),
        document.getElementById('signup')
);
React.render(
        React.createElement(Footer, null),
        document.getElementById('footer')
);

},{"./home_comps/Footer.js":"/Users/Warren/QSelf/quantifiedSelf/web/js/home_comps/Footer.js","./home_comps/Intro.js":"/Users/Warren/QSelf/quantifiedSelf/web/js/home_comps/Intro.js","./home_comps/Sign.js":"/Users/Warren/QSelf/quantifiedSelf/web/js/home_comps/Sign.js"}],"/Users/Warren/QSelf/quantifiedSelf/web/js/home_comps/Footer.js":[function(require,module,exports){
var Footer = React.createClass({displayName: "Footer",
    
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
        React.createElement("div", {className: "m3 border-top bg-lighten-1 flex"}, 
            React.createElement("br", null), 
          React.createElement("div", {className: "left bg-lighten-1"}, 
            React.createElement("img", {src: "/static/img/CULogo.png", width: "30%"})
          ), 
          React.createElement("div", {className: "right white bg-lighten-1"}, 
            React.createElement("p", null, "Questions? Contact our project lead - michael[dot]skirpan[at]colorado[dot]edu ")
          )
        )
        );
    }
});

module.exports = Footer;
    //May want a handleclick function

},{}],"/Users/Warren/QSelf/quantifiedSelf/web/js/home_comps/Intro.js":[function(require,module,exports){
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
          React.createElement("div", {className: "clearfix fit"}, 
            React.createElement("div", {className: "col-8 mx-auto center white"}, 
            React.createElement("p", null, React.createElement("span", {className: "elec"}, "Quantified Self"), " is an interactive art and immersive theater experience that asks you to consider your relationship to the data you create online. By working with your online and social media profiles, we generate our own portfolio to customize the art and personalize the experience to you. During the show, you will interact with actors, audience members, and lots of technology. Please join us in asking \"Are we in control of all this data, or is it controlling us?\"", React.createElement("br", null), " ", React.createElement("br", null), "The information era is already upon us, are you prepared to look a bit deeper?")
            )
          )
        );
    }

});

module.exports = Intro;
    //May want a handleclick function

},{}],"/Users/Warren/QSelf/quantifiedSelf/web/js/home_comps/Sign.js":[function(require,module,exports){
var Sign = React.createClass({displayName: "Sign",
    
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
          React.createElement("div", {className: "mx-auto"}, 
            React.createElement("button", {className: "btn btn-outline mb2 aqua rsvp"}, "Get a Ticket")
          )
        );
    }

});

module.exports = Sign;
    //May want a handleclick function

},{}]},{},["/Users/Warren/QSelf/quantifiedSelf/web/js/home.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvV2FycmVuL1FTZWxmL3F1YW50aWZpZWRTZWxmL3dlYi9qcy9ob21lLmpzIiwiL1VzZXJzL1dhcnJlbi9RU2VsZi9xdWFudGlmaWVkU2VsZi93ZWIvanMvaG9tZV9jb21wcy9Gb290ZXIuanMiLCIvVXNlcnMvV2FycmVuL1FTZWxmL3F1YW50aWZpZWRTZWxmL3dlYi9qcy9ob21lX2NvbXBzL0ludHJvLmpzIiwiL1VzZXJzL1dhcnJlbi9RU2VsZi9xdWFudGlmaWVkU2VsZi93ZWIvanMvaG9tZV9jb21wcy9TaWduLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEscUNBQXFDO0FBQ3JDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQzdDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQzNDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDOztBQUUvQyxLQUFLLENBQUMsTUFBTTtRQUNKLG9CQUFDLEtBQUssRUFBQSxJQUFBLENBQUcsQ0FBQTtRQUNULFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO0NBQ3ZDLENBQUM7QUFDRixLQUFLLENBQUMsTUFBTTtRQUNKLG9CQUFDLElBQUksRUFBQSxJQUFBLENBQUcsQ0FBQTtRQUNSLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDO0NBQ3hDLENBQUM7QUFDRixLQUFLLENBQUMsTUFBTTtRQUNKLG9CQUFDLE1BQU0sRUFBQSxJQUFBLENBQUcsQ0FBQTtRQUNWLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDO0NBQ3hDLENBQUM7OztBQ2hCRixJQUFJLDRCQUE0QixzQkFBQTs7QUFFaEMsSUFBSSxlQUFlLEVBQUUsV0FBVzs7QUFFaEMsUUFBUSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDM0I7O1FBRVEsT0FBTztZQUNILElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQztBQUNWLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVJLE1BQU0sRUFBRSxXQUFXO1FBQ2Y7UUFDQSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGlDQUFrQyxDQUFBLEVBQUE7WUFDN0Msb0JBQUEsSUFBRyxFQUFBLElBQUEsQ0FBRyxDQUFBLEVBQUE7VUFDUixvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLG1CQUFvQixDQUFBLEVBQUE7WUFDakMsb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxHQUFBLEVBQUcsQ0FBQyx3QkFBQSxFQUF3QixDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQUssQ0FBQSxDQUFHLENBQUE7VUFDNUMsQ0FBQSxFQUFBO1VBQ04sb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQywwQkFBMkIsQ0FBQSxFQUFBO1lBQ3hDLG9CQUFBLEdBQUUsRUFBQSxJQUFDLEVBQUEsZ0ZBQWtGLENBQUE7VUFDakYsQ0FBQTtRQUNGLENBQUE7VUFDSjtLQUNMO0FBQ0wsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDcEIsaUNBQWlDOzs7QUNqQ3JDLElBQUksMkJBQTJCLHFCQUFBOztBQUUvQixJQUFJLGVBQWUsRUFBRSxXQUFXOztBQUVoQyxRQUFRLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztBQUMzQjs7UUFFUSxPQUFPO1lBQ0gsSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO0FBQ1YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRUksTUFBTSxFQUFFLFdBQVc7UUFDZjtVQUNFLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsY0FBZSxDQUFBLEVBQUE7WUFDNUIsb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyw0QkFBNkIsQ0FBQSxFQUFBO1lBQzVDLG9CQUFBLEdBQUUsRUFBQSxJQUFDLEVBQUEsb0JBQUEsTUFBSyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxNQUFPLENBQUEsRUFBQSxpQkFBc0IsQ0FBQSxFQUFBLHljQUFBLEVBQXFjLG9CQUFBLElBQUcsRUFBQSxJQUFBLENBQUcsQ0FBQSxFQUFBLEdBQUEsRUFBQyxvQkFBQSxJQUFHLEVBQUEsSUFBQSxDQUFHLENBQUEsRUFBQSxnRkFBa0YsQ0FBQTtZQUM5a0IsQ0FBQTtVQUNGLENBQUE7VUFDTjtBQUNWLEtBQUs7O0FBRUwsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDbkIsaUNBQWlDOzs7QUM5QnJDLElBQUksMEJBQTBCLG9CQUFBOztBQUU5QixJQUFJLGVBQWUsRUFBRSxXQUFXOztBQUVoQyxRQUFRLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztBQUMzQjs7UUFFUSxPQUFPO1lBQ0gsSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO0FBQ1YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRUksTUFBTSxFQUFFLFdBQVc7UUFDZjtVQUNFLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsU0FBVSxDQUFBLEVBQUE7WUFDdkIsb0JBQUEsUUFBTyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQywrQkFBZ0MsQ0FBQSxFQUFBLGNBQXFCLENBQUE7VUFDbkUsQ0FBQTtVQUNOO0FBQ1YsS0FBSzs7QUFFTCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUNsQixpQ0FBaUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy9DdXJyZW50bHkgYW0gbG9hZGluZyBSZWFjdCBmcm9tIENETlxudmFyIEludHJvID0gcmVxdWlyZSgnLi9ob21lX2NvbXBzL0ludHJvLmpzJyk7XG52YXIgU2lnbiA9IHJlcXVpcmUoJy4vaG9tZV9jb21wcy9TaWduLmpzJyk7XG52YXIgRm9vdGVyID0gcmVxdWlyZSgnLi9ob21lX2NvbXBzL0Zvb3Rlci5qcycpO1xuXG5SZWFjdC5yZW5kZXIoXG4gICAgICAgIDxJbnRybyAvPixcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludHJvJylcbik7XG5SZWFjdC5yZW5kZXIoXG4gICAgICAgIDxTaWduIC8+LFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbnVwJylcbik7XG5SZWFjdC5yZW5kZXIoXG4gICAgICAgIDxGb290ZXIgLz4sXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290ZXInKVxuKTtcbiIsInZhciBGb290ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gQ2hlY2sgY29va2llXG4gICAgICAgIHZhciBhdXRoZWQgPSBmYWxzZTtcblxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiBbXVxuICAgICAgICB9O1xuICAgIH0sXG5cblxuICAgICAgICAvL1NldCBBSkFYIHJlcXVlc3RcbiAgICAgICAgLy9JZGVhbGx5IHdpbGwgbm90IHNlZSBhbnl0aGluZyBmcm9tIHNlcnZlciB1bnRpbCBvYXV0aCBwcm9jZXNzIGlzIGRvbmUuXG4gICAgICAgIC8vTWF5IG5lZWQgdG8gb3BlbiBhIG5ldyB0YWIgaW4gYnJvd3Nlcj8gT3IsIGNoZWNrIGlmIFRvcm5hZG8gY2FuIHNlbmQgdGhpcyBwb3B1cC5cblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibTMgYm9yZGVyLXRvcCBiZy1saWdodGVuLTEgZmxleFwiPlxuICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZWZ0IGJnLWxpZ2h0ZW4tMVwiPlxuICAgICAgICAgICAgPGltZyBzcmM9XCIvc3RhdGljL2ltZy9DVUxvZ28ucG5nXCIgd2lkdGg9XCIzMCVcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmlnaHQgd2hpdGUgYmctbGlnaHRlbi0xXCI+XG4gICAgICAgICAgICA8cD5RdWVzdGlvbnM/IENvbnRhY3Qgb3VyIHByb2plY3QgbGVhZCAtIG1pY2hhZWxbZG90XXNraXJwYW5bYXRdY29sb3JhZG9bZG90XWVkdSA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZvb3RlcjtcbiAgICAvL01heSB3YW50IGEgaGFuZGxlY2xpY2sgZnVuY3Rpb25cbiIsInZhciBJbnRybyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBDaGVjayBjb29raWVcbiAgICAgICAgdmFyIGF1dGhlZCA9IGZhbHNlO1xuXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IFtdXG4gICAgICAgIH07XG4gICAgfSxcblxuXG4gICAgICAgIC8vU2V0IEFKQVggcmVxdWVzdFxuICAgICAgICAvL0lkZWFsbHkgd2lsbCBub3Qgc2VlIGFueXRoaW5nIGZyb20gc2VydmVyIHVudGlsIG9hdXRoIHByb2Nlc3MgaXMgZG9uZS5cbiAgICAgICAgLy9NYXkgbmVlZCB0byBvcGVuIGEgbmV3IHRhYiBpbiBicm93c2VyPyBPciwgY2hlY2sgaWYgVG9ybmFkbyBjYW4gc2VuZCB0aGlzIHBvcHVwLlxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4IGZpdFwiPiBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTggbXgtYXV0byBjZW50ZXIgd2hpdGVcIj5cbiAgICAgICAgICAgIDxwPjxzcGFuIGNsYXNzTmFtZT1cImVsZWNcIj5RdWFudGlmaWVkIFNlbGY8L3NwYW4+IGlzIGFuIGludGVyYWN0aXZlIGFydCBhbmQgaW1tZXJzaXZlIHRoZWF0ZXIgZXhwZXJpZW5jZSB0aGF0IGFza3MgeW91IHRvIGNvbnNpZGVyIHlvdXIgcmVsYXRpb25zaGlwIHRvIHRoZSBkYXRhIHlvdSBjcmVhdGUgb25saW5lLiBCeSB3b3JraW5nIHdpdGggeW91ciBvbmxpbmUgYW5kIHNvY2lhbCBtZWRpYSBwcm9maWxlcywgd2UgZ2VuZXJhdGUgb3VyIG93biBwb3J0Zm9saW8gdG8gY3VzdG9taXplIHRoZSBhcnQgYW5kIHBlcnNvbmFsaXplIHRoZSBleHBlcmllbmNlIHRvIHlvdS4gRHVyaW5nIHRoZSBzaG93LCB5b3Ugd2lsbCBpbnRlcmFjdCB3aXRoIGFjdG9ycywgYXVkaWVuY2UgbWVtYmVycywgYW5kIGxvdHMgb2YgdGVjaG5vbG9neS4gUGxlYXNlIGpvaW4gdXMgaW4gYXNraW5nIFwiQXJlIHdlIGluIGNvbnRyb2wgb2YgYWxsIHRoaXMgZGF0YSwgb3IgaXMgaXQgY29udHJvbGxpbmcgdXM/XCI8YnIgLz4gPGJyIC8+VGhlIGluZm9ybWF0aW9uIGVyYSBpcyBhbHJlYWR5IHVwb24gdXMsIGFyZSB5b3UgcHJlcGFyZWQgdG8gbG9vayBhIGJpdCBkZWVwZXI/PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRybztcbiAgICAvL01heSB3YW50IGEgaGFuZGxlY2xpY2sgZnVuY3Rpb25cbiIsInZhciBTaWduID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIENoZWNrIGNvb2tpZVxuICAgICAgICB2YXIgYXV0aGVkID0gZmFsc2U7XG5cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogW11cbiAgICAgICAgfTtcbiAgICB9LFxuXG5cbiAgICAgICAgLy9TZXQgQUpBWCByZXF1ZXN0XG4gICAgICAgIC8vSWRlYWxseSB3aWxsIG5vdCBzZWUgYW55dGhpbmcgZnJvbSBzZXJ2ZXIgdW50aWwgb2F1dGggcHJvY2VzcyBpcyBkb25lLlxuICAgICAgICAvL01heSBuZWVkIHRvIG9wZW4gYSBuZXcgdGFiIGluIGJyb3dzZXI/IE9yLCBjaGVjayBpZiBUb3JuYWRvIGNhbiBzZW5kIHRoaXMgcG9wdXAuXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXgtYXV0b1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLW91dGxpbmUgbWIyIGFxdWEgcnN2cFwiPkdldCBhIFRpY2tldDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2lnbjtcbiAgICAvL01heSB3YW50IGEgaGFuZGxlY2xpY2sgZnVuY3Rpb25cbiJdfQ==
