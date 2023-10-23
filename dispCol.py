#!/bin/python3
import pymongo
import sys
#prints all documents in specified colelction in chatMessages db
if __name__ == "__main__":
    a = pymongo.MongoClient('localhost',27017)
    db = a['project2']
    mes = db[sys.argv[1]]
    z = mes.find()
    for ele in z:
        print(ele)
