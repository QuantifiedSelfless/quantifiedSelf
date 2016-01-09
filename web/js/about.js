//Currently am loading React from CDN
var Markdown = require('react-remarkable');
var _ = require('lodash');
var Footer = require('./home_comps/Footer.js');
var Nav = require('./home_comps/Nav.js');

var Team = React.createClass({

    render: function() {
        return (
                <div>
                    <h3>Team</h3>
                    {
                        _.map(this.props.members, function(member) {
                            return (<div className="mb4">
                                    <p><strong>{member.name}</strong> - <em>{member.role}</em></p>
                                    <Markdown source={member.description} />
                                    </div>
                                   );
                        })
                    }
                </div>
               );
    }
});

var Desc = React.createClass({

    render: function() {
        return (
                <div>
                    <p><span className="elec">Quantified Self</span> is a project exploring how the Internet and society are changing as we continue to share and use more personal data. We explore this through immersive theater, interactive art, and public dialogue and forum. Our production involves both performance and interactive art where attendees will watch a theater piece where the actors will prompt them to participate, and then be guided to interact with art pieces (e.g., imagery, games, robots) that use profiles specific to the audience member's personal data.</p>
                    <p>For this to work, when attendees RSVP for a ticket, they share with us their online data, which is available through the applications they use (e.g., Google, YouTube, Facebook). We use that data to generate a profile on you similar to those your online services have. That profile allows us to personalize the theater and art so that the audience is directly integrated into the piece.</p>
                    <p>We also will be holding public events in libraries, museums, and corporate offices that will involve discussion between technologists and users. Our art exhibits will provide a neutral object to direct conversations around privacy, online rights, inferences made about users, etc.</p>
                    <h3>Dates</h3>
                    <p>Right now our first production is slated to run <span className="elec">April 25-28, 2016</span> in University of Colorado - Boulder's Blackbox Theater. We are currently working on adding more dates and a list of public events. Stay tuned.</p>
                    <h3>Contact</h3>
                    <p>You can contact our team at: quantifiedselfless [at] gmail [dot] com</p>
                    <p>For media inquiries please contact our project lead at: michael [dot] skirpan [at] gmail [dot] com</p>
                </div>
               );
    }
});

var About = React.createClass({
    
    getInitialState: function() {
        return { team: [
            {   name: "Michael Skirpan",
                role: "Director, Writer, Producer, and Project Lead",
                description: "Michael is a PhD student at [University of Colorado at Boulder](http://www.colorado.edu/cs/researchtopics/human-centered-computing) in Computer Science. His interests are art, democratic education, alternative pedagogies, data science, coding, and writing. He also works with a group of artists and scientists at CoLab." 
            },
            {   name: "Jackie Cameron",
                role: "Designer, Producer",
                description: "Jackie is a PhD student at [University of Colorado at Boulder's ATLAS Institute](http://atlas.colorado.edu/). She is interested in citizen science, information visualization, democratic education, and data art."
            }
        ]}
    },

    render: function() {
        return (
                <div className="clearfix">
                    <div className="col-10 px2 mx-auto white">
                        <h2 className="center border-bottom">About Quantified Self</h2>
                        <Desc />
                        <div className="border-bottom"></div>
                        <Team members={this.state.team} />
                    </div>
                </div>
               )}
});





React.render(
        <Nav />,
        document.getElementById('nav')
);
React.render(
        <About />,
        document.getElementById('about')
);
React.render(
        <Footer />,
        document.getElementById('footer')
);
