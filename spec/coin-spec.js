describe("Coin", function() {
  var nickel;
  var penny;

  beforeEach(function() {
    nickel  = new Coin({name: "nickel"});
    penny   = new Coin({name: "penny"}); 
  });

  describe("name", function() {
    it("has a name", function() {
      expect(nickel.name).toEqual("nickel");
    });
  });

  describe("size", function () {
    it("has a size", function() {
      expect(nickel.size).toEqual(6);
    });
  });

  describe("weight", function() {
    it("has a weight", function() {
      expect(nickel.weight).toEqual(630);
    });
  });

  describe("a penny's weight", function(){});
  it("describes a penny's weight", function(){
    expect(penny.weight)toEqual(554);
  });
});