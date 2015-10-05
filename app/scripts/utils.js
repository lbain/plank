var Utils = Utils || {};

Utils.daysBeforeNow = function(date) {
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var firstDate = date;
  var secondDate = new Date();

  return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
};