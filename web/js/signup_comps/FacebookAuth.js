var FacebookAuth = React.createClass({

    render: function() {
        return (
            <div>
              <div className="authbtn facebook">
                  <a className="zocial facebook" href="/auth/facebook">
                      Authorize with Facebook
                  </a>
              </div>

                <a href="/auth/facebook?share=noacct">
                    <button className="btn btn-primary m3 b1 bg-orange">Do not use Facebook</button>
                </a>
                <a href="/auth/facebook?share=noshare">
                    <button className="btn btn-primary m3 b1 bg-red">Will not share</button>
                </a>
            </div>
        );
    }

});

module.exports = FacebookAuth;
