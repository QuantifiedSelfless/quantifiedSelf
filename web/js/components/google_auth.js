var GAuth = React.createClass({
    
    getInitialState: function() {
        // Check cookie
        var authed = false;


        return {
            data: []
        };
    }

    componentDidMount: function() {
    
    }

    startOAuth: function (){
        //Set AJAX request
        //Ideally will not see anything from server until oauth process is done.
        //May need to open a new tab in browser? Or, check if Tornado can send this popup.
    }

    render: function() {
        return (
            <div className="authbtn google">
                <a href="post to the server">
                <img src="google icon"/>
                </a>
            </div>
        );
    }

});

    //May want a handleclick function
