# Import Data
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import func

import pandas as pd

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/lusitaniaclean2.sqlite"

db = SQLAlchemy(app)

class Passengers(db.Model):
	__tablename__ = 'passengers'

	id_key = db.Column(db.Integer, primary_key=True)
	sex = db.Column(db.String)
	passengercrew = db.Column(db.String)
	fate = db.Column(db.String)
	citizenship = db.Column(db.String)
	age = db.Column(db.Float)
	survived = db.Column(db.Integer)
	passenger = db.Column(db.Integer)
	male = 	db.Column(db.Integer)

	def __repr__(self):
		return '<Passengers %r>' % (self.id_key)    

@app.before_first_request
def setup():
    db.create_all()

@app.route("/age")
def age():
    return render_template("age.html")

@app.route("/gender")
def gender():
    return render_template("gender.html")

@app.route("/passenger")
def passenger():
    return render_template("passenger.html")    

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/data")
def table():
    # data = [func.count(Passengers.id)]
    results = db.session.query(Passengers).all()
    print(results)
    # df = pd.DataFrame(results, columns=['id_key', 'citizenship', 'age', 'survived', 'passenger', 'male'])
    return jsonify([
    	{
    		'id': item.id_key,
    		'citizenship': item.citizenship,
    		'age': item.age,
    		'survived': item.survived,
    		'passenger': item.passenger,
    		'sex': item.sex
    	}
    		for item in results
    	])

@app.route("/male")
def mtable():
	results = db.session.query(
		func.count(Passengers.sex))\
		.group_by(Passengers.survived)\
		.filter(Passengers.sex == "Male").all()
	print(results)
	return jsonify(json_list = results)

@app.route("/female")
def ftable():
	results = db.session.query(
		func.count(Passengers.male))\
		.group_by(Passengers.survived)\
		.filter(Passengers.male == 0).all()
	print(results)
	return jsonify(json_list = results)

# @app.route("/passenger")
# def ptable():
# 	results = db.session.query(
# 		func.count(Passengers.passenger))\
# 		.group_by(Passengers.survived)\
# 		.filter(Passengers.passenger == 1).all()
# 	print(results)
# 	return jsonify(json_list = results)

@app.route("/crew")
def crew_table():
	results = db.session.query(
		func.count(Passengers.passenger))\
		.group_by(Passengers.survived)\
		.filter(Passengers.passenger == 0).all()
	print(results)
	return jsonify(json_list = results)

@app.route("/ten")
def ten_table():
	results = db.session.query(
		func.count(Passengers.age))\
		.group_by(Passengers.survived)\
		.filter(Passengers.age >= 0).filter(Passengers.age <= 10).all()
	print(results)
	return jsonify(json_list = results)

@app.route("/twenty")
def twen_table():
	results = db.session.query(
		func.count(Passengers.age))\
		.group_by(Passengers.survived)\
		.filter(Passengers.age >= 11).filter(Passengers.age <= 20).all()
	print(results)
	return jsonify(json_list = results)

@app.route("/thirty")
def thir_table():
	results = db.session.query(
		func.count(Passengers.age))\
		.group_by(Passengers.survived)\
		.filter(Passengers.age >= 21).filter(Passengers.age <= 30).all()
	print(results)
	return jsonify(json_list = results)

@app.route("/fourty")
def four_table():
	results = db.session.query(
		func.count(Passengers.age))\
		.group_by(Passengers.survived)\
		.filter(Passengers.age >= 31).filter(Passengers.age <= 40).all()
	print(results)
	return jsonify(json_list = results)

@app.route("/fifty")
def fift_table():
	results = db.session.query(
		func.count(Passengers.age))\
		.group_by(Passengers.survived)\
		.filter(Passengers.age >= 41).filter(Passengers.age <= 50).all()
	print(results)
	return jsonify(json_list = results)

@app.route("/sixty")
def sixt_table():
	results = db.session.query(
		func.count(Passengers.age))\
		.group_by(Passengers.survived)\
		.filter(Passengers.age >= 51).filter(Passengers.age <= 60).all()
	print(results)
	return jsonify(json_list = results)

@app.route("/seventy")
def seve_table():
	results = db.session.query(
		func.count(Passengers.age))\
		.group_by(Passengers.survived)\
		.filter(Passengers.age >= 61).filter(Passengers.age <= 70).all()
	print(results)
	return jsonify(json_list = results)

@app.route("/eighty")
def eigh_table():
	results = db.session.query(
		func.count(Passengers.age))\
		.group_by(Passengers.survived)\
		.filter(Passengers.age >= 71).filter(Passengers.age <= 80).all()
	print(results)
	return jsonify(json_list = results)

@app.route("/barchartdata")
def get_barchart_data():
	age_labels = ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80']

	barChartData = []

	male = db.session.query(
		func.count(Passengers.sex))\
		.group_by(Passengers.survived)\
		.filter(Passengers.sex == "Male").all()
	barChartData.append(male)

	female = db.session.query(
		func.count(Passengers.sex))\
		.group_by(Passengers.survived)\
		.filter(Passengers.sex == "Female").all()
	barChartData.append(female)

	passenger = db.session.query(
		func.count(Passengers.passengercrew))\
		.group_by(Passengers.survived)\
		.filter(Passengers.passengercrew == "Passenger").all()
	barChartData.append(passenger)

	crew = db.session.query(
		func.count(Passengers.passengercrew))\
		.group_by(Passengers.survived)\
		.filter(Passengers.passengercrew == "Crew").all()
	barChartData.append(crew)

	ten = db.session.query(
		func.count(Passengers.age))\
		.group_by(Passengers.survived)\
		.filter(Passengers.age >= 0).filter(Passengers.age <= 10).all()
	barChartData.append(ten)

	twenty = db.session.query(
		func.count(Passengers.age))\
		.group_by(Passengers.survived)\
		.filter(Passengers.age >= 11).filter(Passengers.age <= 20).all()
	barChartData.append(twenty)

	thirty = db.session.query(
		func.count(Passengers.age))\
		.group_by(Passengers.survived)\
		.filter(Passengers.age >= 21).filter(Passengers.age <= 30).all()
	barChartData.append(thirty)

	fourty = db.session.query(
		func.count(Passengers.age))\
		.group_by(Passengers.survived)\
		.filter(Passengers.age >= 31).filter(Passengers.age <= 40).all()
	barChartData.append(fourty)

	fifty = db.session.query(
		func.count(Passengers.age))\
		.group_by(Passengers.survived)\
		.filter(Passengers.age >= 41).filter(Passengers.age <= 50).all()	
	barChartData.append(fifty)	

	sixty = db.session.query(
		func.count(Passengers.age))\
		.group_by(Passengers.survived)\
		.filter(Passengers.age >= 51).filter(Passengers.age <= 60).all()	
	barChartData.append(sixty)	

	seventy = db.session.query(
		func.count(Passengers.age))\
		.group_by(Passengers.survived)\
		.filter(Passengers.age >= 61).filter(Passengers.age <= 70).all()	
	barChartData.append(seventy)	

	eighty = db.session.query(
		func.count(Passengers.age))\
		.group_by(Passengers.survived)\
		.filter(Passengers.age >= 71).filter(Passengers.age <= 80).all()	
	barChartData.append(eighty)	

	return jsonify(barChartData)


if __name__ == "__main__":
    app.run(debug=True)


# var passengerData = d3.csv("lusitaniaclean.csv")
#  .then(function(passenger) {
#    passenger.forEach(function(data) {
#      data.Adult = +data.Adult;
#      data.Age = +data.Age;
#      data.Survived = +data.Survived;
#      data.Passenger = +data.Passenger;
#      data.Male = +data.Male;
#      console.log(data);
#     });
# });
