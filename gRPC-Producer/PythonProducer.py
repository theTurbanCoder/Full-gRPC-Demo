
from __future__ import print_function


import proto.echo_pb2 as echo_pb2
import proto.echo_pb2_grpc as echo_pb2_grpc


import logging

import grpc


import io

from PIL import Image

import time, random,datetime


myMessage = "Python Is Connected message"

files = ['test.jpg','test1.jpg','test2.jpg']

def getTimeDate():
    
    now = time.time()

    seconds  = int(now)
    
    nanos = int((now-seconds) * (10**9) )
    
    st = datetime.datetime.fromtimestamp(now).strftime('%Y-%m-%d %H:%M:%S')
    
    return seconds,nanos,st




def make_bytes(filename):
    
    im_bytes = ''

    with open(filename,"rb") as image:


        f = image.read()
        b = bytes(f)

        im_bytes = b
        
        return im_bytes

    pass
 


def make_route_note(message,filename,seconds,nanos,day):
    
    im_bytes = make_bytes(filename)
    
    
    
    return echo_pb2.FullDuplexRequest(name=myMessage,chunk=im_bytes,generatedTime= echo_pb2.Timestamp(seconds=seconds,nanos=nanos),TimeOfDay=day)
    
    
    pass

first_sec,first_nanos,st = getTimeDate()
messages = [make_route_note(myMessage,'test2.jpg',first_sec,first_nanos,st)]


def randomiseShuffler():
    
    return random.choice(files)
    




def generate_messages():
    
    for msg in messages:
        
        yield msg
        
        time.sleep(1000.0/1000.0)
        
        if len(messages) < 25:
            
            filename = randomiseShuffler()
            
            sec,nanos,day = getTimeDate()
            
            messages.append(make_route_note(myMessage,filename,sec,nanos,day))

    pass



def run():
    
    with grpc.insecure_channel('localhost:9090') as channel:
        
        stub = echo_pb2_grpc.TestDuplexServiceStub(channel)
        
        response = stub.Echo(echo_pb2.EchoRequest(message="Python Client"))
        
        
        print('Greeting for Python Client', response.message)
        
        
        bidResponse = stub.Bid(generate_messages())
        
        for res in bidResponse:
            print(res)
            
    pass





if __name__ == '__main__':
    logging.basicConfig()
    run()