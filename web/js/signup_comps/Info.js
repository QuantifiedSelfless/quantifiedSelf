var Info = React.createClass({
    getInitialState: function () {
        return {
            data: []
        };
    },

    next: function () {
        appState += 1;
        stateChange();
    },

    render: function () {
        return (
            <div className="clearfix py3" id="info">
                <div className='col-10 mx-auto white'>
                    <h2 className="center">What to Expect</h2>
                    <p className="center">Beyond our privacy policy, we want to give you a heads up about what to expect in the show.</p>
                    <div className="flex flex-start">
                        <div className="flex-auto"></div>
                        <div className='col col-5 white'>
                            <p>You Will...</p>
                            <ul>
                                <li>Talk and interact with actors</li>
                                <li>Use technology <span className="att">inside of private booths</span> for anything that could contain <span className="att">sensitive data</span></li>
                                <li>Use technology in <span className="att">public spaces</span> where your data has been <span className="att">filtered to only include harmless data</span></li>
                                <li>Have a bracelet that gives you sole access to your data during the performance</li>
                            </ul>
                        </div>
                        <div className='col col-5 white'>
                            <p>You Will <span className="att">Not</span>...</p>
                            <ul>
                                <li>Have sensitive or private information shown to others in the audience</li>
                                <li>Be purposefully called out and embarrassed using your personal data</li>
                                <li>Be forced to be involved in any specific interaction</li>
                                <li>Have your data shared with outside parties</li>
                            </ul>
                        </div>
                        <div className="flex-auto"></div>
                    </div>
                    <p className="center">More questions? <a href="/about#faq" target="_blank">see our FAQ page</a></p>
                    <div className="center">
                        <button onClick={this.next} className="btn btn-outline m1 b1">Next</button>
                    </div>
                </div>
            </div>

        );
    }

});

module.exports = Info;