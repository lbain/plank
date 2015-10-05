function User(data) {
  this.name = data.name; // Could be a real name "Lucy Bain" or a username "lbain"
  // TODO: make this an object of all times for better graphing
  this.lastInterval = data.lastInterval; // float of seconds the last completed session ran for
  this.lastDate = new Date(data.lastDate);
  this.increase = data.increase; // % to increase time each session

  this.nextIncrease = function() {
    var howLong = Utils.daysBeforeNow(this.lastDate);
    var change;
    if (howLong <=1 ) { // exercised yesterday
      change = this.increase;
    } else if (howLong <= 2) { // exercised day before yesterday
      change = 0;
    } else { // exercised a while ago
      change = -1 * this.increase;
    }
    return change * 0.01 + 1; // it's a percentage
  };

  this.nextInterval = function() {
    return this.lastInterval * this.nextIncrease();
  };

  this.updateLatestExercise = function(duration) {
    this.lastDate = new Date();
    this.lastInterval = duration;
  };
}