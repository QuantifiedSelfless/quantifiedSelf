var User = React.createClass({

    render: function() {
        return (
          <div className="container flex">
            <p className="red">WARNING: THIS IS ONLY A PILOT OF OUR SIGN UP PROCESS, WE WILL ANNOUNCE WHEN WE ARE TAKING OFFICIAL RSVPs</p>
            <form name="user-form" className="md-col-8 sm-col-6 mx-auto white">
                <label>Full Name</label>
                <input type="text" ref="username" size="60" className="block mb2 field mx-auto" placeholder="Firstname Lastname" />
                <label>Email Address</label>
                <input type="email" ref="useremail" size="60" className="block mb2 field mx-auto" placeholder="email@domain.com" />
                <button onClick={this.submitVals} type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        );
    },

    submitVals: function(e) {
        e.preventDefault();

        var data = {
            name: this.refs.username.getDOMNode().value,
            email: this.refs.useremail.getDOMNode().value,
        };

        if (this.valEmail(data.email)){
            $.ajax({
                type: 'POST',
                url: '/user/info',
                data: data,
                success: function() {
                    window.location.replace('/signup#google');
                },
                error: function(xhr) {
                    alert("An error occured: " + xhr.status + " " + xhr.statusText);
                }
            });
        } else {
            alert('Please enter valid email address');
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

module.exports = User;
