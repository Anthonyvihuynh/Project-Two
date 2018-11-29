// Import Data
var passengerData = d3.csv("lusitaniaclean.csv")
  .then(function(passenger) {
    passenger.forEach(function(data) {
      data.Adult = +data.Adult;
      data.Age = +data.Age;
      data.Survived = +data.Survived;
      data.Passenger = +data.Passenger;
      data.Male = +data.Male;
      console.log(data);
    });
});
