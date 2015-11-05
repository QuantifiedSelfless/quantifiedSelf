//Currently am loading React from CDN
//Setup fullpage.js
$(document).ready(function() {
    $('#fullpage').fullpage({
        controlArrows: false
    });
});

var Footer = require('./home_comps/Footer.js');
var Nav = require('./home_comps/Nav.js');

var Deauth = React.createClass({

    render: function() {
        return (
            <div className="clearfix white">
                <div className="md-col-8 sm-col-6 center">
                    <h2 className="center">Deauthorize Your Account</h2>
                    <p>This page is for deauthorizing your account with Quantified Self. You only need to use this page if you've signed up, received a ticket, and are now canceling. Otherwise, we will have already deleted your data or will delete it after you attend.</p>
                    <form name="user-deauth">
                        <p>Your Email</p>
                        <input type="email" ref="useremail" size="60" className="block mb2 field center" placeholder="email@domain.com" />
                        <button onClick={this.submitVals} type="submit" className="btn btn-primary m3 b1">Submit</button>
                    </form>
                </div>
            </div>
        );
    },

    submitVals: function(e) {
        e.preventDefault();

        var data = {
            email: this.refs.useremail.getDOMNode().value
        };


        if (this.valEmail(data.email)){
            $.ajax({
                type: 'GET',
                url: '/deauth?email='+data.email,
                success: function() {
                    window.location.replace('/leave#email');
                },
                error: function(xhr) {
                    alert("User was not found in our database: " + xhr.status + " " + xhr.statusText);
                }
            });
        } else {
            alert('Please enter a valid email address');
        }
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
            
var Email = React.createClass({
    
    getInitialState: function() {
        // Check cookie
        var authed = false;

        return {
            data: []
        };
    },

    render: function() {
        return (
            <div className="clearfix white">
                <div className="md-col-10 sm-col-8 center">
                    <h2>Check your email</h2>
                    <p>We have now generated an email with a link and a unique token for your profile. All you need to do is click the link in the email and your data will be permanently deleted from our system.</p>
                    <p>If you change your mind and decide to come to the show, you can always return to <a href="/">our website</a> and sign up with us again.</p>
                </div>
            </div>
        );
    }

});


var Final = React.createClass({
    
    getInitialState: function() {
        // Check cookie
        var authed = false;

        return {
            data: []
        };
    },

    render: function() {
        return (
            <div className="clearfix white">
                <div className="md-col-10 sm-col-8 center">
                    <h2>Your data has been purged!</h2>
                    <p>We no longer have any of your social media data or profile data about you.</p>
                    <p>If you change your mind and decide to come to the show, you can always return to <a href="/">our website</a> and sign up with us again.</p>
                </div>
            </div>
        );
    }

});

React.render(
        <Nav />,
        document.getElementById('deauth-head')
);
React.render(
        <Deauth />,
        document.getElementById('deauth')
);
React.render(
        <Email />,
        document.getElementById('email')
);
React.render(
        <Final />,
        document.getElementById('final')
);
React.render(
        <Footer />,
        document.getElementById('deauth-foot')
);
