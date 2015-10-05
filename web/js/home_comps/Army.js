var Army = React.createClass({
    
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
        var wset = {
            width: '85%'
        };
        return (
          <div className="center" style={wset}>
            <div className="flex">
              <div className="army-1 flex-auto">
                <img className="p3" width="15%" src="/static/img/ArmyOfInsights/NewJob.svg" onerror="this.src='/static/img/ArmyOfInsights/NewJob.png'" />
                <img className="p3" width="15%" src="/static/img/ArmyOfInsights/Windows.svg" onerror="this.src='/static/img/ArmyOfInsights/Windows.png'" />
                <img  className="p3" width="15%" src="/static/img/ArmyOfInsights/LinkedIn.svg" onerror="this.src='/static/img/ArmyOfInsights/LinkedIn.png'" />
                <img className="p3" width="15%" src="/static/img/ArmyOfInsights/1565Selfies.svg" onerror="this.src='/static/img/ArmyOfInsights/1565Selfies.png'" />
              </div>
            </div>

            <div className="flex">
                <div className="army-1 flex-auto">
                    <img className="p3" width="15%" src="/static/img/ArmyOfInsights/WantsCar.svg" onerror="this.src='/static/img/ArmyOfInsights/WantsCar.png'" />
                    <img className="p3" width="15%" src="/static/img/ArmyOfInsights/BuysSpinach.svg" onerror="this.src='/static/img/ArmyOfInsights/BuysSpinach.png'" />
                    <img  className="p3" width="15%" src="/static/img/ArmyOfInsights/FeelsLonely.svg" onerror="this.src='/static/img/ArmyOfInsights/FeelsLonely.png'" />
                </div>
              </div>
          
            <div className="flex">
                <div className="army-1 flex-auto">
                    <img  className="p3" width="15%" src="/static/img/ArmyOfInsights/Apple.svg" onerror="this.src='/static/img/ArmyOfInsights/Apple.png'" />
                    <img className="p3" width="15%" src="/static/img/ArmyOfInsights/Android.svg" onerror="this.src='/static/img/ArmyOfInsights/Android.png'" />
                </div>
              </div>
            <div className="flex">
                <div className="flex-auto">
                    <img className="p3" width="33%" src="/static/img/QSLogoUpdateWhite.svg" />
                </div>
            </div>
            <div className="flex">
                <div className="army-1 flex-auto">
                    
                </div>
              </div>

          </div>
        );
    }

});

module.exports = Army;
    //May want a handleclick function
