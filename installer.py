import win32serviceutil
import win32service
import win32event
import servicemanager
import socket
import time
import sys
from timer import Derizher

class HelloWorldService(win32serviceutil.ServiceFramework):
    _svc_name_ = 'HourProgramme'
    _svc_display_name_ = 'HourProgramme'

    def __init__(self, args):
        win32serviceutil.ServiceFramework.__init__(self, args)
        self.hWaitStop = win32event.CreateEvent(None, 0, 0, None)
        socket.setdefaulttimeout(60)
        self.is_alive = True

    def SvcStop(self):
        self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
        win32event.SetEvent(self.hWaitStop)
        self.is_alive = False

    def SvcDoRun(self):
        servicemanager.LogMsg(servicemanager.EVENTLOG_INFORMATION_TYPE,
                              servicemanager.PYS_SERVICE_STARTED,
                              (self._svc_name_, ''))
        self.main()

    def main(self):
        derizh = Derizher()
        derizh.start()
        win32event.WaitForSingleObject(self.hWaitStop, win32event.INFINITE)
        # Add cleanup code if needed

if __name__ == '__main__':
    if len(sys.argv) == 1:
        servicemanager.Initialize()
        servicemanager.PrepareToHostSingle(HelloWorldService)
        servicemanager.StartServiceCtrlDispatcher()
    else:
        win32serviceutil.HandleCommandLine(HelloWorldService)
