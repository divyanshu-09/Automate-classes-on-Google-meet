
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
    await page.screenshot({path: 'example.png'});

    await page.goto(url);    //google meet link of the meeting

    //await page.screenshot({path: 'example.png'});
    await login_to_google(page,id,password);    

    
    await turn_media_off(page);

    await page.click(".l4V7wb.Fxmcue");     //Ask to join button in the google meet

    console.log("Asked to join in the class");


    //await page.screenshot({path: 'example.png'});
    await page.waitForTimeout(2000);
    await page.screenshot({path: 'example.png'});
    await page.waitForSelector(".HKarue");
    await page.click(".HKarue");

    
    await attendance(page);
    setInterval( function() { attendance(page); }, 3000 );
    
    // await page.waitForSelector(".Pc9Gce.Wic03c")
    // await page.click('.Pc9Gce.Wic03c');

    // await page.waitForTimeout(2000);
    // await page.type('.Pc9Gce.Wic03c',roll_no);
    // await page.click('.DPvwYc.e3AdI')

    console.log('You have successfully joined the class of ' + subject);
}



async function login_to_google(page,id,password) {

    await page.waitForSelector("#Email");
    await page.type("#Email",id);

    console.log("Email filled");
    await page.screenshot({path: 'example.png'});

    await page.waitForTimeout(1000);
    await page.click('#next');

    await page.waitForSelector("#password");
    await page.type("#password",password);

    console.log("password filled");
    //await page.screenshot({path: 'example.png'});

    await page.waitForTimeout(2000);
    await page.screenshot({path: 'example.png'});
    await page.click('#submit');
}




async function turn_media_off(page) {

    await page.waitForTimeout(5000);
    await page.waitForSelector(".U26fgb.JRY2Pb.mUbCce.kpROve.uJNmj.QmxbVb.HNeRed.M9Bg4d");

    let audio_video = await page.$$(".U26fgb.JRY2Pb.mUbCce.kpROve.uJNmj.QmxbVb.HNeRed.M9Bg4d");
    await page.screenshot({path: 'example.png'});

    for( const element of audio_video ) {

        await page.waitForTimeout(3000);
        await element.click();
        //console.log("times");
        //await page.waitForTimeout(3000);
    }

    console.log("mic and camera off");
    await page.waitForTimeout(3000);
    await page.screenshot({path: 'example.png'});
}


async function attendance(page) {

    //console.log("I am in the attendance");
    let chats = await page.$$('.Zmm6We .oIy2qc');

    for(let i=0;i<chats.length;i++) {

        let chat_content = await page.evaluate(function(ele){

            return ele.textContent;

        },chats[i]);
        

        if( chat_content != '1851106' && attendance_bool && chat_content.startsWith('1851')) {

            console.log("attendance marked");
            await page.waitForTimeout(2000);
            await page.type('.Pc9Gce.Wic03c','1851106');
            await page.click('.DPvwYc.e3AdI')
            
            
            attendance_bool = false;
        }

        await page.waitForTimeout(1000);
        //console.log(attendance_bool)

    }
}



module.exports = main;