import sqlite3
from sqlalchemy import create_engine
import csv
import pandas

# f = open("lusitaniaclean.csv", 'r') 
# next(f, None) 
# reader = csv.reader(f)

# sql = sqlite3.connect("lusitaniaclean.db")
# cur = sql.cursor()

# cur.execute('''CREATE TABLE IF NOT EXISTS passengers
# 			(context text, response text, score real)''')

# for row in reader:
# 	cur.execute("INSERT INTO passengers VALUES", row)

# f.close()
# sql.commit()
# sql.close()
# -----------------


# con = sqlite3.connect(":memory:")
con = sqlite3.connect("lusitaniaclean2.sqlite")

# cur = con.cursor()
# cur.execute("CREATE TABLE passengers (ID_Key, Personal_name, Fate, Age, PassengerCrew, AdultMinor, Sex, Adult, Male, Survived, Passenger);")

# with open('db/lusitaniaclean2.csv', 'rt', encoding="utf8") as fin:
# 	dr = csv.DictReader(fin)
# 	to_db = [(i["ID_Key"], i["Personal_name"], i['Fate'], i["Age"], i["PassengerCrew"], i["AdultMinor"], i["Sex"], i["Adult"], i["Male"], i["Survived"], i["Passenger"]) for i in dr]

# 	cur.executemany("INSERT INTO passengers (ID_Key, Personal_name, Fate, Age, PassengerCrew, AdultMinor, Sex, Adult, Male, Survived, Passenger) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", to_db)
# 	con.commit()
# 	con.close()

engine = create_engine('sqlite://', echo=False)

df = pandas.read_csv('db/lusitaniaclean2.csv')
df.to_sql("passengers", con=con, index=False)
