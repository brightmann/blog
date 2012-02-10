#!/usr/bin/env python
import os, sys, re
import uuid

os.linesep = '\n'

def GetAllFiles(path):
  result = []
  if(os.path.exists(path)):
    items = os.listdir(path)
    for item in items:
      fullpath = os.path.join(path, item)
      if(os.path.isfile(fullpath)):
        if os.path.splitext(item)[1][1:] == "md":
          result.append(fullpath)
  return result

def ProcessFile(name):
  content = file(name, "r").read()
  pat = re.compile(r'^(---\ndate:)', re.M)
  content = pat.sub('---\nuuid: %s\ndate:' % (GenUUID()), content)
  
  pat = re.compile(r'(\nslug: .+\n)', re.M)
  content = pat.sub('\n', content)
  
  pat = re.compile(r'(\nstatus: publish\n)', re.M)
  content = pat.sub('\n', content)
  
  open(name, 'w').write(content)

def GenUUID():
  return uuid.uuid1()

result = GetAllFiles(sys.argv[1])
for x in result:
  ProcessFile(x)
