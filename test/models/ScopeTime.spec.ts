import { ScopeTime, DayOfWeek } from '../../src';
import { expect } from 'chai';

describe('ScopeTime', () => {

  function generateScope(option: any) {
    return () => {
      return new ScopeTime(option);
    };
  }

  function scopeSetStart(scope: ScopeTime, day: any, hour: any) {
    return () => {
      return scope.setStart(day, hour);
    };
  }

  function scopeSetEnd(scope: ScopeTime, day: any, hour: any) {
    return () => {
      return scope.setEnd(day, hour);
    };
  }


  function scopeStart(scope: ScopeTime, day: any) {
    return () => {
      return scope.start(day);
    };
  }

  function scopeEnd(scope: ScopeTime, day: any) {
    return () => {
      return scope.end(day);
    };
  }
  describe('constructor', () => {
    it('should returns 0 when not to set default start time.', () => {
      const scope = new ScopeTime();
      expect(scope.start(DayOfWeek.Sunday)).to.equal(0);
      expect(scope.start(DayOfWeek.Monday)).to.equal(0);
      expect(scope.start(DayOfWeek.Tuesday)).to.equal(0);
      expect(scope.start(DayOfWeek.Wednesday)).to.equal(0);
      expect(scope.start(DayOfWeek.Thursday)).to.equal(0);
      expect(scope.start(DayOfWeek.Friday)).to.equal(0);
      expect(scope.start(DayOfWeek.Saturday)).to.equal(0);

    });

    it('should returns 3 when set default start time 3.', () => {
      const scope = new ScopeTime({ defaultStart: 3 });
      expect(scope.start(DayOfWeek.Sunday)).to.equal(3);
      expect(scope.start(DayOfWeek.Monday)).to.equal(3);
      expect(scope.start(DayOfWeek.Tuesday)).to.equal(3);
      expect(scope.start(DayOfWeek.Wednesday)).to.equal(3);
      expect(scope.start(DayOfWeek.Thursday)).to.equal(3);
      expect(scope.start(DayOfWeek.Friday)).to.equal(3);
      expect(scope.start(DayOfWeek.Saturday)).to.equal(3);
    });

    it('should be success when set default start time 24 and 0.', () => {
      expect(generateScope(24)).not.to.throw();
      expect(generateScope(0)).not.to.throw();
    });


    it('should throws error when set default start time x (x < 0 or 24 < x).', () => {
      expect(generateScope({ defaultStart: -1 })).to.throw(Error);
      expect(generateScope({ defaultStart: 25 })).to.throw(Error);
    });

    it('should returns 0 when not to set default end time.', () => {
      const scope = new ScopeTime();
      expect(scope.end(DayOfWeek.Sunday)).to.equal(24);
      expect(scope.end(DayOfWeek.Monday)).to.equal(24);
      expect(scope.end(DayOfWeek.Tuesday)).to.equal(24);
      expect(scope.end(DayOfWeek.Wednesday)).to.equal(24);
      expect(scope.end(DayOfWeek.Thursday)).to.equal(24);
      expect(scope.end(DayOfWeek.Friday)).to.equal(24);
      expect(scope.end(DayOfWeek.Saturday)).to.equal(24);

    });
    it('should returns 3 when set default end time 3.', () => {
      const scope = new ScopeTime({ defaultEnd: 3 });
      expect(scope.end(DayOfWeek.Sunday)).to.equal(3);
      expect(scope.end(DayOfWeek.Monday)).to.equal(3);
      expect(scope.end(DayOfWeek.Tuesday)).to.equal(3);
      expect(scope.end(DayOfWeek.Wednesday)).to.equal(3);
      expect(scope.end(DayOfWeek.Thursday)).to.equal(3);
      expect(scope.end(DayOfWeek.Friday)).to.equal(3);
      expect(scope.end(DayOfWeek.Saturday)).to.equal(3);
    });
    it('should be success when set default end time 24 and 0.', () => {
      expect(generateScope({ defaultEnd: 24 })).not.to.throw();
      expect(generateScope({ defaultEnd: 0 })).not.to.throw();
    });

    it('should throws error when set default end time x (x < 0 or 24 < x).', () => {
      expect(generateScope({ defaultEnd: -1 })).to.throw(Error);
      expect(generateScope({ defaultEnd: 25 })).to.throw(Error);
    });

    it('should throws error when start is after then end. start value is 5 and end value is 3.', () => {
      expect(generateScope({ defaultStart: 5, defaultEnd: 3 })).to.throw(Error);
    });

  });



  describe('setStart', () => {
    const scope = new ScopeTime();
    it('should throws error when given day is not between 0(Sunday) and 6(Saturday).', () => {
      expect(scopeSetStart(scope, -1, 0)).to.throw();
      expect(scopeSetStart(scope, 7, 0)).to.throw();
    });

    it('should throws error when given hour is not between 0 and 24.', () => {
      expect(scopeSetStart(scope, 1, -1)).to.throw();
      expect(scopeSetStart(scope, 1, 25)).to.throw();
    });

    it('should to be seted when given day is between 0 and 6, given hour between 0 and 24.', () => {
      expect(scopeSetStart(scope, 1, 1)).not.to.throw();
      expect(scopeSetStart(scope, 1, 12)).not.to.throw();
      expect(scopeSetStart(scope, 6, 17)).not.to.throw();
      expect(scopeSetStart(scope, 6, 12)).not.to.throw();
    });

  });

  describe('setEnd', () => {
    const scope = new ScopeTime();
    it('should throws error when given day is not between 0(Sunday) and 6(Saturday).', () => {
      expect(scopeSetEnd(scope, -1, 0)).to.throw();
      expect(scopeSetEnd(scope, 7, 0)).to.throw();
    });

    it('should throws error when given hour is not between 0 and 24.', () => {
      expect(scopeSetEnd(scope, 1, -1)).to.throw();
      expect(scopeSetEnd(scope, 1, 25)).to.throw();
    });

    it('should to be seted when given day is between 0 and 6, given hour between 0 and 24.', () => {
      expect(scopeSetEnd(scope, 1, 1)).not.to.throw();
      expect(scopeSetEnd(scope, 1, 12)).not.to.throw();
      expect(scopeSetEnd(scope, 6, 17)).not.to.throw();
      expect(scopeSetEnd(scope, 6, 12)).not.to.throw();
    });
  });


  describe('start', () => {
    const scope = new ScopeTime();
    it('should throws error when given day is not between 0(Sunday) and 6(Saturday).', () => {
      expect(scopeStart(scope, -1)).to.throw();
    });

  });

  describe('end', () => {
    const scope = new ScopeTime();
    it('should throws error when given day is not between 0(Sunday) and 6(Saturday).', () => {
      expect(scopeEnd(scope, -1)).to.throw();
    });

  });

});
