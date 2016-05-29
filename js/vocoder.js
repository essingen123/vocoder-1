/**
* vocoder
*/
var vocoder = (function(){

    var bs = 4096;
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

        console.log("0 -> " + dataIn[0][0] + " 1 -> " + dataIn[1][0] + "2 -> " + dataIn[2][0] + " 3 -> " + dataIn[3][0]);

        for(var s = 0; s < bs; s++){
            // TODO
        }
    }

    return node;

})();