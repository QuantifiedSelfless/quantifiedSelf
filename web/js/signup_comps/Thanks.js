var Thanks = React.createClass({

    getInitialState: function() {

        return {    
        };
    },

    render: function() {
        return (
            <div className="clearfix white" id="thankyou">
                <div className="col-10 mx-auto">
                    <h2>Thank you!</h2>
                    <p>Your ticketing confirmation number is being sent to your email address.</p>
                    <p>We will send a reminder email to you about your reservations a week or so before the show. If you do not receive a confirmation email, please check spam to be sure you are receiving our emails properly.</p>
                    <p>Since we have such limited space, please cancel with us if you realize you cannot make it. You can cancel your reservation and delete your account at <a href="/leave">www.iamadatapoint.com/leave</a></p>
                </div>
            </div>
        );
    }

});

module.exports = Thanks;
