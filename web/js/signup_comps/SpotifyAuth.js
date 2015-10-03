var SpotifyAuth = React.createClass({

    render: function() {
        return (
          <div className="authbtn spotify">
              <a className="zocial spotify" href="/auth/spotify">
                  Authorize with Spotify
              </a>
          </div>
        );
    }

});

module.exports = SpotifyAuth;
