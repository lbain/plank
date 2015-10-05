function LocalStorage(key) {
  if(!key) {
    throw new Error("No key specified");
  }
  this.key = key;

  this.get = function(property) {
    var fullStorage = this.jsonParsed();
    if (!fullStorage) {
      return null;
    }
    return fullStorage[property];
  };

  this.set = function(property, value) {
    var fullStorage = this.jsonParsed() || {};
    fullStorage[property] = value;
    fullStorage = JSON.stringify(fullStorage);
    localStorage.setItem(this.key, fullStorage);
  };

  // Should be private. Left public for easier testing.
  this.jsonParsed = function() {
    var fullStorage = localStorage.getItem(this.key);
    if (!fullStorage || fullStorage === '') {
      return null;
    }
    return JSON.parse(fullStorage);
  };
}