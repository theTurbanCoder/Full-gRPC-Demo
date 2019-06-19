const PROTO_PATH = '/Users/tanveersinghanand/Desktop/Full-gRPC-Demo' + '/proto/echo.proto';
const http = require('http')
const sockjs = require('sockjs');
// const WebSocket =  require('ws');

const grpc = require('grpc');

const protoLoader = require('@grpc/proto-loader');


const echoSock = new sockjs.createServer();

const httpServer = new http.createServer()

echoSock.installHandlers(httpServer,{prefix:'/echo'})

const packageDefinition = protoLoader.loadSync(PROTO_PATH,{
    keepCase:true,
    enums:String,
    longs:String,
    oneofs:true,
    defaults:true
});

let users = [];
const echoProto  = grpc.loadPackageDefinition(packageDefinition).fullDuplexTest;

function echo(call,callback)
{

    callback(null,{message:"hello there! " +call.request.message})
}

function test(call){

    echoSock.on('connection', function(conn) {                    
        // conn.write(userLog.name);

        call.on('data',function(userLog){
            console.log(userLog)
            conn.write(JSON.stringify({name:userLog.name,imageData:userLog.chunk}));
        });

        conn.on('data',function(co){
            console.log('Server Recieved',co);
            call.write({name:co});
        })

    });




}

function Bid(call) {

    users.push(call)
    test(call)
}





function main(){

    var gRPCServer = new grpc.Server();

   
   
    gRPCServer.addService(echoProto.TestDuplexService.service,{
        echo:echo,
        Bid:Bid
    });

    gRPCServer.bind('0.0.0.0:9090',grpc.ServerCredentials.createInsecure());

  
    gRPCServer.start();
}


httpServer.listen(8080,'0.0.0.0');

main();