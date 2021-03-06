const aspectratio=screen.width/screen.height;
// console.log(aspectratio);
var canvasWidth=1280;
var canvasHeight=720;

// Webcam Element
// ==========================================================================================================
const webcamElement = document.getElementById('webcam');
webcamElement.height=Math.min(window.innerHeight,720);
webcamElement.width=(16*webcamElement.height)/9;
const media=document.getElementById('media');
const defaultheight=Math.min(window.innerHeight,720);
// ==========================================================================================================


// Display Variables and Elements
// ==========================================================================================================
var count = 0;
// ==========================================================================================================


// State Control Variables
// ==========================================================================================================
var fnstate = 0;
// ==========================================================================================================


// Button Elements
// ==========================================================================================================
const fsbutton=document.getElementById('fsbutton');
const helpbutton=document.getElementById('helpbutton');
// ==========================================================================================================


// Script environment variables
// ==========================================================================================================
var exerciseName='';
const lineWidth = 2;
const minConfidencescore=0.5;
var frames=0;
var fr=0;
var saved_length=50;

const flipPoseHorizontal = true;
var timecounter=0;
let lim = 0;
let lastLoop = new Date();
let fps;
// ==========================================================================================================


// Game Canvas Variables
// ==========================================================================================================
const canvas2 = document.getElementById('output2');
const ctx2 = canvas2.getContext('2d');
canvas2.width = canvasWidth;
canvas2.height = canvasHeight;

const green='#00ff00';
const white='white';
var colour=null;
// ==========================================================================================================
// var btwlines= new Audio('Audio files/Instructions/Step back to fit within the yellow lines.mp3');
var played=0;

const canvas1 = document.getElementById('output1');
const ctx1 = canvas1.getContext('2d');
canvas1.width = canvasWidth;
canvas1.height = canvasHeight;
POSE_CONNECTIONS=[[24,26],[26,28],[23,25],[25,27],[12,24],[11,23],[24,23],[11,12],[11,13],[13,15],[12,14],[14,16]];




// Function to toggle fullscreen mode
var fullscreen=0;
function fullscreentoggle(){
    var elem = document.documentElement;
    if(!fullscreen){

        /* View in fullscreen */
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
        fullscreen=1;

    }
    else{
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
        fullscreen=0;
    }
}

// Function to open help page
var helpdisp=0;
function openhelp(){
    if(helpdisp){
        document.getElementById("helpinfo").style.width = "0%";
        helpdisp=0;
    }
    else{
        document.getElementById("helpinfo").style.width = "100%";
        helpdisp=1;
    }
}

// Function to open menu
var menu=1;
function openNav() {
    if(menu){
        document.getElementById("myNav").style.width = "0%";
        menu=0;
    }
    else{
        document.getElementById("myNav").style.width = "100%";
        menu=1;
    }
  }
var functionVar=null;

// Function to load appropriate js file for different examples
function game(x){
    switch (x) {
        case 1:
            // gamename.innerHTML='Burpees';

            $.getScript("Abhi/athelete1.js");
            exerciseName='athelete1';
            functionVar=1;
            initialized=1;
            openNav();

            count=0;
            played=0;
            break;

        case 2:

            $.getScript("Abhi/coach1.js");
            exerciseName='coach1';
            functionVar=1;
            initialized=1;
            openNav();

            count=0;
            played=0;
            break;
        
        case 3:

            $.getScript("Abhi/athelete2.js");
            exerciseName='athelete2';
            functionVar=1;
            initialized=1;
            openNav();

            count=0;
            played=0;
            break;
        case 4:

            $.getScript("Abhi/coach2.js");
            exerciseName='coach2';
            functionVar=1;
            initialized=1;
            openNav();

            count=0;
            played=0;
            break;

        default:
            break;
    }
}

// ==========================================================================================================

// Function to calculate angle between body parts
function find_angle(A,B,C) {
    var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
    var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
    var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB))*180/Math.PI;
}

// ==========================================================================================================




  

// Run main function
// ==========================================================================================================

const minConfidence=0.5;
var initialized=1;

function onResults(results) {
    // Dynamic scaling of video and canvas
    if((window.innerWidth/window.innerHeight>=aspectratio && window.innerHeight!=canvasHeight) || (window.innerWidth/window.innerHeight<aspectratio && window.innerWidth!=canvasWidth)){
        if(window.innerWidth/window.innerHeight>=aspectratio){
            canvasHeight=window.innerHeight;
            canvasWidth=canvasHeight*aspectratio;
        }
        else{
            canvasWidth=window.innerWidth;
            canvasHeight=canvasWidth/aspectratio;
        }
        webcamElement.height=canvasHeight
        webcamElement.width=canvasWidth;
        canvas1.height=canvasHeight;
        canvas1.width=canvasWidth;
        canvas2.height=canvasHeight;
        canvas2.width=canvasWidth;
    }


    ctx1.save();
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx1.drawImage(
        results.image, 0, 0, canvas1.width, canvas1.height);
    ctx2.save();
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    
    var clr='blue';

    if (functionVar!=null){
        if (!initialized){
            if(!played){
                // btwlines.play();
                played=1;

            }
            var txt='';
            ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
            ctx1.drawImage(results.image, 0, 0, canvas1.width, canvas1.height);
            var clrup='blue';
            var clrdown='blue';
            
            ctx1.fillStyle = 'yellow';
            ctx1.font = "900 "+canvasHeight*0.05+"px Arial";

            try{
            drawConnectors(ctx1, results.poseLandmarks, POSE_CONNECTIONS,
                {color: 'white'});
            drawLandmarks(ctx1, [results.poseLandmarks[11],results.poseLandmarks[12],results.poseLandmarks[13],results.poseLandmarks[14],results.poseLandmarks[15],results.poseLandmarks[16],results.poseLandmarks[23],results.poseLandmarks[24],results.poseLandmarks[25],results.poseLandmarks[26],results.poseLandmarks[27],results.poseLandmarks[28]],
               {color: 'white', fillColor:'white',lineWidth: 4, radius: 6});
            }
            catch(err){}
            
            try{
                if((results.poseLandmarks[0].visibility>0.8 && results.poseLandmarks[27].visibility>0.8 && results.poseLandmarks[28].visibility>0.8) && !(results.poseLandmarks[33].y<0.1 || results.poseLandmarks[33].y>0.2) && !(results.poseLandmarks[27].y<0.8 || results.poseLandmarks[27].y>0.9 || results.poseLandmarks[28].y<0.8 || results.poseLandmarks[28].y>0.9)){
                    initialized=1;
                }
                else{
                    if (results.poseLandmarks[33].y<0.1 ){
                        
                    }
                    else if( results.poseLandmarks[33].y>0.2){
                        ctx1.fillText('Head ->', 0.1*canvasWidth, 0.15*canvasHeight);
                    }
                    else{
                        clrup='green';
                    }
                    if (  results.poseLandmarks[27].y>0.9 || results.poseLandmarks[28].y>0.9){
                        
                    }
                    else if(results.poseLandmarks[27].y<0.8 || results.poseLandmarks[28].y<0.8){
                        ctx1.fillText('Ankles ->', 0.1*canvasWidth, 0.87*canvasHeight);
                    }
                    else{
                        clrdown='green';
                    }
                    
                }
            }
            catch(err){}
                ctx1.textAlign = "center";
                ctx1.font = "900 "+canvasHeight*0.05+"px Arial";
                // ctx1.fillText(txt, 0.5*canvasWidth, 0.8*canvasHeight);
                ctx1.fillStyle = clrup;
                ctx1.fillRect(0, canvasHeight*0.1, canvasWidth, 5);
                // ctx1.fillRect(0, canvasHeight*0.2, canvasWidth, 5);
            
                ctx1.fillStyle = clrdown;
                // ctx1.fillRect(0, canvasHeight*0.8, canvasWidth, 5);
                ctx1.fillRect(0, canvasHeight*0.90, canvasWidth, 5);
        }
        else{
            try{
                Exercise(results);

            }
            catch(err){}
    

  
        }
    }
    
    

    ctx1.restore();
    ctx2.restore();
    
  }
  

//   Loading Pose Estimation Model with default parameters
  const pose = new Pose({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
  }});
  pose.setOptions({
    upperBodyOnly: false,
    smoothLandmarks: true,
    selfieMode: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });


                
pose.onResults(onResults);

// Webcam controller
  const camera = new Camera(webcamElement, {
    onFrame: async () => {
      await pose.send({image: webcamElement});
    },
    width: 1280,
    height: 720
  });

  camera.start();

//   Timing Function
  setInterval(function(){timecounter+=1;frames=fr;fr=0;},1000);