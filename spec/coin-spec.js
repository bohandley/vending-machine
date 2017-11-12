describe("Coin", function() {
  var coin;

  beforeEach(function() {
    nickel = new Coin({name: "nickel"})
  });

  describe("name", function() {
    it("has a name", function() {
      expect(nickel.name).toEqual("nickel");
    });
  });

  describe("size", function () {
    it("has a size", function () {
      expect(nickel.size).toEqual(6);
    });
  });
});