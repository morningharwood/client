import { MediaQueryHelper as MQ } from './media-query';
import { Injectable } from '@angular/core';

@Injectable()
export class MatchMediaService {
  public static bp(size) {
    return MQ.getBreakpointSizeByName(size) === MQ.findBreakpoint()
  }
}
