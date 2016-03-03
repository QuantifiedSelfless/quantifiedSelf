var SocialAuth = React.createClass({
    getInitialState: function () {
      return {
        loginWindow: '',
        loginWindowTimer: null,
        points: {
          "Google": 10,
          "Facebook": 7,
          "Twitter": 5,
          "Tumblr": 3,
          "Reddit": 3,
          "Instagram": 2,
          "Spotify": 2
        }
      }
    },
    authorize: function () {
      this.setState({loginWindow: window.open(this.props.url, this.props.name + " Login", "location=1,scrollbars=1,width=500,height=400")});
      this.setState({loginWindowTimer: setInterval(this.tick, 200)});
    },
    noshare: function () {
      wasClicked[this.props.name] = 0;
      window.open(this.props.url + "?share=noshare", this.props.name + " Login", "location=1,scrollbars=1,width=500,height=400");
      $("#"+this.props.name+"-SocialAuthElement #noshareButton").css("border-color", "red");
      $("#"+this.props.name+"-SocialAuthElement #noshareButton").css("color", "red");
      $("#"+this.props.name+"-SocialAuthElement #nouseButton").css("border-color", "#d2bb5d");
      $("#"+this.props.name+"-SocialAuthElement #nouseButton").css("color", "#d2bb5d");
      $("#"+this.props.name+"-SocialAuthElement #authorizeButton").css("border-color", "#d2bb5d");
      $("#"+this.props.name+"-SocialAuthElement #authorizeButton").css("color", "#d2bb5d");
    },
    nouse: function () {
      wasClicked[this.props.name] = 0;
      window.open(this.props.url + "?share=noacct", this.props.name + " Login", "location=1,scrollbars=1,width=500,height=400");
      $("#"+this.props.name+"-SocialAuthElement #nouseButton").css("border-color", "yellow");
      $("#"+this.props.name+"-SocialAuthElement #nouseButton").css("color", "yellow");
      $("#"+this.props.name+"-SocialAuthElement #noshareButton").css("border-color", "#d2bb5d");
      $("#"+this.props.name+"-SocialAuthElement #noshareButton").css("color", "#d2bb5d");
      $("#"+this.props.name+"-SocialAuthElement #authorizeButton").css("border-color", "#d2bb5d");
      $("#"+this.props.name+"-SocialAuthElement #authorizeButton").css("color", "#d2bb5d");
    },
    tick: function () {
      if(this.state.loginWindow.closed) {
        clearInterval(this.state.loginWindowTimer);
        if(this.getCookie("auth-result") == "success") {
          wasClicked[this.props.name] = this.state.points[this.props.name];
          $("#"+this.props.name+"-SocialAuthElement #authorizeButton").css("border-color", "green");
          $("#"+this.props.name+"-SocialAuthElement #authorizeButton").css("color", "green");
          $("#"+this.props.name+"-SocialAuthElement #noshareButton").css("border-color", "#d2bb5d");
          $("#"+this.props.name+"-SocialAuthElement #noshareButton").css("color", "#d2bb5d");
          $("#"+this.props.name+"-SocialAuthElement #nouseButton").css("border-color", "#d2bb5d");
          $("#"+this.props.name+"-SocialAuthElement #nouseButton").css("color", "#d2bb5d");
        }
      }
    },
    getCookie: function ( cname ) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1);
          if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
    },

    componentWillMount: function () {
      console.log('I swear if you tell anyone that we are doing this hack to make this website work correctly that I am going to have to come to your house and cook chicken and biscuits -- no gravy!! Thats right, no gravy. So dont be messin. Anyhow, if you are looking at this, its probably because you are sort of a hacker type, or, well, you at least know how to click a few buttons including "inspect element" but thats still pretty ballin. If thats you, hacker person, then you should think about asking Evan what he is up to when you come to our show.');
    },

    render: function () {
      var id = this.props.name + "-SocialAuthElement"
      return (
        <div id={id} className="social flex flex-center center py1">

          <div className="flex-none service">
            {this.props.name}
          </div>
          <div className="flex-auto"></div>
          <div className="sm-flex col-8">
            <div id="authorizeButton" className="flex-auto btn btn-outline" onClick={this.authorize}>
                Authorize
            </div>
            <div className="flex-auto"></div>

            <div id="noshareButton" className="flex-auto btn btn-outline" onClick={this.noshare}>
                Will not share
            </div>
            <div className="flex-auto"></div>
            <div id="nouseButton" className="flex-auto btn btn-outline" onClick={this.nouse}>
                Do not have
            </div>
          </div>
        </div>
        )
    }
});

var wasClicked = {
  "Google": null,
  "Facebook": null,
  "Twitter": null,
  "Tumblr": null,
  "Reddit": null,
  "Instagram": null,
  "Spotify": null
};

var Auth = React.createClass({
    getInitialState: function () {
        return {
            fullPoints: false,
            doneClick: false,
            checker: null,
            shitDates: null
        };
    },


    componentWillMount: function () {
      gotime = setInterval(this.checkPoints, 200);
      this.setState({checker: gotime});
      this.getShitty();
    },

    getShitty: function() {
       var me = this;
       $.getJSON("/api/showtimes", function ( data ){
             theDates = []
             data['data'].map( function ( date ){
               if (date['shitty_tickets'] > 0) {
                 theDates.push({date: date['date'], id: date['id']});
               }
             });
             me.setState({shitDates: theDates});
         }).fail(function () { alert('call to api/showtimes failed');});
    },

    checkPoints: function () {
      var sum = 0;
      var done = true;
      for (i in wasClicked) {
        if (wasClicked[i] == null) {
          done = false;
          break;
        } else {
          sum += wasClicked[i];
        }
      }
      if (done == true && sum >= 10) {
        this.setState({fullPoints: true, doneClick: true});
      } else if (done == true && sum < 10) {
        this.setState({fullPoints: false, doneClick: true});
      }
    },

    next: function () {
        
        $.ajax({
            type: 'PUT',
            url: '/user/info',
            success: function() {
                appState += 1;
                stateChange();
            },
            error: function(xhr) {
                alert("An error occured: " + xhr.status + " " + xhr.statusText);
            }
        });
    },


    render: function () {
        var theButton = null;
        var shitTix = (<div></div>);

        if (this.state.fullPoints == true) {
          theButton = <button onClick={this.next} className="btn btn-primary m1 b1">All Done</button>;
        } else {
          theButton = <button className="btn btn-primary m1 b1" disabled="disabled">All Done</button>
        }

        if (this.state.fullPoints == false && this.state.doneClick == true) {
          if (this.state.shitDates.length > 0){
            shitTix = (<ShittyForm dates={this.state.shitDates} />);
          } else {
            shitTix = (<p className="center">Sorry, unfortunately you have not shared enough data to get a ticket and we are sold out of tickets for people who do not share data. Please try back once we announce more dates or consider sharing more data.</p>);
          }
        }
        return (
            <div className="clearfix white py3" id="auth">
                <div className="col-10 mx-auto">
                    <h2 className="center">Data Sharing</h2>
                    <ul>
                      <li>Please select a share option <span className="att">for every provider</span>.</li>
                      <li>Remember, the more you share, the better your personal experience will be.</li>
                      <li>We go through extreme measures to protect you and your data, the goal of this show is to explore what all this data means.</li>
                    </ul>
                    <p className="center">Commonly people ask us about GMail data use so we want to tell you here that NO HUMAN EVER looks at your raw gmail data. For more info <a href="/about#faq">see our FAQ page</a></p>
                </div>
                <div className="col-8 mx-auto py1">
                    <div className="social flex flex-column">
                        <SocialAuth name="Google" url="/auth/google"/>
                        <SocialAuth name="Facebook" url="/auth/facebook"/>
                        <SocialAuth name="Instagram" url="/auth/instagram"/>
                        <SocialAuth name="Reddit" url="/auth/reddit"/>
                        <SocialAuth name="Spotify" url="/auth/spotify"/>
                        <SocialAuth name="Twitter" url="/auth/twitter"/>
                        <SocialAuth name="Tumblr" url="/auth/tumblr"/>
                    </div>
                </div>
                <div className="center done">
                        {theButton}
                </div>
                <div className="col-8 mx-auto py1">
                  {shitTix}
                </div>
            </div>
        )
    }
});

var ShittyForm = React.createClass({

  getIntialState: function () {
    return {
      id: null
    };
  },

  submitVals: function (e) {
    e.preventDefault();

    var data = {
        showtime_id: this.state.id,
        type: "shitty"
    };
    $.ajax({
        type: 'PUT',
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
  },
    
  componentDidMount: function () {
    $(document).scrollTop($(document).height());
  },

  changeDate: function(e) {
    this.setState({id: event.target.value});
  },

  render: function () {
    myTimes = [{"id": 99999, "date": "Please Choose a Date"}]
    this.props.dates.map( function ( date ){
      myTimes.push(date);
    });
    return (
      <div>
        <p className="center">Even though you did not share very much, we are allowing a limited number of people to take tickets without sharing much data. If you are interested in one of these tickets, choose one of the available dates below and press submit. If none of these dates work, we apologize, but since the show is about the future of data, we want to ensure a high-quality first performance. Consider sharing more data or checking back for future dates.</p>
        <form name="user-form">
            <div className="center">
              <label>Ticket Date</label>
            </div>
            <select onChange={this.changeDate} className="block mb2 mx-auto field">
                {myTimes.map(function ( atime, i ) {
                    if (i == 0) {
                        return <option value={atime.id} selected>{atime.date}</option>;
                    } else {
                        return <option value={atime.id}>{atime.date}</option>;
                    }
                })}
            </select>
            <button onClick={this.submitVals} type="submit" className="block btn btn-primary mx-auto">Submit</button>
          </form>
        </div>
      )
  }
});

module.exports = Auth;
