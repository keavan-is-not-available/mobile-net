function preload() {

}

function setup() {
    c = createCanvas(600, 500)
    c.center()
    vid = createCapture(VIDEO)
    vid.hide()
    c = ml5.imageClassifier('mobileNet', modelLoaded)
}

function modelLoaded() {
    console.log("model sussesfully loaded")
}

function draw() {
    image(vid, 0, 0, 600, 500)
    c.classify(vid, gotResults)
}

previous_result = ""
function gotResults(error, results) {
    if (error) {
        console.log("Error")
    }
    else {
        console.log(results)
        if ((results[0].confidence > 0.5) && (previous_result != results[0].label)) {
            console.log(results)
            previous_result = results[0].label;
            document.getElementById("ob-name").innerHTML = "object name: " + results[0].label;
            document.getElementById("ob-accuracy").innerHTML = "accuracy: " + results[0].accuracy;
            synth = window.speechSynthesis;
            var ut=new SpeechSynthesisUtterance(results[0].label)
            synth.speak(ut)
        }
    }
}
