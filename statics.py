#!/usr/bin/env python
# -*- coding:utf-8 -*-

from pymongo import MongoClient
import numpy as np

def get_std(tb):
    dict = {"Typescript": [], "Richards": [], "DeltaBlue": [], "Crypto": [], "RayTrace": [], "EarleyBoyer": [], "RegExp": [], "Splay": [], "SplayLatency": [], "NavierStokes": [], "PdfJS": [], "Mandreel": [], "MandreelLatency": [], "Gameboy": [], "CodeLoad": [], "Box2D": [], "zlib": []}
    client = MongoClient()
    db = client.turbo
    for data in db.statics.find({'tb': tb}):
        for score in data['scores']:
            dict[score['name']].append(int(score['score']))
    std = {}
    ave = {}
    for key, value in dict.iteritems():
        std[key] = np.std(np.array(value))
        ave[key] = np.average(np.array(value))
    for key, value in sorted(std.items(), key = lambda x:x[1]):
        print key, value
    for key

def main():
    get_std(True)

if __name__ == '__main__':
    main()
