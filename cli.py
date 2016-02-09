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
    ns = parser.parse_args()
    
    msg = {}
    if ns.v :
      msg['version'] = ns.v
    
    if ns.f:
      msg['input'] = {}
      for f in ns.f:
        read_sources(f, msg['input'])

      req = urllib2.Request(ns.u, json.dumps(msg), {'Content-Type': 'application/json'})
      response = urllib2.urlopen(req)
      print response.read()
    
    if ns.l : 
      req = urllib2.Request(ns.u)
      response = urllib2.urlopen(req)  
      pprint(response.read())

    
    
    



