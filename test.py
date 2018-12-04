import sqlite3
from sqlalchemy import create_engine
import csv
import pandas

with open('db/lusitaniaclean2.csv', 'rt', encoding="utf8", newline="") as fin:
	dr = csv.DictReader(fin)
	test_list = [x["ID_Key"] for x in dr] 
print(test_list)
# for x in dr:
# 	print(x["ID_Key"])