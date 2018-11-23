/*
 * Javascript written in this tab will run every time a user is
 * assigned to an experiment and variation, but before any experiment
 * code runs. This hook is useful for tracking which variations a
 * visitor has been assigned to. Click the help icon for more information.
 */


// Initialise the experiment values
var state = window.optimizely.get('state');
var decision = state.getDecisionObject({ campaignId: campaignId });
var experimentName = decision.experiment.replace(' ('+experimentId+')', '');
var variationName = decision.variation.replace(' ('+variationId+')', '');
var traits = {};

// Send experiment data back to Kissmetrics
var fireOptlyKissTracking = function(){
  traits['Optimizely ' + experimentName] = variationName;
  window._kmq.push(['set', traits]);
};



/** 
**  Converting polling time to account for the 200ms polling interval.
**  E.g for 1 second polling time. 
**  1 * 5 = 5
**  5 * 200ms = 1000ms = 1sec
**/
var pollFor = parseInt(extension.pollingTime)*5;
//var pollFor = 50; // 10 sec

// Initiate polling for GA object.
var count = 0;
var poll = setInterval(function(){ 
    count++;
    console.log("Searching For Kiss");
    if (count >= pollFor)
    {
        clearInterval(poll);
        console.log("Timeout For Kiss");
    }
    if (typeof window._kmq !== 'undefined')
        {
            console.log("Kiss Found!");
            fireOptlyKissTracking();
            clearInterval(poll);
            
        }
}, 200);
