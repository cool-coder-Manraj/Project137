status = "";
objects = [];

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    
    video.hide();
}

function Start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("input");
}

function modelLoaded()
{
    console.log("model is loaded");
    status = "true";
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Is: " + objects.length;
            fill("#FF0000");
            percent = Math.floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    if(objects[i].label == input)
    {
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("found").innerHTML = input + " Found";
        speech = speechSynthesis();
        SpeechSynthesisUtterance("object mentioned found");
        speech.speak(utterThis);
    }
    else
    {
        document.getElementById("found").innerHTML = input + "Not Found";
        SpeechSynthesisUtterance("object mentioned not found");
        speech.speak(utterThis);
    }
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}