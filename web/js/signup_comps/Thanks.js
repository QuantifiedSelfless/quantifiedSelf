var Thanks = React.createClass({

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
            <div className="white">
                <h2>Thank you!</h2>
                <p>We will be emailing you about your ticket shortly.</p>
                <p>If you decide not to come, you can delete your account at <a href="https://iamadatapoint.com/deauth">www.iamadatapoint.com/deauth</a></p>
            </div>
        );
    }

});

module.exports = Thanks;
//May want a handleclick function
