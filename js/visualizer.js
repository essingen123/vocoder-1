/**
* visualizer
*/
var Visualizer = (function(){

    function animate(bs, input){
        var analyser = window.context.createAnalyser();

        analyser.fftSize = 512; //2048
        var bufferLength = analyser.frequencyBinCount;
        console.log("bufferLength -> " + bufferLength);
        var dataArray = new Uint8Array(bufferLength);

        var canCtx = document.getElementById("canvas").getContext("2d");
        canCtx.lineWidth = 1;
        canCtx.strokeStyle = '#33ccff';
        canCtx.fillStyle = "#292929";

        var h = bs;
        var w = bs;

        canCtx.lineWidth = 1;
        canCtx.strokeStyle = '#33ccff';
        canCtx.fillStyle = "#292929";

        canCtx.clearRect(0, 0, w, h);

        // Get the frequency data and update the visualisation
        function update() {
            requestAnimationFrame(update);

            analyser.getByteFrequencyData(dataArray);

            canCtx.fillRect(0,0,w,h);
            canCtx.beginPath();
            
            for(var i = 0; i < bufferLength; i++) {
                canCtx.moveTo(i + 15, 128);
                canCtx.lineTo(i + 15, 128 - (dataArray[i] / 3));
            }
            canCtx.stroke();
            
        }

        input.connect(analyser);

        update();
    }

    return{
        animate : animate
    }

})();