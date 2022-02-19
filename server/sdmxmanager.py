import csv, os, glob

[TYPE, PERIOD, VALUE] = range(3)

def readFile(name):
    reader = csv.reader(open(name))
    dictionary = {}
    for i, row in enumerate(reader):
        if not i:continue
        dictionary[row[1]] = [row[n] for n in (3, 8, 9)]
    return dictionary

def allFiles(basePath=""):
    return glob.glob(os.path.join(basePath, "*.csv"))
    
files = [readFile(path) for path in allFiles()]
indicators = {list(file.values())[0][TYPE]:i for i, file in enumerate(files)}
countries = [list(file.keys()) for file in files]