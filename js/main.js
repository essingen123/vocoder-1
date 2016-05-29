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

    var buffer = new Array();
    var source = new Array();

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

    function add(input){
        console.log("audio added.");
        buffer.push(input);
    }

    function init(){

        /**
        for(var i = 0; i < audio.length; i++){
            audio[i].source = context.createBufferSource();
            audio[i].source.buffer = audio[i];

            audio[i].source.connect(vocoder);
        }
        **/
    }

    function play(){

        source[0] = context.createBufferSource();
        source[0].buffer = buffer[0];

        source[1] = context.createBufferSource();
        source[1].buffer = buffer[1];

        merge = context.createChannelMerger(2);

        source[0].connect(merge, 0, 0);
        source[1].connect(merge, 0, 1);

        //source[0].connect(vocoder);

        merge.connect(vocoder);

        vocoder.connect(context.destination);

        source[0].start();
        source[1].start();
    }

    function stop(){
        for(var i = 0; i < source.length; i++){
            source[i].stop();
        }
    }

    return {

    }

})();