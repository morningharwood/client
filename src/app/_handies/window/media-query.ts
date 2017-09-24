import { zipObject } from 'lodash';


export class MediaQueryHelper {
  public static smallAliases = new Set([
    0,
    's0',
    'small',
    'sm',
    's',
    576,
  ]);
  public static mediumAliases = new Set([
    1,
    's1',
    'medium',
    'med',
    'm',
    768,
  ]);
  public static defaultAliases = new Set([
    2,
    's2',
    'normal',
    'default',
    'norm',
    'n',
    992,
  ]);
  public static largeAliases = new Set([
    3,
    's3',
    'large',
    'l',
    1200,
  ]);
  public static xLargeAliases = new Set([
    4,
    's4',
    'xlarge',
    'xl',
    1599,
  ]);
  public static breakpointSizes = [
    576,
    768,
    992,
    1200,
    1599,
  ];

  public static getWindowSize() {
    return {
      h: window.innerHeight,
      w: window.innerWidth,
    };
  }

  public static findBreakpoint() {
    const { w: winWidth } = MediaQueryHelper.getWindowSize();
    const bySize = (bp, idx, arr) => {
      if (winWidth <= bp) {
        switch (idx) {
          case 0:
            return true;
          case 1:
            return winWidth >= arr[ idx - 1 ];
          default:
            return winWidth >= arr[ idx - 2 ];
        }
      }
      return false;
    };

    return MediaQueryHelper.breakpointSizes.find(bySize);
  }

  public static getBreakpointSizeByName(bpSize: string | number): number {
    const allAliases = MediaQueryHelper.makeAliasesArray();

    const aliasMap = zipObject(MediaQueryHelper.breakpointSizes, allAliases);

    for (let [ key, set ] of Object.entries(aliasMap)) {
      if (set.has(bpSize)) {
        return parseInt(key, 10);
      }
    }
  }

  private static makeAliasesArray() {
   const aliasMap_ = [
     MediaQueryHelper.smallAliases,
      MediaQueryHelper.mediumAliases,
      MediaQueryHelper.defaultAliases,
      MediaQueryHelper.largeAliases,
      MediaQueryHelper.xLargeAliases,
   ];
    return MediaQueryHelper.breakpointSizes.map((size, idx) => aliasMap_[idx].add(idx).add(size))
  }
}


