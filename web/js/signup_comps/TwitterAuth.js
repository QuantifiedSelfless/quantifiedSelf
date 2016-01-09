var TwitterAuth = React.createClass({

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
                <div className="authbtn twitter">
                    <a className="zocial twitter" href="/auth/twitter">
                        Authorize with Twitter
                    </a>
                </div>

                <a href="/auth/twitter?share=noacct">
                    <button className="btn btn-primary m3 b1 bg-orange">Do not use Twitter</button>
                </a>
                <a href="/auth/twitter?share=noshare">
                    <button className="btn btn-primary m3 b1 bg-red">Will not share</button>
                </a>
            </div>
        );
    }

});

module.exports = TwitterAuth;
//May want a handleclick function
