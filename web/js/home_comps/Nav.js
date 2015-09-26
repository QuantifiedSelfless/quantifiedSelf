var Nav = React.createClass({
    
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
        <nav className="clearfix white bg-black">
            <div className="sm-col">
                <a href="/"><img width="60%" src="/static/img/QuantifiedSelfLogoHorizontal.svg" onerror="this.src='/static/img/QuantifiedSelfLogoHorizontal.png'" /></a>
            </div>
            <div className="sm-col-right">
                <a href="/" className="btn py2">About</a>
                <a href="/" className="btn py2">Contact</a>
            </div>
        </nav>
        )}
});

module.exports = Nav;
    //May want a handleclick function
