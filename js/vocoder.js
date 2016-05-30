/**
* vocoder
*/
var vocoder = (function(){

    var bs = 512;
    var numIn = 4;
    var numOut = 1;

    var node = context.createScriptProcessor(bs, numIn, numOut);

    node.onaudioprocess = function(evt){

        var buffIn = evt.inputBuffer;
        var buffOut = evt.outputBuffer;

        var dataOut = buffOut.getChannelData(0);

        var dataIn = new Array(numIn);

        for(var i = 0; i < buffIn.numberOfChannels; i++){
            dataIn[i] = buffIn.getChannelData(i);
        }

        //console.log("0 -> " + dataIn[0][0] + " 1 -> " + dataIn[1][0] + "2 -> " + dataIn[2][0] + " 3 -> " + dataIn[3][0]);


        var data = new complex_array.ComplexArray(bs);
        data.map(function(value, i, n){
            
        })

        for(var s = 0; s < bs; s++){

            


            
            dataOut[s] = (dataIn[0][s] + dataIn[1][s]) / 2.0;
        }
    }

    return node;

})();


var data = new complex_array.ComplexArray(512)
// Use the in-place mapper to populate the data.
data.map(function(value, i, n) {
    value.real = (i > n/3 && i < 2*n/3) ? 1 : 0
})

var frequencies = data.FFT()

// Implement a low-pass filter using the in-place mapper.
frequencies.map(function(frequency, i, n) {
    if (i > n/5 && i < 4*n/5) {
        frequency.real = 0
        frequency.imag = 0
    }
})