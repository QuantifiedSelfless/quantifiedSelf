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
                React.createElement("a", {href: "http://iamadatapoint.com/auth/google"}, 
                    React.createElement("img", {src: "google icon"})
                )
            )
        );
    }

});

    //May want a handleclick function
