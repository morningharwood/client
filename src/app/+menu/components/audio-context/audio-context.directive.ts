import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Directive({
  selector: '[audioContext]'
})
export class AudioContextDirective implements OnInit {
  private _platformId: string;
  private _osc: OscillatorNode;
  private _context: AudioContext | any;
  private _volume: any;

  @Input() protected frequency: number;

  constructor(@Inject(PLATFORM_ID) platformId: string,
              private _render: Renderer2,
              private _elRef: ElementRef) {
    this._platformId = platformId;
  }

  public ngOnInit(): void {
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }
    this._context = new (window as any).AudioContext() || new (window as any).webkitAudioContext();
  }

  @HostListener('mouseenter')
  public openOsc(): void {
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }
    this._volume = this._context.createGain();
    this._volume.gain.value = .05;
    this._volume.connect(this._context.destination);

    this._osc = this._context.createOscillator();
    this._osc.frequency.value = this.frequency;
    this._osc.connect(this._volume);
    this._osc.type = 'sine';
    this._osc.start();
  }

  @HostListener('mouseleave')
  public closeOsc(): void {
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }

    this._volume.gain.value = 0;

    setTimeout(()=> {
      this._volume.disconnect(this._context.destination);
      this._volume = null;

      this._osc.stop(this._context.currentTime + 0.01);
      this._osc.disconnect(this._volume);
      this._osc = null;
    }, 50)



  }
}
