var Agree = React.createClass({

    getInitialState: function() {
        // Check cookie
        var authed = false;


        return {
            data: []
        };
    },

    next: function () {
        appState += 1;
        stateChange();
    },


        //Set AJAX request
        //Ideally will not see anything from server until oauth process is done.
        //May need to open a new tab in browser? Or, check if Tornado can send this popup.

    render: function() {
        return (
            <div className="clearfix white" id="privacy">
                <div className="col-10 mx-auto">
                    <h2>Privacy and Terms of Service</h2>
                    <p>Our theater and art production creates a profile on you similar to the way your online services do. In order to achieve this we ask that you authorize our service through as many of your social media and online platforms as possible. Since our production is meant to give you an experience to help understand what your data says about you and how it's used, your sharing makes the performance better. Per our policy, we never share or sell any of your data and we delete it immediately after the night you attend our show. If you do not get a ticket, for some reason, but share data, we will immediately delete your data upon cancellation.</p>
                    <p>Please read our data policy at the following link, and click "Agree" below if you accept: <a href="/policy" target="_blank">www.iamadatapoint.com/policy</a>. If you do not agree, simply go back or contact our team for more questions.</p>
                    <button onClick={this.next} className="btn btn-outline m2 b1">Agree</button>
                </div>
            </div>
        );
    }

});

module.exports = Agree;
//May want a handleclick function
