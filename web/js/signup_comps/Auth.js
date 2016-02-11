var SocialAuth = React.createClass({
    getInitialState: function () {
      return {
        loginWindow: '',
        loginWindowTimer: null

      }
    },
    authorize: function () {
      this.setState({loginWindow: window.open(this.props.url, this.props.name + " Login", "location=1,scrollbars=1,width=500,height=400")});
      this.setState({loginWindowTimer: setInterval(this.tick, 200)});
    },
    noshare: function () {
      window.open(this.props.url + "?share=noshare", this.props.name + " Login", "location=1,scrollbars=1,width=500,height=400");
      $("#"+this.props.name+"-SocialAuthElement #noshareButton").css("border-color", "red");
      $("#"+this.props.name+"-SocialAuthElement #noshareButton").css("color", "red");
    },
    nouse: function () {
      window.open(this.props.url + "?share=noacct", this.props.name + " Login", "location=1,scrollbars=1,width=500,height=400");
      $("#"+this.props.name+"-SocialAuthElement #nouseButton").css("border-color", "yellow");
      $("#"+this.props.name+"-SocialAuthElement #nouseButton").css("color", "yellow");
    },
    tick: function () {
      if(this.state.loginWindow.closed) {
        clearInterval(this.state.loginWindowTimer);
        if(this.getCookie("auth-result") == "success") {
          $("#"+this.props.name+"-SocialAuthElement #authorizeButton").css("border-color", "green");
          $("#"+this.props.name+"-SocialAuthElement #authorizeButton").css("color", "green");
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
                Will not share</div>
            <div className="flex-auto"></div>
            <div id="nouseButton" className="flex-auto btn btn-outline" onClick={this.nouse}>
                Do not use
            </div>
          </div>
        </div>
        )
    }
});

var Auth = React.createClass({
    getInitialState: function () {
        return {
            data: []
        };
    },

    render: function () {
        return (
            <div className="clearfix white py3">
                <div className="col-10 mx-auto">
                    <p className="center">Please go through our list of providers and share with us as many as possible. We only store what is necessary for the show. We also encrypt all information and delete all of your shared information after your visit. The more information you provide, the better the experience.</p>
                    <p className="center">Commonly people ask us about GMail data use so we want to tell you here that no human EVER looks at your raw gmail data. For more info <a href="/about#faq">see our FAQ page</a></p>
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
                    <a href="/signup#thankyou">
                        <button className="btn btn-primary m1 b1">All Done</button>
                    </a>
                </div>
            </div>
        )
    }

});

module.exports = Auth;
