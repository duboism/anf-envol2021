#!/usr/bin/env python3

# Dirk Hoffmann -CPPM-, for ENVOL 2021

import socketserver
import random

_moves = 3

def help_cmd(self):
    """ 
    List of all valid commands, derived from the command-method dict CMD. 
    """
    return "List of possible commands:\n" + "\n".join((CMD.keys()))

def moves(self):
    """
    Return total number of moves counted by detector"
    """
    global _moves
    _moves += random.randint(1, 10)
    return _moves

CMD = {
    'list': help_cmd,
    'help': help_cmd,
    'temperature': lambda x: 20.0+.1*random.randint(-10,11),
    'moves': moves,
    'light': lambda x: 50.0+random.randint(-40,41),
    }

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
            print("{} command: {} ".format(
                    self.client_address[0],
                    self.data))
            self.wfile.write(bytes(
                    "200 {}\n".format(CMD[key](self)),
                    'utf-8'
                    ))
        else:
            self.wfile.write(bytes(
                    "404 Command {} not found.\n".format(
                        key.upper()
                        ),
                    'utf-8'
                    ))

if __name__ == "__main__":
    HOST, PORT = "localhost", 9999

    # Create the server, binding to localhost on port 9999
    print("Binding server to {}:{}.".format(HOST, PORT))
    with socketserver.TCPServer((HOST, PORT), MyTCPHandler) as server:
        # Activate the server; this will keep running until you
        # interrupt the program with Ctrl-C
        server.serve_forever()
