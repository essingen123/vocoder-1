/**
* vocoder
*/

var vocoder = (function(){

    var bs = 4096;
    var numIn = 2;
    var numOut = 1;

    var node = context.createScriptProcessor(bs, numIn, numOut);

    node.onaudioprocess = function(evt){

        var buffIn = evt.inputBuffer;
        var buffOut = evt.outputBuffer;

        console.log("buffIn: " + buffIn.numberOfChannels + " buffOut: " + buffOut.numberOfChannels);

        var dataOut = buffOut.getChannelData(0);

        for(var n = 0; n < buffIn.numberOfChannels; n++){
            var dataIn = buffIn.getChannelData(n);
            
            for(var s = 0; s < bs; s++){
                dataOut[s] = n == 1 ? dataIn[s] : 0.0;
            }

        }
    }

    return node;

})();