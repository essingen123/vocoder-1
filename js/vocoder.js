/**
* vocoder
*/
var vocoder = (function(){

    var bs = 512; // frame buffer size
    var sf = 44100; // sampling frequency
    var numIn = 2; // number of input buffer channel
    var numOut = 1; // number of output buffer channel

    var node = context.createScriptProcessor(bs, numIn, numOut);

    var fftBuffer, buffIn, buffOut, dataIn, dataOut, filtered;

    var canCtx = document.getElementById("canvas").getContext("2d");
    canCtx.lineWidth = 1;
    canCtx.strokeStyle = '#33ccff';
    canCtx.fillStyle = "#292929";

    canCtx.fillRect(0,0,bs,bs);

    node.onaudioprocess = function(evt){

        fftBuffer = new complex_array.ComplexArray(bs);

        buffIn = evt.inputBuffer;
        buffOut = evt.outputBuffer;

        dataOut = buffOut.getChannelData(0);

        dataIn = new Array(numIn);

        dataIn[0] = buffIn.getChannelData(0);
        dataIn[1] = buffIn.getChannelData(1);

        fftBuffer.map(function(sample, s, len){
            var temp = (dataIn[0][s]); // + dataIn[1][s]) / 2;
            sample.real = temp;
            sample.imag = temp;
        });

        filtered = fftBuffer.frequencyMap(function(freq, i, n) {
            if(i > n / 2){
                freq.imag /= 16.00;
                freq.real /= 16.00;
            }
        });

        filtered.map(function(sample, s, length){
            dataOut[s] = sample.real;
        });
    }

    function visualize(){

    }

    return node;

})();