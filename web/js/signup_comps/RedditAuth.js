var RedditAuth = React.createClass({

    render: function() {
        return (
          <div className="authbtn reddit">
              <a className="zocial reddit" href="/auth/reddit">
                  Authorize with Reddit
              </a>
          </div>
        );
    }

});

module.exports = RedditAuth;
