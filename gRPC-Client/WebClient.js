(function($){

    $.fn.swipeDetector = function(options){
        var swipeState = 0;
        var StartX = 0;
        var StartY = 0;

        var pixelOffsetX = 0;
        var pixelOffsetY = 0;

        var swipeTarget = this;
        var defaultSettings = {
            swipeThreshold: 70,
            useOnlyTouch: false
        };
    
    
        (function init(){

            options = $.extend(defaultSettings,options)
            swipeTarget.on("mousedown touchstart", swipeStart);
            $('html').on("mouseup touchend", swipeEnd);
            $('html').on("mousemove touchmove", swiping);
        })();


        function swipeStart(event) {

            console.log(event);

        }

    
    }






})(jQuery);




var sock = new SockJS('http://localhost:8080/echo');
 
$(document).ready(function(){

    sock.onopen = function() {
        console.log('open');
        sock.send('test');
        
    };
   
    sock.onmessage = function(e) {
 

        let incomingData = JSON.parse(e.data)
    
        var chckS = Buffer.from(incomingData.imageData).toString('base64');
    
        document.getElementById("ItemPreview").setAttribute('src','data:image/jpg;base64,'+chckS);
       
     };

})






 sock.onclose = function() {
    //  console.log('close');
 };


