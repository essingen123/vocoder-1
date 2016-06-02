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

    /** load files via input selection **/
    $('input').each(function(i){
        $(this).change(function(evt){
            evt.preventDefault();
            var freader = new FileReader();

            freader.onload = function(e){
                context.decodeAudioData(e.target.result).then(function(input) {
                    buffer.push(input);
                });
            };
            freader.readAsArrayBuffer(evt.target.files[0]);
        });
    });

    /** preload files from server **/
    $(document).ready(function() {
        $.each(["../vocoder/audio/Donald_trump.wav", "../vocoder/audio/Im_different_sin.wav"], function( i, url ) {

            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';

            // Decode asynchronously
            request.onload = function() {
                context.decodeAudioData(request.response).then(function(input){
                    addToPos(input, i);
                });
            };
            request.send();
        });
    });
    

    $('#play').click(play);
    $('#stop').click(stop);

    function add(input){
        console.log("audio added.");
        buffer.push(input);
    }

    function addToPos(input, pos){
        console.log("audio added.");
        buffer[pos] = input;
    }

    function init(){

        source[0] = context.createBufferSource();
        source[0].buffer = buffer[0];

        source[1] = context.createBufferSource();
        source[1].buffer = buffer[1];

        merge = context.createChannelMerger(2);

        source[0].connect(merge, 0, 0);
        source[1].connect(merge, 0, 1);

        merge.connect(vocoder);

        vocoder.connect(context.destination);

        // give the animation a source
        Visualizer.animate(512, vocoder);
    }

    function play(){

        init();

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


$("#canvas").css({"width" : 512 + "px", "height" : 512 + "px"});