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
        var goods;
        $.get("/api/showtimes", function ( data ){
            goods = data['data']
        });

        this.setState({ times: goods });
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
                    window.location.replace('/signup#privacy');
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
        for (var i in this.state.times) {
            if (this.state.times[i]['available_tickets'] > 0){
                myTimes.push(this.state.times[i]);
            }
        }

        return (
            <div className="clearfix mb3">
                <div className="col-10 mx-auto white">
                    <h1 className="center py1">Quantified Self Ticketing</h1>
                    <p><b>Location: </b>University of Colorado, ATLAS Blackbox Theater</p>
                    <p><b>Price: </b><em>Free!</em> Due to kind donations from the John S. and James L. Knight Foundation and CU-Boulder's Engineering Excellence Fund our first show will be free. Though due to high demand and limited space we ask you to cancel early if you decide not to come.</p>
                    <p>Since our show is an immersive, interactive performance, we are asking that you'll share some information with us during your reservation process. We anticipate that this RSVP process will take you 2-4 minutes. Once you hit the submit button below, we will hold your ticket for 15 minutes. If you do not finish your RSVP within 15 minutes you will need to start over.</p>
                    
                    <div className="center">
                        <form name="user-form">
                            <label>Ticket Date</label>
                            <select onChange={this.changeDate} className="block mb2 mx-auto field">
                                {myTimes.map(function ( atime ) {
                                    return <option value={atime.id}>{atime.date}</option>;
                                })}
                            </select>
                            <label>Full Name</label>
                            <input type="text" ref="username" size="60" className="block mb2 field mx-auto" placeholder="Firstname Lastname" onChange={this.handleNameChange} />
                            <label>Email Address</label>
                            <input type="email" ref="useremail" size="60" className="block mb2 field mx-auto" placeholder="email@domain.com" onChange={this.handleEmailChange} />
                            <button onClick={this.submitVals} type="submit" className="block btn btn-primary mx-auto">Submit</button>
                        </form>
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
