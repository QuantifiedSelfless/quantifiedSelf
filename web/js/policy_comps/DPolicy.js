var DPolicy = React.createClass({
    
    getInitialState: function() {
        // Check cookie
        var authed = false;


        return {
            data: []
        };
    },

    render: function() {
        return (
          <div className="clearfix"> 
            <div className="col-10 mx-auto white">
                <h1 className="center">Data and Privacy Policy</h1>
                <h2>Overview</h2>
                <p>On the website reached via the address "iamadatapoint.com" (hereafter the 'Site'), we offer a sign-up service for a ticketed theater performance and art exhibition, Quantified Self. This project is a part of Michael Skirpan's (mwskirpan.com) PhD work at University of Colorado at Boulder, and is supported by Tom Yeh's Sikuli Lab and CU-Boulder's Engineering Excellence Fund.</p>
                <p>The show uses attendees’ own data to generate the art and dictate the experience. Thus, to participate in the experience, users are asked to connect through one or more of their email and social media accounts, in keeping with this Policy (hereafter the 'Policy'). Users also have the choice to not share information or tell us they do not use certain online services. The only consequence of not sharing is for free performances, when tickets are limited, we may prefer users who share more since it will improve the quality of the show.</p>
                <p>These terms may be modified at any time by University of Colorado without notification to the users. It is advisable to reread the terms at the time of signing up.</p>
                <h2>ARTICLE 1. TERMS FOR AGREEING TO SHARE DATA IN ADVANCE OF THE SHOW</h2>
                <p>To make it possible to personalize the performance and exhibit that are offered the night of the user's attendance, after deciding to book a ticket, the user is asked to share their name and surname, and then to share access to their data held by third-party services. We DO NOT store the entirety of the user's shared dataset, but rather build a profile associated with the user similar to a cookie tracking service, and only store select data relevant to specific exhibits for the night you attend. This is done by:</p>
                <ul>
                    <li>Authorizing through the user's Gmail, Facebook, Twitter, Instagram, Reddit, Spotify, and/or Tumblr account(s).</li>
                    <li>Taking a short survey on our website</li>
                </ul>

                <p>By authorizing one or more of your accounts to the Site, you give consent for Quantified Self's team to access the data on such accounts which may include friends' names, photos, life events, etc.</p>

                <h2>ARTICLE 2. LIABILITY</h2>
                <p>It is expressly understood that Quantified Self's staff and parent organizations will in no way be held responsible for any damages suffered by users and/or any third party as a result of:</p>
                <ul>
                    <li>Unavailability or malfunction of the Site, regardless of the cause</li>
                    <li>Loss of data specific to the user</li>
                    <li>Consequence of any computer virus</li>
                    <li>Any unforeseeable circumstance that prevents Quantified Self from fulfilling this contract such as users signing up through an insecure or compromised connection.</li>
                </ul>

                <p>Due to the characteristics of the Internet, particularly the fact that the staff and sponsors of Quantified Self cannot ensure every user is using proper security precautions, Quantified Self's staff and sponsors will in no event be held liable for damages of any kind, whether accidental or suffered by the user or third parties, and whether caused or not by third parties.</p>

                <h2>ARTICLE 3. PERSONAL DATA</h2>
                <ol>
                    <li>The personal and electronic identification data that may be collected from you the user are subject to automated data processing. This allows us to only collect the data needed specific to the show quickly and to ensure that our collection complies with current legislation and the policies of the third-party services.</li>
                    <li>Upon requesting a ticket, and sharing your data, until the end of the performance on the night you attend, you have the right to request the deletion of all personal data we have obtained. In the event you share your data and do not attend the event, we will delete all of your personal data following the performance.</li>
                    <li>Your data will never be subject to any commercial, promotional, or third-party use of any kind. We will never share your data unless we are required to by law.</li>
                    <li>All personal data will be deleted at the end of the performance the night you attend.</li>
                    <li>All personal data will be deleted at the end of the performance the night you attend.</li>
                    <li>We use standard filters to automatically remove sensitive data (e.g., account numbers, phone numbers) incident to the data re require; however, names, images, interests and other profile-based data will be used during the performance.</li>
                </ol>

                <h2>ARTICLE 4. COOKIE POLICY</h2>
                <p>Our site uses a temporary cookie during the sign-up process that is deleted upon completion. We simply use it to make sign up simpler in the event of a disruption during the sign-up process.</p>
                
                <h2>ARTICLE 5. SITE MODIFICATIONS</h2>
                <p>Quantified Self reserves the right to modify or discontinue access to the Site at any time, be it temporarily, sporadically, or permanently, and with or without notice. By using the Site you, the user, acknowledge that Quantified Self is not responsible toward you or any other party with respect to any modification, suspension or discontinuance of the Site and its participation zone.</p>
                <h2>ARTICLE 6. APPLICABLE LAW - JURISDICTION</h2>
                <p>These Terms are governed by the laws of the United States of America. In the case of dispute, we are located in the city of Boulder, Boulder County, Colorado, United States of America and thus are subject to the courts of those jurisdictions.</p>
                <h2>ARTICLE 7. IDENTIFICATION</h2>
                <p>Quantified Self and iamadatapoint.com are provided by Michael Skirpan, Jacqueline Cameron, Tom Yeh, the Sikuli Lab of University Colorado at Boulder, and the Engineering Excellence Fund at the University of Colorado at Boulder.</p>
                <p>Head Office:</p>
                <p>1111 Engineering Drive</p>
                <p>ECOT 717, 430 UCB</p>
                <p>Boulder, CO 80309-0430 USA</p>
                <p>EMAIL: michael [dot] skirpan [at] colorado [dot] edu</p>
            </div>
          </div>
        );
    }

});

module.exports = DPolicy;
    //May want a handleclick function
