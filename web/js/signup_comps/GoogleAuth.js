var GoogleAuth = React.createClass({

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
            <div className="authbtn google">
                <a className="zocial google" href="http://iamadatapoint.com/auth/google">
                    Authorize with Google
                </a>
            </div>
        );
    }

});

module.exports = GoogleAuth;
//May want a handleclick function
