/**
* vocoder
*/
var vocoder = (function(){

    var bs = 512; // frame buffer size
    var sf = 44100; // sampling frequency
    var numIn = 2; // number of input buffer channel
    var numOut = 1; // number of output buffer channel

    var node = context.createScriptProcessor(bs, numIn, numOut);

    var fftBuffer = new complex_array.ComplexArray(bs);

    node.onaudioprocess = function(evt){

        var buffIn = evt.inputBuffer;
        var buffOut = evt.outputBuffer;

        var dataOut = buffOut.getChannelData(0);

        var dataIn = new Array(numIn);

        for(var i = 0; i < buffIn.numberOfChannels; i++){
            dataIn[i] = buffIn.getChannelData(i);
        }

        fftBuffer.map(function(sample, s, len){
            var temp = (dataIn[0][s] + dataIn[1][s]) / 2;
            //sample.real = temp;
            //sample.imag = temp;
        });

        var filtered = fftBuffer.frequencyMap(function(freq, i, n) {

        });

        /**
        fftBuffer.map(function(sample, s, length){
            var temp = (dataIn[0][s]); // + dataIn[1][s]) / 2.0;
            sample.real = temp;
            sample.imag = temp;
        });

        var frequencies = fftBuffer.FFT();

        
        frequencies.map(function(freq, i, length){
            if (i < length/2) {
                freq.real = 0;
                freq.imag = 0;
            }
        });
        **/

        filtered.map(function(sample, s, length){
            dataOut[s] = sample.real;
        });

        /**
        for(var s = 0; s < bs; s++){
            dataOut[s] = (dataIn[0][s] + dataIn[1][s]) / 2.0;
        }
        **/

    }

    return node;

})();