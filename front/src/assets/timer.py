import datetime
import subprocess
import requests
import threading
import pygetwindow as gw
from time import sleep

id=int(input("your id"))
def is_process_running(process_name):
    cmd = 'tasklist /fi "imagename eq {}"'.format(process_name)
    output = subprocess.check_output(cmd, shell=True).decode()
    if process_name.lower() in output.lower():
        return True
    else:
        return False

    

class TimeTracker:
    def __init__(self):
        self.start_time = None
        self.end_time = None
    def stop(self):
            if self.start_time is not None:
                self.end_time = datetime.datetime.now()
                # print("Tracking stopped at:", self.end_time)
                self.calculate_duration()
            else:
                print("Tracking hasn't started yet.")
                
    def start(self):
        self.start_time = datetime.datetime.now()
        # print("Tracking started at:", self.start_time)
        # print(is_process_running("Postman.exe"))
        while True:
            if is_process_running("Code.exe") == False:
                self.stop()
                self.start()
                break
            
    def calculate_duration(self):
        if self.start_time is not None and self.end_time is not None:
            duration = self.end_time - self.start_time
            
            if duration.seconds >0:
                print("Total time spent:", duration)
                res=0
                res+=duration.seconds/60
                print(round(res))
                
                myobj = {'minutes': f'{round(res)}',
                         'type':'code'}
                r = requests.post(f'http://127.0.0.1:8000/api/v1/main/{id}/',json=myobj)
            sleep(3)


class FigmaTimeTracker:
    print("figma started")
    def __init__(self):
        self.start_time = None
        self.end_time = None
    def stop(self):
            if self.start_time is not None:
                self.end_time = datetime.datetime.now()
                # print("Tracking stopped at:", self.end_time)
                self.calculate_duration()
            else:
                print("Tracking hasn't started yet.")
                
    def start(self):
        self.start_time = datetime.datetime.now()
        # print("Tracking started at:", self.start_time)
        
        while True:
            
            if is_process_running("Figma.exe") == False:
                
                self.stop()
                self.start()
                break
        
            
    def calculate_duration(self):
        if self.start_time is not None and self.end_time is not None:
            duration = self.end_time - self.start_time
            
            if duration.seconds >0:
                print("Total time spent:", duration)
                res=0
                res+=duration.seconds/60
                print(round(res))
                
                myobj = {'minutes': f'{round(res)}',
                         'type':'figma'}
                r = requests.post(f'http://127.0.0.1:8000/api/v1/main/{id}/',json=myobj)
            sleep(3)


class ObsTimeTracker:
    print("obs started")
    def __init__(self):
        self.start_time = None
        self.end_time = None
    def stop(self):
            if self.start_time is not None:
                self.end_time = datetime.datetime.now()
                # print("Tracking stopped at:", self.end_time)
                self.calculate_duration()
            else:
                print("Tracking hasn't started yet.")
                
    def start(self):
        self.start_time = datetime.datetime.now()
        # print("Tracking started at:", self.start_time)
        # print(is_process_running("Postman.exe"))
        while True:
            if is_process_running("obs64.exe") == False:
                self.stop()
                self.start()
                break
        
    def calculate_duration(self):
        if self.start_time is not None and self.end_time is not None:
            duration = self.end_time - self.start_time
            
            if duration.seconds >0:
                print("Total time spent:", duration)
                res=0
                res+=duration.seconds/60
                print(round(res))
                
                myobj = {'minutes': f'{round(res)}',
                         'type':'obs'}
                r = requests.post(f'http://127.0.0.1:8000/api/v1/main/{id}/',json=myobj)
            sleep(3)



class Derizher:
    def __init__(self):
        pass

    def start(self):
        t1 = threading.Thread(target=TimeTracker().start, args=())
        t2 = threading.Thread(target=FigmaTimeTracker().start, args=())
        t3 = threading.Thread(target=ObsTimeTracker().start, args=())
        t1.start()
        t2.start()
        t3.start()
        
        print("Done")

if __name__ == "__main__":
    derizh = Derizher()
    derizh.start()
    
    
    # input("Press Enter to stop tracking...")
    # tracker.stop()