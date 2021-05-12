
const puppy = require( 'puppeteer-extra' )  //puppeeteer-extra with stealth passes all public bot tests.
// refer here for more details :- https://github.com/puppeteer/puppeteer/issues/4871

const StealthPlugin = require( 'puppeteer-extra-plugin-stealth' ) 
//Applies various evasion techniques to make detection of headless puppeteer harder.(needed for google sign in)

puppy.use( StealthPlugin() )

let attendance_bool = true;

const main = async (id, password, url, roll_no, subject) => {

    let browser = await puppy.launch ({

        headless : true,
        defaultViewport : false,

        args: [

            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--use-fake-ui-for-media-stream', //https://stackoverflow.com/questions/48264537/auto-allow-webcam-access-using-puppeteer-for-node-js
            '--disable-audio-output'   // for disabling the output of the chrome
        ],

    });

    let pages = await browser.pages();
    const page = pages[0];

    console.log("Browser opened")

    await page.goto(url);    //google meet link of the meeting

    await login_to_google(page,id,password);    //login to Google account

    
    await turn_media_off(page);       //Turns of camera and microphone

    await page.click(".l4V7wb.Fxmcue");     //Ask to join button in the google meet

    console.log("Asked to join in the class");

    
    await page.waitForTimeout(2000);
    await page.waitForSelector(".HKarue");
    await page.click(".HKarue");            //Opens the chat box

    
    await attendance(page);
    setInterval( function() { attendance(page); }, 3000 );      //Attendance feature
    

    console.log('You have successfully joined the class of ' + subject);
}


// Function for google sign in
async function login_to_google(page,id,password) {

    await page.waitForSelector("#Email");
    await page.type("#Email",id);

    console.log("Email filled");

    await page.waitForTimeout(1000);
    await page.click('#next');

    await page.waitForSelector("#password");
    await page.type("#password",password);

    console.log("password filled");

    await page.waitForTimeout(2000);
    await page.click('#submit');
}



// Function for turning off mic and camera
async function turn_media_off(page) {

    await page.waitForTimeout(5000);
    await page.waitForSelector(".U26fgb.JRY2Pb.mUbCce.kpROve.uJNmj.QmxbVb.HNeRed.M9Bg4d");    //Css selector for audio and video

    let audio_video = await page.$$(".U26fgb.JRY2Pb.mUbCce.kpROve.uJNmj.QmxbVb.HNeRed.M9Bg4d");

    for( const element of audio_video ) {

        await page.waitForTimeout(3000);
        await element.click();
    }

    console.log("mic and camera off");
    await page.waitForTimeout(3000);
}


// Function for handling the attendance feature
async function attendance(page) {

    let chats = await page.$$('.Zmm6We .oIy2qc');         //Css selector for all the chats

    for(let i=0;i<chats.length;i++) {

        let chat_content = await page.evaluate(function(ele){          //evaluates each chat text

            return ele.textContent;

        },chats[i]);
        

        if( chat_content != '1851106' && attendance_bool && chat_content.startsWith('1851')) {     //checks if last chat wasn't my roll and it is roll no. of any other student

            console.log("attendance marked");
            await page.waitForTimeout(2000);
            await page.type('.Pc9Gce.Wic03c','1851106');               // Typing roll
            await page.click('.DPvwYc.e3AdI')                          // Sending the attendance
            
            
            attendance_bool = false;
        }

        await page.waitForTimeout(1000);

    }
}



module.exports = main;
