import urllib2
import argparse
import json
import os

from pprint import pprint 

class InputError(Exception):
      def __init__(self, expr):
          self.expr = expr
  

def read_sources(f,d):
  try: 
      src = open(f).read()
      d[os.path.basename(f)]= src 
  except Exception, e:
    raise InputError(e)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group()
    group.add_argument('-f', help = 'solidity files', action='append')
    parser.add_argument('-v', help = 'use version compiler')
    group.add_argument('-l', help = 'list availables compiler', action='store_true')
    parser.add_argument('-u', help = 'url of compiler', default="http://localhost:8080/api/compiler")
    args = parser.parse_args()
    
    msg = {}
    if args.v :
      msg['version'] = args.v
    
    if args.f:
      msg['input'] = {}
      for f in args.f:
        read_sources(f, msg['input'])

      req = urllib2.Request(args.u, json.dumps(msg), {'Content-Type': 'application/json'})
      response = urllib2.urlopen(req)
      print response.read()
    
    if args.l : 
      req = urllib2.Request(args.u)
      response = urllib2.urlopen(req)  
      pprint(response.read())

    
    
    



