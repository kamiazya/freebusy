import { ScopeTime, DayOfWeek } from '../../src';

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
      expect(scope.start(DayOfWeek.Sunday)).toBe(0);
      expect(scope.start(DayOfWeek.Monday)).toBe(0);
      expect(scope.start(DayOfWeek.Tuesday)).toBe(0);
      expect(scope.start(DayOfWeek.Wednesday)).toBe(0);
      expect(scope.start(DayOfWeek.Thursday)).toBe(0);
      expect(scope.start(DayOfWeek.Friday)).toBe(0);
      expect(scope.start(DayOfWeek.Saturday)).toBe(0);

    });

    it('should returns 3 when set default start time 3.', () => {
      const scope = new ScopeTime({ defaultStart: 3 });
      expect(scope.start(DayOfWeek.Sunday)).toBe(3);
      expect(scope.start(DayOfWeek.Monday)).toBe(3);
      expect(scope.start(DayOfWeek.Tuesday)).toBe(3);
      expect(scope.start(DayOfWeek.Wednesday)).toBe(3);
      expect(scope.start(DayOfWeek.Thursday)).toBe(3);
      expect(scope.start(DayOfWeek.Friday)).toBe(3);
      expect(scope.start(DayOfWeek.Saturday)).toBe(3);
    });

    it('should be success when set default start time 24 and 0.', () => {
      expect(generateScope(24)).not.toThrow();
      expect(generateScope(0)).not.toThrow();
    });


    it('should throws error when set default start time x (x < 0 or 24 < x).', () => {
      expect(generateScope({ defaultStart: -1 })).toThrow(Error);
      expect(generateScope({ defaultStart: 25 })).toThrow(Error);
    });

    it('should returns 0 when not to set default end time.', () => {
      const scope = new ScopeTime();
      expect(scope.end(DayOfWeek.Sunday)).toBe(24);
      expect(scope.end(DayOfWeek.Monday)).toBe(24);
      expect(scope.end(DayOfWeek.Tuesday)).toBe(24);
      expect(scope.end(DayOfWeek.Wednesday)).toBe(24);
      expect(scope.end(DayOfWeek.Thursday)).toBe(24);
      expect(scope.end(DayOfWeek.Friday)).toBe(24);
      expect(scope.end(DayOfWeek.Saturday)).toBe(24);

    });
    it('should returns 3 when set default end time 3.', () => {
      const scope = new ScopeTime({ defaultEnd: 3 });
      expect(scope.end(DayOfWeek.Sunday)).toBe(3);
      expect(scope.end(DayOfWeek.Monday)).toBe(3);
      expect(scope.end(DayOfWeek.Tuesday)).toBe(3);
      expect(scope.end(DayOfWeek.Wednesday)).toBe(3);
      expect(scope.end(DayOfWeek.Thursday)).toBe(3);
      expect(scope.end(DayOfWeek.Friday)).toBe(3);
      expect(scope.end(DayOfWeek.Saturday)).toBe(3);
    });
    it('should be success when set default end time 24 and 0.', () => {
      expect(generateScope({ defaultEnd: 24 })).not.toThrow();
      expect(generateScope({ defaultEnd: 0 })).not.toThrow();
    });

    it('should throws error when set default end time x (x < 0 or 24 < x).', () => {
      expect(generateScope({ defaultEnd: -1 })).toThrow(Error);
      expect(generateScope({ defaultEnd: 25 })).toThrow(Error);
    });

    it('should throws error when start is after then end. start value is 5 and end value is 3.', () => {
      expect(generateScope({ defaultStart: 5, defaultEnd: 3 })).toThrow(Error);
    });

  });



  describe('setStart', () => {
    const scope = new ScopeTime();
    it('should throws error when given day is not between 0(Sunday) and 6(Saturday).', () => {
      expect(scopeSetStart(scope, -1, 0)).toThrow();
      expect(scopeSetStart(scope, 7, 0)).toThrow();
    });

    it('should throws error when given hour is not between 0 and 24.', () => {
      expect(scopeSetStart(scope, 1, -1)).toThrow();
      expect(scopeSetStart(scope, 1, 25)).toThrow();
    });

    it('should to be seted when given day is between 0 and 6, given hour between 0 and 24.', () => {
      expect(scopeSetStart(scope, 1, 1)).not.toThrow();
      expect(scopeSetStart(scope, 1, 12)).not.toThrow();
      expect(scopeSetStart(scope, 6, 17)).not.toThrow();
      expect(scopeSetStart(scope, 6, 12)).not.toThrow();
    });

  });

  describe('setEnd', () => {
    const scope = new ScopeTime();
    it('should throws error when given day is not between 0(Sunday) and 6(Saturday).', () => {
      expect(scopeSetEnd(scope, -1, 0)).toThrow();
      expect(scopeSetEnd(scope, 7, 0)).toThrow();
    });

    it('should throws error when given hour is not between 0 and 24.', () => {
      expect(scopeSetEnd(scope, 1, -1)).toThrow();
      expect(scopeSetEnd(scope, 1, 25)).toThrow();
    });

    it('should to be seted when given day is between 0 and 6, given hour between 0 and 24.', () => {
      expect(scopeSetEnd(scope, 1, 1)).not.toThrow();
      expect(scopeSetEnd(scope, 1, 12)).not.toThrow();
      expect(scopeSetEnd(scope, 6, 17)).not.toThrow();
      expect(scopeSetEnd(scope, 6, 12)).not.toThrow();
    });
  });


  describe('start', () => {
    const scope = new ScopeTime();
    it('should throws error when given day is not between 0(Sunday) and 6(Saturday).', () => {
      expect(scopeStart(scope, -1)).toThrow();
    });

  });

  describe('end', () => {
    const scope = new ScopeTime();
    it('should throws error when given day is not between 0(Sunday) and 6(Saturday).', () => {
      expect(scopeEnd(scope, -1)).toThrow();
    });

  });

});
