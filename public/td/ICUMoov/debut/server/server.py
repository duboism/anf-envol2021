#!/usr/bin/env python3

# Dirk Hoffmann -CPPM-, for ENVOL 2021

import socket
import socketserver
import threading
import random
from time import sleep
import re

# Linux (Fedora)
ARDUINO_PORT = "/dev/ttyACM0"
# Mac OS
#ARDUINO_PORT = "/dev/usbmodem"

_moves = 0
_light = 0
_temperature = 0

def help_cmd(self):
    """ 
    List of all valid commands, derived from the command-method dict CMD. 
    """
    return "List of possible commands:\n" + "\n".join((CMD.keys()))

def moves(self):
    """
    Return total number of moves counted by detector
    """
    global _moves
    return _moves

def light(self):
    """
    Return last light value read from detector
    """
    global _light
    return _light

def temperature(self):
    """
    Return last temperature value read from detector
    """
    global _temperature
    return _temperature

CMD = {
    'list': help_cmd,
    'help': help_cmd,
    'temperature': temperature,
    'moves': moves,
    'light': light,
    }


def serial_reader():


    p = re.compile("(\d+) (\d+) (\d+)")

    f = open(ARDUINO_PORT, "r")

    while True:

        for line in f.readlines():
            m = p.match(line)
            if m:
                global _light
                global _moves
                global _temperature

                _moves = m.groups()[0]
                _light = m.groups()[1]
                _temperature = m.groups()[2]

        # laisser souffler le port USB/RS232
        sleep(.1)

    return


class MyTCPHandler(socketserver.StreamRequestHandler):
    """
    The request handler class for the Arduino interface server.

    It is instantiated once for each client connection to the server 
    and must override the handle() method to implement communication to the
    client.
    """


    def handle(self):
        # self.request is the TCP socket connected to the client
        self.data = self.rfile.readline().strip()
        key = str(self.data, 'utf-8').lower()
        if key in CMD:
            r = CMD[key](self)
            print("{} command: {}, result: {} ".format(
                    self.client_address[0],
                    self.data,
                    r))
            self.wfile.write(bytes(
                    "200 {}\n".format(r),
                    'utf-8'
                    ))
        else:
            self.wfile.write(bytes(
                    "404 Command {} not found.\n".format(
                        key.upper()
                        ),
                    'utf-8'
                    ))

def find_ip ():
   # we get a UDP-socket for the TEST-networks reserved by IANA.
   # It is highly unlikely, that there is special routing used
   # for these networks, hence the socket later should give us
   # the ip address of the default route.
   # We're doing multiple tests, to guard against the computer being
   # part of a test installation.

   candidates = []
   for test_ip in ["192.0.2.0", "198.51.100.0", "203.0.113.0"]:
      s = socket.socket (socket.AF_INET, socket.SOCK_DGRAM)
      s.connect ((test_ip, 80))
      ip_addr = s.getsockname ()[0]
      s.close ()
      if ip_addr in candidates:
         return ip_addr
      candidates.append (ip_addr)

   return candidates[0]

if __name__ == "__main__":
    HOST, PORT = find_ip(), 9999

    # Starting serial reader thread
    t = threading.Thread(target=serial_reader)
    t.start()
    print("Reader thread started.")

    # Create the server, binding to localhost on port 9999
    print("Binding server to {}:{}.".format(HOST, PORT))
    with socketserver.TCPServer((HOST, PORT), MyTCPHandler) as server:
        # Activate the server; this will keep running until you
        # interrupt the program with Ctrl-C
        server.serve_forever()
