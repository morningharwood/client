import {
  Directive,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { MatchMediaService } from '../../../_handies/window/match-media';
import { isPlatformBrowser } from '@angular/common';


@Directive({
  selector: '[bonerGl]',
})
export class BonerGlDirective implements OnInit {
  private _platformId: string;
  private _canvas: any;
  private _gl: any;
  private _shaderProgram: any;
  private vertices: any;

  constructor(@Inject(PLATFORM_ID) platformId: string,
              private _mms: MatchMediaService,
              private _render: Renderer2,
              private _elRef: ElementRef) {
    this._platformId = platformId;
  }

  public ngOnInit(): void {
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }
    this._setUpCanvas();
    this._initGl();
    this._createShaders();
    this._createVertices();
    this._draw();
  }

  private _initGl() {
    this._gl = this._canvas.getContext('webgl');
    this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
    this._gl.clearColor(1, 1, 1, 1);
  }

  private _setUpCanvas() {
    this._canvas = this._render.selectRootElement(this._elRef).nativeElement;
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
  }

  private _createShaders() {
    const gl = this._gl;
    const vs = `
      attribute vec4 coords;
      attribute float pointSize;
      void main(void) {
        gl_Position = coords;
        gl_PointSize = pointSize;
      }
    `;

    const fs = `
      precision mediump float;
      uniform vec4 color;
      void main(void) {
        gl_FragColor = color;
      }
    `;

    this._shaderProgram = gl.createProgram();
    const shaders = [
      [vs, gl.VERTEX_SHADER],
      [fs, gl.FRAGMENT_SHADER]
    ];

    for(let s of shaders) {
      gl.attachShader(this._shaderProgram, this._getShader(s));
    }

    gl.linkProgram(this._shaderProgram);
    gl.useProgram(this._shaderProgram);
  }


  private _getShader(shaderArr) {
    const shader = shaderArr[0];
    const type = shaderArr[1];
    const processedShader = this._gl.createShader(type);
    this._gl.shaderSource(processedShader, shader);
    this._gl.compileShader(processedShader);

    return processedShader;
  }

  private _createVertices() {
    const gl = this._gl;
    const shaderProgram = this._shaderProgram;
    this.vertices = [
      -0.9, -0.9, 0.0,
      0.9, -0.9, 0.0,
      0.0,  0.9, 0.0,
    ];

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    let coords = gl.getAttribLocation(shaderProgram, 'coords');
    let pointSize = gl.getAttribLocation(shaderProgram, 'pointSize');

    gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(coords);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    let color = gl.getUniformLocation(shaderProgram, 'color');
    gl.uniform4f(color, 1, 0, 1, 1);
    gl.vertexAttrib1f(pointSize, 10);

    gl.getUniformLocation(shaderProgram, 'color');
  }

  private _draw() {
    const gl = this._gl;
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 3);
  }
}
