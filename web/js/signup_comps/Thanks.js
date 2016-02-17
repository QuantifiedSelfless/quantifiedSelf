var Thanks = React.createClass({

    getInitialState: function() {
        // Check cookie
        var authed = false;


        return {
            ticket: 'just a second...'
        };
    },

    render: function() {
        return (
            <div className="clearfix white" id="thankyou">
                <div className="col-10 mx-auto">
                    <h2>Thank you!</h2>
                    <p>Your ticket number is {this.state.ticket}</p>
                    <p>We will be emailing you about your ticket shortly. We will also send you a reminder email before the show and double check you can still make it.</p>
                    <p>Since we have such limited space, please cancel with us if you realize you cannot make it. You can cancel your reservation and delete your account at <a href="/leave">www.iamadatapoint.com/leave</a></p>
                </div>
            </div>
        );
    }

});

module.exports = Thanks;
//May want a handleclick function
