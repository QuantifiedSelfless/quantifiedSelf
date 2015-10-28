var InstagramAuth = React.createClass({

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
                <div className="authbtn instagram">
                    <a className="zocial instagram" href="/auth/instagram">
                        Authorize with Instagram
                    </a>
                </div>

                <a href="/auth/instagram?share=noacct">
                    <button className="btn btn-primary m3 b1 bg-orange">Do not use Instagram</button>
                </a>
                <a href="/auth/instagram?share=noshare">
                    <button className="btn btn-primary m3 b1 bg-red">Will not share</button>
                </a>
            </div>
        );
    }

});

module.exports = InstagramAuth;
//May want a handleclick function
