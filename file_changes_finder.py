import datetime
import os
import time

rootdir = '.'

string = "25/02/2022"
olddate = time.mktime(datetime.datetime.strptime(string,"%d/%m/%Y").timetuple())
# print(olddate);
for subdir, dirs, files in os.walk(rootdir):
    for file in files:
        name, extension = os.path.splitext(file)
        if extension == '.php':
            filepath = os.path.join(subdir, file)
            mdate = os.path.getmtime(filepath)

            if mdate >= olddate:
                print(filepath)
                
