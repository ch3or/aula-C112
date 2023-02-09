previsao1 = "";
previsao2 = "";
Webcam.set({
    height: 300,
    width: 350,
    imageFormat: "png",
    pngQuality: 90 
});
camera = document.getElementById('camera');
Webcam.attach("#camera");
function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="imagemcapturada" src="'+data_uri+'"/>';
    });
}
console.log("versao ml5", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/J2Ip11PDF/model.json", modelLoaded);
function modelLoaded() {
    console.log("modelo carregado");
}
function speak(){
    synth = window.speechSynthesis;
    speechdata1 = "a primeira previsao e " + previsao1;
    speechdata2 = "a segunda previsao e " + previsao2;
    falar = new SpeechSynthesisUtterance(speechdata1, speechdata2);
    synth.speak(falar);
}
function check(){
    img = document.getElementById('imagemcapturada');
    classfier.classify(img, gotResults);
}
function gotResults(error, results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("resultemotionName").innerHTML = results[0].label;
        document.getElementById("resultemotionName2").innerHTML = results[1].label;
        previsao1 = results[0].label;
        previsao2 = results[1].label;
        speak();
        if (previsao1 == "feliz"){
            document.getElementById('updateemoji').innerHTML = "&#128512;";
        }
        if (previsao1 == "triste"){
            document.getElementById('updateemoji').innerHTML = "&#128532;";
        }
        if (previsao1 == "irritado"){
            document.getElementById('updateemoji').innerHTML = "&#128545;";
        }
        if (previsao2 == "feliz"){
            document.getElementById('updateemoji2').innerHTML = "&#128512;";
        }
        if (previsao2 == "triste"){
            document.getElementById('updateemoji2').innerHTML = "&#128532;";
        }
        if (previsao2 == "irritado"){
            document.getElementById('updateemoji2').innerHTML = "&#128545;";
        }
    }
}