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

    node.onaudioprocess = function(evt){

        fftBuffer = new complex_array.ComplexArray(bs);

        buffIn = evt.inputBuffer;
        buffOut = evt.outputBuffer;

        dataOut = buffOut.getChannelData(0);

        dataIn = new Array(numIn);

        dataIn[0] = buffIn.getChannelData(0);
        dataIn[1] = buffIn.getChannelData(1);

        fftBuffer.map(function(sample, s, len){
            var temp = (dataIn[1][s]); // + dataIn[1][s]) / 2;
            sample.real = temp;
        });

        filtered = fftBuffer.frequencyMap(function(freq, i, n) {
            
            if( i > n / 6 || i > n * 5 / 6){
                freq.real = 0.0;
                freq.imag = 0.0;   
            }

            
            

            /**
            freq.real *= (i / n);
            **/
        });

        filtered.map(function(sample, s, length){
            dataOut[s] = sample.real;
        });
    }

    return node;

})();