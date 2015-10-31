var Thanks = React.createClass({

    getInitialState: function() {
        // Check cookie
        var authed = false;


        return {
            data: []
        };
    },

    render: function() {
        return (
            <div className="white">
                <h2>Thank you!</h2>
                <p>We will be emailing you about your ticket shortly.</p>
                <p>If you decide not to come, you can delete your account at <a href="https://iamadatapoint.com/leave">www.iamadatapoint.com/leave</a></p>
            </div>
        );
    }

});

module.exports = Thanks;
//May want a handleclick function
