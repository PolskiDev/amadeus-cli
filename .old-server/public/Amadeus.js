function OutputSpeech(val) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = val;
    window.speechSynthesis.speak(msg);
}

window.onload = function() {
    isAdmin = false;

    /* iPad Pro || Desktop? */
    /*if (screen.width <= 1024 && screen.height <= 1366) {

        document.getElementById('start').width = "30px";
        document.getElementById('start').height = "30px";
        //window.location.assign("Amadeus-iPad.html")
        
    } else {
        document.getElementById('start').width = "50%" ;
        document.getElementById('start').height = "80%" ;
        //window.location.assign("connect.html")
    }*/



/* TENTATIVA DE TOCAR AUDIO NO BOOT DO SISTEMA */
/*var audio = new Audio("sounds/boot.mp3")
audio.play();*/


/*const audioContext = new AudioContext();
const element = document.querySelector(audio);
const source = audioContext.createMediaElementSource(element);
source.connect(audioContext.destination)
audio.play();*/



    /**
     * Amadeus Logical Dictionary
     * with main keywords
     * 
     * @openWindow  window.open(<url:String>)
     * 
     * @speech      speech.text = <VoiceMessage:String>
     *              window.speechSynthesis.speak(speech)
     */




/**
 * Amadeus Speech Recognition   (Voice to text)
 * Amadeus Speech Generator     (Text to Voice)
 */
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//Voice recognizer (Speech Recognition - Speech to Text)
const recognition = new SpeechRecognition();
recognition.interimResults = true;
const transcript_element = document.getElementById("transcript");
const talk_button = document.getElementById("start");
const end_button = document.getElementById("end").style.visibility='hidden';

let p = document.createElement("p");
transcript_element.appendChild(p);

//Voice bridge to real world (Voice - Text to Speech)
const speech = new SpeechSynthesisUtterance()
speech.volume = 5


recognition.addEventListener("result", (e) =>{
    const transcript = Array.from(e.results)
    .map(result => result [0])
    .map(result => result.transcript)
    .join("").toLowerCase();
        

    p.textContent = transcript;
    if(e.results[0].isFinal){
        let speech_counter = 0;
            
        p = document.createElement("p")
        p.textContent = transcript;
        transcript_element.appendChild(p);
        p.textContent = "";
    }

});recognition.addEventListener("end", ()=>{
    end_button.disabled = false;
    talk_button.disabled = true;
    
    
    OutputSpeech("Fala executada")

});
talk_button.addEventListener("click", () =>{
    end_button.disabled = false;
    talk_button.disabled = true;
    recognition.start();
});
    
}