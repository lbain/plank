function TimeKeeper(seconds, $timer) {
  this.duration = seconds;

  this.timer = new Timer({
    onstart : function(millisec) {
      var sec = Math.round(millisec / 1000);
      $timer.text(sec);
    },
    ontick  : function(millisec) {
      var sec = Math.round(millisec / 1000);
      $timer.text(sec);
    },
    onstop  : function() {
      $.event.trigger({
        type: "timerStopped"
      });
      $timer.text('stop');
    },
    onend   : function() {
      $.event.trigger({
        type: "timerFinished"
      });
      $timer.text('end');
    }
  });
}

TimeKeeper.prototype.start = function() {
  this.timer.start(this.duration);
};

TimeKeeper.prototype.stop = function(duration) {
  if (/started|paused/.test(this.timer.getStatus())) {
      this.timer.stop();
    }
};