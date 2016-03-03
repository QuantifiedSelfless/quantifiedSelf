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
            <div className="clearfix white py3" id="privacy">
                <div className="col-10 mx-auto">
                    <h2 className="center">Privacy and Terms of Service Overview</h2>
                    <ul className="px3">
                        <li><span className="att">WE NEVER SELL OR SHARE ANY OF YOUR DATA</span></li>
                        <li>Any data you choose to share with us from your online providers is <span className="att">immediately encrypted</span> and requires multiple members of our production staff to decrypt it the night of the show.</li>
                        <li>After you attend the show we <span className="att">permanently delete all data you shared with us</span>.</li>
                        <li>Our overall privacy policy <span className="att">protects you more</span> than your other services such as Google or Facebook since we do not share, sell, or work with third-parties, and do not persist any of the data you share after attending.</li>
                    </ul>
                    <p>If you have more detailed questions, read our full policy at: <a href="/policy" target="_blank">www.iamadatapoint.com/policy</a>. If you do not agree, simply go back or contact our team for more questions. If you do agree, simply click "Agree" below.</p>
                    <div className="center">
                        <button onClick={this.next} className="btn btn-outline m2 b1">Agree</button>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Agree;
//May want a handleclick function
