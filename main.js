song="";
lwx=0;
lwy=0;
lw_score=0;
rwx=0;
rwy=0;
rw_score=0;


function preload()
{
    song=loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
    console.log("posenet's status=Initialised");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        lwx=results[0].pose.leftWrist.x;
        lwy=results[0].pose.leftWrist.y;
        lw_score=results[0].pose.keypoints[9].score;
        rwx=results[0].pose.rightWrist.x;
        rwy=results[0].pose.rightWrist.y;
        rw_score=results[0].pose.keypoints[10].score;
    }
}

function draw()
{
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    if(rw_score>0.2)
    {
        circle(rwx,rwy,20);

        if(rwy > 0 && rwy <= 100)
        {
            document.getElementById("speed").innerHTML="Speed = 0.5X";
            song.rate(0.5);
        }
        else if(rwy >= 100 && rwy <= 200)
        {
            document.getElementById("speed").innerHTML="Speed = 1X";
            song.rate(1);
        }
        else if(rwy >= 200 && rwy <= 300)
        {
            document.getElementById("speed").innerHTML="Speed = 1.5X";
            song.rate(1.5);
        }
        else if(rwy >= 300 && rwy <= 400)
        {
            document.getElementById("speed").innerHTML="Speed = 2X";
            song.rate(2);
        }
        else if(rwy >= 400)
        {
            document.getElementById("speed").innerHTML="Speed = 2.5X";
            song.rate(2.5);
        }
    }

    if(lw_score>0.2)
    {
        circle(lwx,lwy,20);
        number_lwy=Number(lwy);
        remove_number=floor(number_lwy);
        volume=remove_number/500;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML="Volume = " + volume;
    }


}

function Play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}