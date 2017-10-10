import { MediaQueryHelper as MQ } from './media-query';


describe('MediaQuery library', () => {
  it('should have breakpoints', () => {
    expect(MQ.breakpointSizes)
      .toBeTruthy();
  });
  it('should have 5 breakpoints', () => {
    expect(MQ.breakpointSizes.length)
      .toBe(5);
  });
  describe('getBreakpointSizeByName()', () => {
    it('should have small sizes', () => {
      MQ.smallAliases.forEach((size)=>  {
        expect(MQ.getBreakpointSizeByName(size))
          .toBe(576);
      });
    });
    it('should have medium sizes', () => {
      MQ.mediumAliases.forEach((size)=>  {
        expect(MQ.getBreakpointSizeByName(size))
          .toBe(768);
      });
    });
    it('should have normal sizes', () => {
      MQ.defaultAliases.forEach((size)=>  {
        expect(MQ.getBreakpointSizeByName(size))
          .toBe(992);
      });
    });
    it('should have large sizes', () => {
      MQ.largeAliases.forEach((size)=>  {
        expect(MQ.getBreakpointSizeByName(size))
          .toBe(1200);
      });
    });
    it('should have xlarge sizes', () => {
      MQ.xLargeAliases.forEach((size)=>  {
        expect(MQ.getBreakpointSizeByName(size))
          .toBe(1599);
      });
    });
  });

  describe('findBreakpoint()', () => {
    let mockWindows;
    beforeEach(() => {
      const makeMockWindows = (x) => {
        return Object.assign({}, { w: x - 10 });
      };
      mockWindows = MQ.breakpointSizes
                      .map(makeMockWindows);
    });
    it('should return a breakpoint', () => {
      expect(MQ.findBreakpoint())
        .toBeTruthy();
      expect(MQ.findBreakpoint())
        .toBe(576);
    });

    it('should return s0 breakpoint', () => {
      spyOn(MQ, 'getWindowSize')
        .and
        .callFake(() => mockWindows[ 0 ]);
      expect(MQ.findBreakpoint())
        .toBe(576);
    });
    it('should return s1 breakpoint', () => {
      spyOn(MQ, 'getWindowSize')
        .and
        .callFake(() => mockWindows[ 1 ]);
      expect(MQ.findBreakpoint())
        .toBe(768);
    });
    it('should return s2 breakpoint', () => {
      spyOn(MQ, 'getWindowSize')
        .and
        .callFake(() => mockWindows[ 2 ]);
      expect(MQ.findBreakpoint())
        .toBe(992);
    });
    it('should return s3 breakpoint', () => {
      spyOn(MQ, 'getWindowSize')
        .and
        .callFake(() => mockWindows[ 3 ]);
      expect(MQ.findBreakpoint())
        .toBe(1200);
    });
    it('should return s3 breakpoint', () => {
      spyOn(MQ, 'getWindowSize')
        .and
        .callFake(() => mockWindows[ 4 ]);
      expect(MQ.findBreakpoint())
        .toBe(1599);
    });
  });
});
