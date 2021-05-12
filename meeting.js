
const routine = require("./Routine.js")
const Google_Meet = require("./google_meet.js");

var no_of_class_done = 0;

check_class();
setInterval(check_class, 60000);           //checks every minute if it is the time for class or not


function check_class() {

    //console.log('I am here');
    var index = no_of_class_done;

    let now = new Date();                 // Current date and time

    //console.log(now.getHours() == routine.findclass(index)["hours"]);

    let start_class = false;              //boolean which is made true if it is the time for class

    if(now.getHours() == routine.findclass(index)["hours"] && now.getMinutes() == routine.findclass(index)["minutes"])    //checks time of class with current time 
        start_class = true;

    console.log(start_class);

    if(start_class) {

        var username = routine.findUser()['Id'];

        var password = routine.findUser()['pass'];

        var meeting_url = routine.findclass(index)['link'];

        var subject = routine.findclass( index )[ 'subject' ];

        var roll_no = routine.findclass( index )['roll_no'];

        Google_Meet( username, password, meeting_url, roll_no, subject );         //calls the google meet function with needed information
            
        no_of_class_done += 1 ;
    }
}
