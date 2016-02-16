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
            <div className="clearfix pb3" id="info">
                <div className='col-10 mx-auto white'>
                    <h2 className="center">Useful Information</h2>
                    <p className="center">Even though you just saw our privacy policy, since this kind of production is new, we want to give you some heads up about what will and will not happen during the show.</p>

                    <div className="flex flex-start">
                        <div className="flex-auto"></div>
                        <div className='col col-5 white'>
                            <p>You Will...</p>
                            <ul>
                                <li>Talk and interact with actors</li>
                                <li>See and play with your data in both private and public interactions</li>
                                <li>Have a bracelet that gives you sole access to your data during the performance</li>
                                <li>Play with various technologies and exhibits throughout</li>
                            </ul>
                        </div>
                        <div className='col col-5 white'>
                            <p>You Will Not...</p>
                            <ul>
                                <li>Have personal identifying data shown to others in the audience</li>
                                <li>Be purposefully called out and embarrassed using your personal data</li>
                                <li>Be forced to be involved in any specific interaction</li>
                                <li>Ever have your data shared with outside parties</li>
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