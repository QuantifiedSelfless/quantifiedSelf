var Footer = React.createClass({
    
    getInitialState: function() {
        // Check cookie
        var authed = false;


        return {
            data: []
        };
    },


        //Set AJAX request
        //Ideally will not see anything from server until oauth process is done.
        //May need to open a new tab in browser? Or, check if Tornado can send this popup.

    render: function() {
        return (
        <div className="border-top bg-lighten-1 flex">
            <br />
          <div className="left bg-lighten-1">
            <img src="/static/img/CULogo.png" width="30%" />
          </div>
          <div className="right white bg-lighten-1">
            <p>Questions? Contact our project lead - michael[dot]skirpan[at]colorado[dot]edu </p>
          </div>
        </div>
        );
    }
});

module.exports = Footer;
    //May want a handleclick function
