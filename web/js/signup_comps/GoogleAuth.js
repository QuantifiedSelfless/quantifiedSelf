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
            <div>
                <div className="authbtn google">
                    <a className="zocial google" href="/auth/google">
                        Authorize with Google
                    </a>
                </div>
                <a href="/auth/google?share=noacct">
                    <button className="btn btn-primary m3 b1 bg-orange">Do not use Google</button>
                </a>
                <a href="/auth/google?share=noshare">
                    <button className="btn btn-primary m3 b1 bg-red">Will not share</button>
                </a>
            </div>
        );
    }

});

module.exports = GoogleAuth;
//May want a handleclick function
