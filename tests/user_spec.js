describe("A user", function() {

  var now = new Date();
  var testUserData = {
    name: 'test user',
    lastInterval: 34,
    lastDate: now,
    increase: 10
  };

  describe('new', function() {
    it("can be created with data", function() {
      var user = new User(testUserData);

      expect(user.name).toEqual('test user');
      expect(user.lastInterval).toEqual(34);
      expect(user.lastDate).toEqual(now);
      expect(user.increase).toEqual(10);
    });
  });

  describe('nextIncrease', function() {
    var user;
    beforeAll(function() {
      user = new User(testUserData);
    });

    it('is greater than 1 if they exercised yesterday', function() {
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      user.lastDate = yesterday;

      expect(user.nextIncrease()).toEqual(1.10);
    });

    it("is 1 if they exercised two days ago", function() {
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 2);
      user.lastDate = yesterday;

      expect(user.nextIncrease()).toEqual(1);
    });

    it("is less than 1 if they exercised more than two days ago", function() {
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 3);
      user.lastDate = yesterday;

      expect(user.nextIncrease()).toEqual(0.90);
    });
  });

  describe('nextInterval', function() {
    var user;
    beforeAll(function() {
      user = new User(testUserData);
    });

    it('computes the time needed for the next interval', function() {
      user.lastInterval = 30;
      spyOn(user, "nextIncrease").and.returnValue(1.10);

      expect(user.nextInterval()).toEqual(33);
    });

    it('can handle decimal places', function() {
      user.lastInterval = 10.5;
      spyOn(user, "nextIncrease").and.returnValue(1.10);

      expect(user.nextInterval()).toEqual(11.55);
    });
  });
});


