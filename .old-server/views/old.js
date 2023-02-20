window.onload = function() {
    AmadeusSpeechTranscript = null
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


    //Voice recognizer (Speech Recognition - Speech to Text)
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = true;
    

    //Document Object Models
    const transcript_element = document.getElementById("transcript");
    const talk_button = document.getElementById("start");   //Amadeus voice access to physic world
    const end_button = document.getElementById("end");

    let p = document.createElement("p");
    transcript_element.appendChild(p);



    //Voice bridge to real world (Voice - Text to Speech)
    const speech = new SpeechSynthesisUtterance()
    speech.volume = 5



    recognition.addEventListener("result", (e) =>{
        /** global (transcript) => recognized voice message */
        var transcript = Array.from(e.results)
        .map(result => result [0])
        .map(result => result.transcript)
        .join("");
        p.textContent = transcript;
        if(e.results[0].isFinal){
            p = document.createElement("p")
            p.textContent = transcript;
            transcript_element.appendChild(p);
            p.textContent = "";
        }

        /* Define Amadeus' Dictionary*/
        if(transcript.includes("YouTube")){
            //window.open('https://www.youtube.com/')
            AmadeusSpeechTranscript = "RunMain"
                                
        } else if (transcript.includes("um registro")) {
            transcript_element.appendChild(p);
            p.textContent = "Registro gerado";

            speech.text = "Registro gerado"
            window.speechSynthesis.speak(speech)
        }
        
        if (AmadeusSpeechTranscript == "RunMain") {
            speech.text = "Rodou bem!"
            window.speechSynthesis.speak(speech)
            
            
            console.log("Speaking out")
        }
    });

    /*function greeting(){
        alert("Have A Good Day !")
    }*/
    recognition.addEventListener("end", ()=>{
        end_button.disabled = false;
        talk_button.disabled = true;
    });
    talk_button.addEventListener("click", () =>{
        end_button.disabled = false;
        talk_button.disabled = true;
        recognition.start();
    });
    end_button.addEventListener("click", () => {
        end_button.disabled = true;
        talk_button.disabled = false;
        recognition.stop();
    });

    //speechSynthesis.speak(new SpeechSynthesisUtterance("Hello, this is your browser speaking."));
    function sayMessage() {

    }
}