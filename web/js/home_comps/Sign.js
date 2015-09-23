var Sign = React.createClass({
    
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
          <div className="mx-auto">
            <button className="btn btn-outline mb2 aqua rsvp">Get a Ticket</button>
          </div>
        );
    }

});

module.exports = Sign;
    //May want a handleclick function
