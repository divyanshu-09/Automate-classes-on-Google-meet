
const routine = require("./Routine.js")
const Google_Meet = require("./google_meet.js");

var no_of_class_done = 0;

check_class();
setInterval(check_class, 60000);


function check_class() {

    //console.log('I am here');
    var index = no_of_class_done;

    let now = new Date();

    //console.log(now.getHours() == routine.findclass(index)["hours"]);

    let start_class = false;

    if(now.getHours() == routine.findclass(index)["hours"] && now.getMinutes() == routine.findclass(index)["minutes"])
        start_class = true;

    console.log(start_class);

    if(start_class) {

        var username = routine.findUser()['Id'];

        var password = routine.findUser()['pass'];

        var meeting_url = routine.findclass(index)['link'];

        var subject = routine.findclass( index )[ 'subject' ];

        var roll_no = routine.findclass( index )['roll_no'];

        Google_Meet( username, password, meeting_url, roll_no, subject );
            
        no_of_class_done += 1 ;
    }
}
