# wifi-radio
modern day hifi radio project 

## Overview
As I needed a replacement for my 30-year old radio of the bathroom, i observed that :
- i wanted to listen to many radio stations, not just the local ones
- with age i became spoiled in terms of hifi rendering, so i needed something on the level of .aac hifi streaming together with a good sound card... you see it coming now i guess

## Strategy
Why not couple a cheap Pi thingy with a correct sound card and some powered speakers? I searched a bit and found a 12$ OrangePi that looked perfect (the Zero 3). I found a sound card as well (8$ Ugreen). When the package arrived the first tests were astounding. Of course the powered speakers were more expensive (80$ Alesis), but since the tests were so positive i took the decision and bought them. I also took the time to code a mini-app to manage the radio from the smartphone. My first attempts with Cordova resulted in many hours of work with very few results, so that i reverted to build a simple web page.

## Tinkering
The hardware integration is dead simple. The Pi found easily a home in the left speaker (i built a small cardboard box to hold it, that i glued to a wall inside of the speaker) and the outputs from the sound card are simply plugged to the inputs of the (right) speaker. 

## Software
I was very suspicious of the Orange Debian version, but after all it does its job (after some streamlining such as killing unused services etc.). However be aware that their package repository is provided by Huawei, which is a company linked to the chinese government. This detail can make one uncomfortable. I did not have the time to test ArmBian.

*The OrangePi wiki goes into great lengths for using complex tools to write their OS image to the SD card. This is all bulls..t. Just use dd.*

I did not bother to manage certificates for the Pi, so that you get http only. As this is anyway only a home appliance isolated from the hostile internet, this should not be a concern.

After some testing with VLC i finally adopted mpv as streaming software. I did not need PulseAudio (which i hate dearly) and struggled a bit to have barebones ALSA running. 
The front end is based on AngularJs (yes, totally outdated, but it is simple Javascript instead of Typescript, which i hate dearly as well). 

The looks are nice thanks to the Pico CSS toolkit. The backend is PHP and the station list is just a JSON file. You can't do it simpler. 

![Alt text](https://i.ibb.co/zXLy3Jw/Screenshot-2024-02-17-10-30-36.png?raw=true "screenshot")

## Conclusion
The result is awesome. The Alesis speakers deliver a surprisingly good quality (for the bathroom anyway). I can listen to any station of the world in superb quality. A pleasure!
## Downloads
I provide only the backend PHP and the frontend files as a helping indication for you (the offered backend works 'as is'). I am rather certain that you will choose another frontend technology anyway. I provide also the few custom CSS things that i needed.


