# Automate-classes-on-Google-meet

This is a puppeteer project. It automates all your google meet classes. It keeps track of the time and just when its time for your class it automatically launches a headless chrome in the background and joins in the meeting. It does all that in the background without any hindrance on the screen. I have also implemented the attendance feature in this code.
The attendance feature sends your Roll no. in the chat only when it detects other participants of the meeting sending their roll nos. not on any other random messages.
It will automatically login to the meeting, give your attendance, and move out once the class is finished.

## Demo
I have made a video describing what the whole project does. Here is the [video](https://www.linkedin.com/feed/update/urn:li:activity:6797079922427928576/)

## Features
- Sit back and relax - it will handle all your online meet classes.
- It automatically join all the meetings listed in routine file
  -  Regularly checks if it is time for the class
  -  As soon as it is time launches headless chrome
  -  Login to your google account
  -  Turn off your camera, microphone and mute the site
  -  Asks to join and get entered in the meeting without knowing anyone even anyone is behind the screen or not.
  -  Sends your attendance
  -  It is very reliable will not turn on your camera or microphone at anytime in the meeting.
- It can handle as many google meeting classes as you will mention in the routine.js. Even if all the meetings are at the same minute.
- Want to add a feature? Modify it! Raise a Pull Request too 😉

## Installation
It is a node project so you need to have node and npm setup in your computer.
Then just clone the project and install all the dependencies needed for the project with just one command
```
npm install
```
The routine.js file inlcudes all the the classes with their link do edit it according to your routine and it also contains the college google account with which you need to be in the class do edit it also.
