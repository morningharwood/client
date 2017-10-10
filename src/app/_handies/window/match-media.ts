import { MediaQueryHelper as MQ } from './media-query';
import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';

@Injectable()
export class MatchMediaService {

  get onResize$(): Observable<Window> {
    return this.resizeSubject.asObservable();
  }

  private resizeSubject: Subject<Window>;

  constructor(private eventManager: EventManager) {
    this.resizeSubject = new Subject();
    this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
  }

  private onResize(event: UIEvent) {
    this.resizeSubject.next(<Window>event.target);
  }

  public static bp(size) {
    return MQ.getBreakpointSizeByName(size) === MQ.findBreakpoint()
  }

  public static generateBpStateName(name, size) {
    return `${name}:${MQ.getBreakpointSizeByName(size)}`
  }
}
