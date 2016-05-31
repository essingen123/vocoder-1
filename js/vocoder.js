/**
* vocoder
*/
var vocoder = (function(){

    var bs = 4096; // frame buffer size
    var sf = 44100; // sampling frequency
    var numIn = 4; // number of input buffer channel
    var numOut = 1; // number of output buffer channel

    var node = context.createScriptProcessor(bs, numIn, numOut);

    var peak = new Float32Array(bs);
    var fft = new FFT(bs, sf);

    node.onaudioprocess = function(evt){

        var buffIn = evt.inputBuffer;
        var buffOut = evt.outputBuffer;

        var dataOut = buffOut.getChannelData(0);

        var dataIn = new Array(numIn);

        for(var i = 0; i < buffIn.numberOfChannels; i++){
            dataIn[i] = buffIn.getChannelData(i);
        }

        for(var s = 0; s < bs; s++){

            dataOut[s] = (dataIn[0][s] + dataIn[1][s]) / 2.0;
        }

        fft.forward(dataOut);

        for(var s = 0; s < bs; s++){
            fft.spectrum[s] *= -1 * Math.log((fft.bufferSize/2 - i) * (0.5/fft.bufferSize/2)) * fft.bufferSize;

            if ( peak[s] < fft.spectrum[s]) {
                peak[s] = fft.spectrum[s];
            } else {
                peak[s] *= 0.99;
            }
        }

        console.log("peak 2048 - > " + peak[400]);

    }

    return node;

})();