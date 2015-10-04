var FacebookAuth = React.createClass({

    render: function() {
        return (
          <div className="authbtn facebook">
              <a className="zocial facebook" href="/auth/facebook">
                  Authorize with Facebook
              </a>
          </div>
        );
    }

});

module.exports = FacebookAuth;
