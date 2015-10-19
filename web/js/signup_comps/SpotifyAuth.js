var SpotifyAuth = React.createClass({

    render: function() {
        return (

            <div>
              <div className="authbtn spotify">
                  <a className="zocial spotify" href="/auth/spotify">
                      Authorize with Spotify
                  </a>
              </div>

                <a href="/auth/spotify?share=noacct">
                    <button className="btn btn-primary m3 b1 bg-orange">Do not use Spotify</button>
                </a>
                <a href="/auth/spotify?share=noshare">
                    <button className="btn btn-primary m3 b1 bg-red">Will not share</button>
                </a>
            </div>
        );
    }

});

module.exports = SpotifyAuth;
