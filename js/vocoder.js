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

    var frequencies = fftBuffer.FFT();

    node.onaudioprocess = function(evt){

        var buffIn = evt.inputBuffer;
        var buffOut = evt.outputBuffer;

        var dataOut = buffOut.getChannelData(0);

        var dataIn = new Array(numIn);

        for(var i = 0; i < buffIn.numberOfChannels; i++){
            dataIn[i] = buffIn.getChannelData(i);
        }

        fftBuffer.map(function(sample, s, length){
            var temp = (dataIn[0][s] + dataIn[1][s]) / 2.0;
            sample.real = temp;
            sample.imag = temp;
        });

        var frequencies = fftBuffer.FFT();

        frequencies.map(function(freq, i, length){
            if (i > length/5 && i < 4*length/5) {
                freq.real = 0;
                freq.imag = 0;
            }
        });

        fftBuffer.map(function(sample, s, length){
            dataOut[s] = sample.real;
        });

    }

    return node;

})();