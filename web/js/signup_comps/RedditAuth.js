var RedditAuth = React.createClass({

    render: function() {
        return (
            <div>
              <div className="authbtn reddit">
                  <a className="zocial reddit" href="/auth/reddit">
                      Authorize with Reddit
                  </a>
              </div>

                <a href="/auth/reddit?share=noacct">
                    <button className="btn btn-primary m3 b1 bg-orange">Do not use Reddit</button>
                </a>
                <a href="/auth/reddit?share=noshare">
                    <button className="btn btn-primary m3 b1 bg-red">Will not share</button>
                </a>
            </div>
        );
    }

});

module.exports = RedditAuth;
