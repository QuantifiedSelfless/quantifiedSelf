var Start = React.createClass({

    getInitialState: function () {
        return {
            times: [],
            name: '',
            date: '',
            email: ''
        };
    },

    getDates: function () {
        var me = this;
        $.getJSON("/api/showtimes", function ( data ){
            me.setState({times: data['data']});
        }).fail(function () { alert('call to api/showtimes failed');});
    },

    componentWillMount: function () {
        this.getDates();
    },

    submitVals: function(e) {
        e.preventDefault();

        var data = {
            name: this.state.name,
            email: this.state.email,
            showtime_id: this.state.date
        };

        if (this.valEmail(data.email)){
            $.ajax({
                type: 'POST',
                url: '/user/info',
                data: data,
                success: function() {
                    appState += 1;
                    stateChange();
                },
                error: function(xhr) {
                    alert("An error occured: " + xhr.status + " " + xhr.statusText);
                }
            });
        } else {
            alert('Please enter valid email address');
        }
    },

    handleEmailChange: function (event) {
        this.setState({ email: event.target.value });
    },

    handleNameChange: function (event) {
        this.setState({ name: event.target.value });
    },

    changeDate: function (event) {
        this.setState({ date: event.target.value });
    },

    render: function () {
        var myTimes = [];
        myTimes.push({"id": 99999, "date": "Please Choose a Date"});
        for (var i in this.state.times) {
            if (this.state.times[i]['available_tickets'] > 0){
                myTimes.push(this.state.times[i]);
            }
        }
        return (
            <div className="clearfix pb3" id="start">
                <div className="col-10 mx-auto white">
                    <h1 className="center py1">Quantified Self Ticketing</h1>
                    <p><b>Location: </b>University of Colorado, <a href="http://atlas.colorado.edu/atlas-centers/center-for-media-arts-and-performance-cmap/">ATLAS Black Box Theater</a></p>
                    <p><b>Price: </b><em>Free!</em> Due to kind donations from the John S. and James L. Knight Foundation and CU-Boulder's Engineering Excellence Fund our first show will be free. Though due to high demand and limited space we ask you to cancel early if you decide not to come.</p>
                    <p>Since our show is an immersive, interactive performance, we are asking that you share some information with us during your reservation process. We anticipate that this RSVP process will take you 2-4 minutes. Once you hit the submit button below, we will hold your ticket for 15 minutes. If you do not finish your RSVP within 15 minutes you will need to start over. You will be required to show valid government ID at the door on the night of the show that proves your identity and that you are over 18.</p>
                    <p className="red">We are not yet taking RSVPs, please return the first week of March to make a reservation.</p>
                    
                    <div className="center border-bottom user-block">
                        <form name="user-form">
                            <label>Ticket Date</label>
                            <select onChange={this.changeDate} className="block mb2 mx-auto field">
                                {myTimes.map(function ( atime, i ) {
                                    if (i == 0) {
                                        return <option value={atime.id} selected>{atime.date}</option>;
                                    } else {
                                        return <option value={atime.id}>{atime.date}</option>;
                                    }
                                })}
                            </select>
                            <label>Full Name</label>
                            <input type="text" ref="username" size="60" className="block mb2 field mx-auto" placeholder="Firstname Lastname" onChange={this.handleNameChange} />
                            <label>Email Address</label>
                            <input type="email" ref="useremail" size="60" className="block mb2 field mx-auto" placeholder="email@domain.com" onChange={this.handleEmailChange} />
                            <button onClick={this.submitVals} type="submit" className="block btn btn-primary mx-auto">Submit</button>
                        </form>
                        <br />
                    </div>
                    <div className="center py2 social">
                        <p>Tickets sold out or not in your location? Find out when we announce new dates or public events by joining our mailing list.</p>
                        <form action="http://www.freelists.org/cgi-bin/subscription.cgi" method="post"> 
                            <input className="block col-6 field rounded-top y-group-item mx-auto mb1"type="text" placeholder="email@domain.com" name="email"/> 
                            <input type="hidden" name="list" value="quantifiedself" /> 
                            <input type="hidden" name="url_or_message" value="Thanks for subscribing! Please check your email to confirm your subscription. Hope to see you at one of our shows."/> 
                            <input type="hidden" name="action" value="subscribe" /> 
                            <input className="btn btn-outline py2" type="submit" value="Sign Up" />
                        </form>
                        <p className="tiny py1">We do not share your information with anyone, and will only contact you to announce new dates and events for our production.</p>
                    </div>
                </div>
            </div>

        )
    },

    valEmail: function(uemail) {
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (filter.test(uemail)) {
            return true;
        } else {
            return false;
        }
    }
});

module.exports = Start;
