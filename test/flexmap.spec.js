let chai = require('chai');
let path = require('path');
chai.should();
let flex = require(path.join(__dirname, '..', '/src/flexmap'));
describe('flex', () => {
  describe('#width', () => {
    let flexobj;

    beforeEach(() => {
      // Create a new Rectangle object before every test.
      flexobj = new flex({attribution:'my test scripts'});
    });

    it('check attribution must be string', () => {
      // This will fail if "rectangle.width" does
      // not equal 10.
      flexobj.options.attributions.typeof().should.equal('string');
    });

    it('id is required', () => {    
      flexobj.configureMap().should.throw(Error);
    });

  })
});