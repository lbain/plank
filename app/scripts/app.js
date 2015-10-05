function App() {
  var localStorageKey = 'plank_exercise';

  this.localStorage = new LocalStorage(localStorageKey);
  var userData = this.localStorage.get('user');
  if (!userData) {
    this.getNewUser();
    return;
  }
  this.user = new User(userData);
  this.exercise();
}

App.prototype.getNewUser = function() {
  console.log('ask for new user');

  $.event.trigger({
    type: "showNewUser"
  });

  $(document).on("makeNewUser", function(event) {
    // TODO: make this use `bind` and don't reference `app`
    app.user = new User(event.user);
    app.exercise();
  });
};

App.prototype.exercise = function() {
  var timerDisplay = $('.timer');
  this.timeKeeper = new TimeKeeper(this.user.nextInterval(), timerDisplay);
  this.timeKeeper.start();

  $(document).on("timerFinished", function(event) {
    // TODO: make this use `bind` and don't reference `app`
    app.user.updateLatestExercise(event.duration);

    $.event.trigger({
      type: "showCompletion",
      user: app.user
    });
  });
};

var app = new App();