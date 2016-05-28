/**
* audio controller - imports audio files, handles them, calls filter etc.
**/

// check if web audio api is supported
try{
    AudioContext = AudioContext || webkitAudioContext;
} catch(error){
    alert("Web Audio API is not supported in this browser!");
}

context = new AudioContext();

//var foo = context.createAudioWorker(); //not yet supported

console.log("worked!!!");

var audio_controller = (function(){

    var audio = new Array();

    $('input').each(function(i){
        $(this).change(function(evt){
            evt.preventDefault();
            var freader = new FileReader();

            freader.onload = function(e){
                context.decodeAudioData(e.target.result, add, error);

                function error(){
                    alert("Error occured while reading audio file.");
                }
            };
            freader.readAsArrayBuffer(evt.target.files[0]);
        });
    });

    $('#play').click(play);
    $('#stop').click(stop);

    function add(buffer){
        console.log("audio added.");
        audio.push(buffer);
    }

    function init(){

        for(var i = 0; i < audio.length; i++){
            audio[i].source = context.createBufferSource();
            audio[i].source.buffer = audio[i];

            audio[i].source.connect(vocoder);
        }

        vocoder.connect(context.destination);
    }

    function play(){
        init();
        for(var i = 0; i < audio.length; i++){
            audio[i].source.start();
        }
    }

    function stop(){
        for(var i = 0; i < audio.length; i++){
            audio[i].source.stop();
        }
    }

    return {

    }

})();