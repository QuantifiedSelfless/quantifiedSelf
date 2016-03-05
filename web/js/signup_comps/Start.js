var Start = React.createClass({

    getInitialState: function () {
        return {
            times: [],
            name: '',
            date: '',
            email: '',
            overflow: false,
            code: null
        };
    },

    getDates: function () {
        var me = this;
        $.getJSON("/api/showtimes", function ( data ){
            var dates = data['data'];
            for (i in dates){
                if (dates[i]['available_tickets'] == 0){
                    dates[i]['date'] = dates[i]['date']+ " -- SOLD OUT";
                    dates[i]['overflow'] = true;
                }
            }
            me.setState({times: dates});
        }).fail(function () { alert('We did not find any showtimes!');});
    },

    componentWillMount: function () {
        this.getDates();
    },

    submitVals: function(e) {
        e.preventDefault();
        if (this.state.date == '' || this.state.date == 99999){
            alert('You must select a valid date');
            return;
        }
        $(e.target).remove();
        $('.user-block').append("<p>Hold on a second. We are generating all of your encryption keys so we can keep your data secure.</p>");
        var data;
        
        data = {
            name: this.state.name,
            email: this.state.email,
            showtime_id: this.state.date,
        }
        if (this.state.overflow == true) {
            data.promotion_key = this.state.code;
        }

        if (this.valEmail(data.email)){
            $.ajax({
                type: 'POST',
                url: '/user/info',
                data: data,
                success: function() {
                    appState += 1;
                    stateChange();
                },
                error: function(resp) {
                    stuff = resp.responseJSON
                    alert("An error occured: " + stuff.status_code + " - " + stuff.data.message + "\n\n" + "If you beileve this is an error on our part, please reload the page and try again.");
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

    handleCodeChange: function (event) {
        this.setState({ code: event.target.value });
    },

    changeDate: function (event) {
        var adate = event.target.value;
        this.checkOverflow(adate)
        this.setState({ date: adate });
    },

    checkOverflow: function (someday) {
        for (i in this.state.times) {
            if (this.state.times[i]["id"] == someday) {
                if (this.state.times[i]["overflow"] == true) {
                    this.setState({overflow: true});
                } else {
                    this.setState({overflow: false});
                }
            }
        }
    },

    render: function () {
        var myTimes = [];
        var overflowCode = (<div></div>);
        if (this.state.overflow == true) {
            overflowCode = (<div><label>Code</label><input type="text" ref="code" size="60" className="block mb2 field mx-auto" placeholder="paste the code here" onChange={this.handleCodeChange} /></div>);
        }
        myTimes.push({"id": 99999, "date": "Please Choose a Date"});
        for (var i in this.state.times) {
            myTimes.push(this.state.times[i]);
        }

        return (
            <div className="clearfix py3" id="start">
                <div className="col-10 mx-auto white">
                    <h1 className="center py1">Quantified Self Ticketing</h1>
                    <p><span className="att">Location</span>: University of Colorado, <a href="http://atlas.colorado.edu/atlas-centers/center-for-media-arts-and-performance-cmap/">ATLAS Black Box Theater</a></p>
                    <p><span className="att">Price</span>: <em>Free!</em> Due to kind donations from the John S. and James L. Knight Foundation and CU-Boulder's Engineering Excellence Fund our first show will be free.</p>
                    <p><span className="att">Reserving your ticket</span>:
                        <ul>
                            <li>After choosing a date, we will ask you to connect us to your other online providers (Google, Facebook, etc.) so we can customize the show for you.</li>
                            <li>Signing up will take you 2-4 minutes. The process will show you our privacy policy, then some info about the show, and finally a data sharing page.</li>
                            <li>You must be over 18 and able to show a valid ID the night you attend.</li>
                        </ul>
                    </p>
                    
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
                            {overflowCode}
                            <button onClick={this.submitVals} type="submit" className="done block btn btn-primary mx-auto">Submit</button>
                        </form>
                        <br />
                    </div>
                    <div className="center py2 social">
                        <p>Tickets sold out or not in your location? Find out when we announce new dates or public events by joining our mailing list.</p>
                        <form action="https://www.freelists.org/cgi-bin/subscription.cgi" method="post"> 
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
