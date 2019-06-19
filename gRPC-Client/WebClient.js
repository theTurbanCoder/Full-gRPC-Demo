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

           if (event.originalEvent.touches)
            event = event.originalEvent.touches[0];
        
        
            if(swipeState === 0)
            {
                swipeState = 1;
                StartX = event.clientX;
                StartY = event.clientY;

            }

        } // Swipe Start


        function swipeEnd(event)
        {
            if (swipeState === 2) {
                
                swipeState = 0;
            }


            /// lets come back here part1  

            if (Math.abs(pixelOffsetX) > Math.abs(pixelOffsetY)
                && 
                Math.abs(pixelOffsetX) > options.swipeThreshold) {

                    
                    if (pixelOffsetX < 0) {
                        
                        swipeTarget.trigger($.Event('swipeLeft.sd',{ clientX: pixelOffsetX ,clientY:pixelOffsetY} ));
                        
                        // console.log('Left Swipe',pixelOffsetX,pixelOffsetY)
                    } else {
                        swipeTarget.trigger($.Event('swipeRight.sd',{ clientX: pixelOffsetX,clientY:pixelOffsetY}));
                        // console.log('Right Swipe')
                    }

            }
            else if (Math.abs(pixelOffsetY) > options.swipeThreshold) {
//vertical swipe
                if (pixelOffsetY < 0) {
                    
                    swipeTarget.trigger($.Event("swipeUp.sd",{ clientX: pixelOffsetX,clientY:pixelOffsetY}));
                }
                else{
                    swipeTarget.trigger($.Event("swipeDown.sd",{ clientX: pixelOffsetX,clientY:pixelOffsetY}));
                }
            }
        } /// Swipe End has Occured Here.


        function swiping(event)
        {
            if (swipeState !==1 )  return;



            if (event.originalEvent.touches)
            event = event.originalEvent.touches[0];

            var swipeOffsetX = event.clientX - StartX;
            var swipeOffsetY = event.clientY - StartY;

            // console.log("X ---> ",swipeOffsetX);
            // console.log("Y ---> ",swipeOffsetY);

            if (Math.abs(swipeOffsetX) > options.swipeThreshold || Math.abs(swipeOffsetY) > options.swipeThreshold) {
                
                swipeState = 2;
                pixelOffsetX = swipeOffsetX;
                pixelOffsetY = swipeOffsetY;

            }

            
        } 

        // console.log("SwipeTarget -> ",swipeTarget)

        return swipeTarget;
    
    };
})(jQuery);




var sock = new SockJS('http://172.28.203.153:8080/echo');
 
$(document).ready(function(){



    var dps1 = []; // dataPoints
    var dps2 = [] // dataPoints




    var chart = new CanvasJS.Chart('chartContainer', {

        title: {
            text: "Server vs Client Reception Time"
        }, 

        axisX: {
            title:"Date of Creation",
            gridThickness: 0
        }, 


        axisY : {
            title: "Delta between Client and Server."
        },

        data: [
            {
                type:"line",
                dataPoints: dps1
            },
            {
                type: "scatter",
                dataPoints:dps2
            }
        ]

    })



    updateChart = (data) => {

        if (data.type === 1)
            console.log(data)
            dps1.push({x:data.x, y: parseFloat(data.y * 5)})

        if (data.type === 2)
            console.log(data)
            dps2.push({x:data.x, y: parseFloat(data.y * 10)})
        
        chart.render() 
    }

    




    addSeconds_Milliseconds = (hours, minutes, seconds,milli) => {

        var hr = hours

        if (hours > 12)
            hr = hours - 12;
        
        var new_time = hr + (( minutes + (seconds + (milli/1000))/60 ))/100;

        return new_time;
        
        
    }



    

    sock.onopen = function() {
        console.log('open');
        sock.send('test');
        
    };
   
    sock.onmessage = function(e) {
 
        clientDateX = new Date(Date.now())


        clientDateY = addSeconds_Milliseconds(clientDateX.getHours(), clientDateX.getMinutes(), clientDateX.getSeconds(), clientDateX.getMilliseconds()).toFixed(5);

        console.log(clientDateY);


        let incomingData = JSON.parse(e.data)


        ServerDateX = new Date(incomingData.TimeOfDay);
        ServerDateY = addSeconds_Milliseconds(ServerDateX.getHours(), ServerDateX.getMinutes(), ServerDateX.getSeconds(), ServerDateX.getMilliseconds()).toFixed(5);

        console.log(ServerDateY);

        console.log(e)
    

        updateChart({x:clientDateX, y:clientDateY, type:1 });
        updateChart({x:ServerDateX, y:ServerDateY, type:2});


        var chckS = Buffer.from(incomingData.imageData).toString('base64');
    
        document.getElementById("bitmapdata").setAttribute('src','data:image/jpg;base64,'+chckS);
       
     };



 sock.onclose = function() {
    console.log('close');
 };



    $('.reflect')
    .swipeDetector()
    .on("swipeLeft.sd swipeRight.sd swipeUp.sd swipeDown.sd",function(event){

        console.log(event.clientX,event.clientY);
        sock.send(JSON.stringify({coordinates:{swipeType:event.type,X:event.clientX, Y:event.clientY}}));
    });




    


   


    
    

  


})



// var chart = new CanvasJS.Chart("chartContainer", {
// 	title :{
// 		text: "Dynamic Data"
// 	},
// 	axisY: {
// 		includeZero: false
// 	},      
// 	data: [{
// 		type: "scatter",
// 		dataPoints: dps
// 	}]
// });

// var xVal = 0;
// var yVal = 100; 
// var updateInterval = 1000;
// var dataLength = 20; // number of dataPoints visible at any point

// var updateChart = function (count) {

// 	count = count || 1;

// 	for (var j = 0; j < count; j++) {
// 		yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
// 		dps.push({
// 			x: xVal,
// 			y: yVal
// 		});
// 		xVal++;
// 	}

// 	if (dps.length > dataLength) {
// 		dps.shift();
// 	}

// 	chart.render();
// };

// updateChart(dataLength);
// setInterval(function(){updateChart()}, updateInterval);




