var TumblrAuth = React.createClass({

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
                <div className="authbtn tumblr">
                    <a className="zocial tumblr" href="/auth/tumblr">
                        Authorize with Tumblr
                    </a>
                </div>

                <a href="/auth/tumblr?share=noacct">
                    <button className="btn btn-primary m3 b1 bg-orange">Do not use Tumblr</button>
                </a>
                <a href="/auth/tumblr?share=noshare">
                    <button className="btn btn-primary m3 b1 bg-red">Will not share</button>
                </a>
            </div>
        );
    }

});

module.exports = TumblrAuth;
//May want a handleclick function
