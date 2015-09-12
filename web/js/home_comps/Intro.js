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
          <div className="clearfix fit"> 
            <div className="col-8 mx-auto center white">
            <p><span className="elec">Quantified Self</span> is an interactive art and immersive theater experience that asks you to consider your relationship to the data you create online. By working with your online and social media profiles, we generate our own portfolio to customize the art and personalize the experience to you. During the show, you will interact with actors, audience members, and lots of technology. Please join us in asking "Are we in control of all this data, or is it controlling us?"<br /> <br />The information era is already upon us, are you prepared to look a bit deeper?</p>
            </div>
          </div>
        );
    }

});

module.exports = Intro;
    //May want a handleclick function
