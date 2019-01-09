import { Block } from '../../src/models';
import { expect } from 'chai';

describe('Block', () => {

  describe('constractor', () => {
    function blockGenerator(start: any, end: any) {
      return () => {
        return new Block(start, end);
      };
    }

    it('should throws error when start is after then end. start value is 2019-01-02 and end value is 2019-01-01', () => {

      const start = '2019-01-02';
      const end = '2019-01-01';
      const func = blockGenerator(start, end);
      expect(func).to.throw(Error, 'start is after then end');
    });

    it('should throws error when give invalid argumant to start. given start value is 2019-01-000.', () => {
      const start = '2019-01-000';
      const end = '2019-01-02';
      const func = blockGenerator(start, end);
      expect(func).to.throw(Error, 'start value is invalid');
    });

    it('should throws error when give invalid argumant to end. given end value is 2019-01-000.', () => {
      const start = '2019-01-01';
      const end = '2019-01-00000';
      const func = blockGenerator(start, end);
      expect(func).to.throw(Error, 'end value is invalid');
    });

  });


  describe('clone', () => {
    it('should not returns same object when .clone().', () => {
      const src = new Block(new Date(1), new Date(2));
      const cloned = src.clone();
      expect(src).not.equal(cloned);
    });

    it('should same value for propaties(start, end).', () => {
      const src = new Block(new Date(1), new Date(2));
      const cloned = src.clone();
      expect(src.start.toISOString()).to.equal(cloned.start.toISOString());
      expect(src.end.toISOString()).to.equal(cloned.end.toISOString());
    });
  });

  describe('subtract', () => {

    it('should return 2 blocks when given block overlaps. first block is 10:00-10:30. last block is 11:30-12:00.', () => {
      /**
       * tokens:
       *  - start
       *  * end
       *
       *        a   b   output
       * 10:00  -         -
       * 10:30      -     *
       * 11:00
       * 11:30      *     -
       * 12:00  *         *
       */
      const a = new Block('2019-01-01T10:00:00', '2019-01-01T12:00:00');
      const b = new Block('2019-01-01T10:30:00', '2019-01-01T11:30:00');
      const output = a.subtract(b);
      expect(output).to.be.length(2);
      const [ fisrtBlock, lastBlock ] = output;
      expect(fisrtBlock.start.hour()).to.equal(10);
      expect(fisrtBlock.start.minute()).to.equal(0);
      expect(fisrtBlock.end.hour()).to.equal(10);
      expect(fisrtBlock.end.minute()).to.equal(30);
      expect(lastBlock.start.hour()).to.equal(11);
      expect(lastBlock.start.minute()).to.equal(30);
      expect(lastBlock.end.hour()).to.equal(12);
      expect(lastBlock.end.minute()).to.equal(0);

    });

    it('should return array of self clone object when given block dosen\'t overlaped.', () => {
      /**
       * tokens:
       *  - start
       *  * end
       *
       *        a   b   output
       * 10:00  -         -
       * 10:30  *         *
       * 11:00
       * 11:30      -
       * 12:00      *
       */
      const a = new Block('2019-01-01T10:00:00', '2019-01-01T10:30:00');
      const b = new Block('2019-01-01T11:30:00', '2019-01-01T12:00:00');
      const output = a.subtract(b);

      expect(output).to.be.length(1);

      const [outputBlock] = output;
      expect(outputBlock.start.hour()).to.equal(10);
      expect(outputBlock.start.minute()).to.equal(0);
      expect(outputBlock.end.hour()).to.equal(10);
      expect(outputBlock.end.minute()).to.equal(30);
    });
  });


});
