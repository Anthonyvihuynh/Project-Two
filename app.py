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
    		'male': item.male
    	}
    		for item in results
    	])


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
