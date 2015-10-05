describe("Local storage", function() {

  var testLocalStorageData = '{"user":{"name":"lucy","lastDate":"2015-10-05T01:39:47.031Z","increase":10,"lastInterval":30}}';
  var testParsedData = {"user": { "name":"lucy",
                                  "lastDate":"2015-10-05T01:39:47.031Z",
                                  "increase":10,
                                  "lastInterval":30 } };
  var key = 'testing';

  var storage;

  beforeEach(function() {
    storage = new LocalStorage(key);
  });

  describe('new', function() {
    it("sets a key", function() {
      var storage = new LocalStorage(key);
      expect(storage.key).toEqual(key);
    });

    it("requires a key", function() {
      expect( function(){ new LocalStorage(); } ).toThrow(new Error("No key specified"));
    });
  });

  describe('jsonParsed', function() {
    it('parses the JSON from localStorage', function() {
      spyOn(localStorage, "getItem").and.returnValue(testLocalStorageData);
      expect(storage.jsonParsed()).toEqual(testParsedData);
    });

    it('returns null if key not found', function() {
      spyOn(localStorage, "getItem").and.returnValue(null);
      expect(storage.jsonParsed()).toEqual(null);
    });

    it('returns null if key found, but empty', function() {
      spyOn(localStorage, "getItem").and.returnValue('');
      expect(storage.jsonParsed()).toEqual(null);
    });
  });

  describe('.get', function() {
    it('gets the JSON of a particular property', function() {
      spyOn(storage, "jsonParsed").and.returnValue(testParsedData);
      expect(storage.get('user')).toEqual({ "name":"lucy",
                                            "lastDate":"2015-10-05T01:39:47.031Z",
                                            "increase":10,
                                            "lastInterval":30 });
    });

    it('returns null if no data was found', function() {
      spyOn(storage, "jsonParsed").and.returnValue(null);
      expect(storage.get('user')).toEqual(null);
    });
  });

  describe('.set', function() {
    it('sets the value of a particular property', function() {
      spyOn(storage, "jsonParsed").and.returnValue(testParsedData);
      spyOn(localStorage, 'setItem');
      storage.set('user', { 'name': 'testing' });
      expect(localStorage.setItem).toHaveBeenCalledWith(key, '{"user":{"name":"testing"}}');
    });

    it("creates the value if wasn't there previously", function() {
      spyOn(storage, "jsonParsed").and.returnValue(null);
      spyOn(localStorage, 'setItem');
      storage.set('user', { 'name': 'testing' });
      expect(localStorage.setItem).toHaveBeenCalledWith(key, '{"user":{"name":"testing"}}');
    });

    it("doesn't alter other properties", function() {
      var largerTestParsedData = {
        'user': testParsedData.user,
        'another': {
          'something': 'else'
        }
      };
      spyOn(storage, "jsonParsed").and.returnValue(largerTestParsedData);
      spyOn(localStorage, 'setItem');
      storage.set('user', { 'name': 'testing' });
      expect(localStorage.setItem).toHaveBeenCalledWith(key, '{"user":{"name":"testing"},"another":{"something":"else"}}');
    });
  });
});


