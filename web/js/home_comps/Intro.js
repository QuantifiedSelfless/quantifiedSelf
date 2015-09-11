var Intro = React.createClass({
    
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
            <div className="p10 mx-auto">
               <p>I will never do this again without going to the mall. Seriously it's scaring me to see all the things that we can do these days with these machines. I'm not sure I even know if my friends are my friends or if dudes are dudes or anything. I always just wanted to bro out. </p>
            </div>
        );
    }

});

module.exports = Intro;
    //May want a handleclick function
