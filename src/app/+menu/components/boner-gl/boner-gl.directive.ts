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
import {mat4} from 'gl-matrix';

@Directive({
  selector: '[bonerGl]',
})
export class BonerGlDirective implements OnInit {
  private _platformId: string;
  private _canvas: any;
  private _gl: any;
  private _shaderProgram: any;
  private vertexCount: number = 5000;
  private _vertices: any;
  private _angle: any = 0;
  private _transformMatrix: WebGLUniformLocation | any;
  private width_: number = 0;
  private _matrix = mat4.create();
  private _colors: number[];

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

  private _setUpCanvas() {
    this._canvas = this._render.selectRootElement(this._elRef).nativeElement;
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
  }

  private _initGl() {
    this._gl = this._canvas.getContext('webgl');
    this._gl.enable(this._gl.DEPTH_TEST);
    this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
    this._gl.clearColor(1, 1, 1, 1);
  }

  private _rotate(angle) {
    const cos = Math.cos(angle),
      sin = Math.sin(angle),
      matrix = new Float32Array(
        [cos, sin, 0, 0,
          -sin, cos, 0, 0,
          0,   0, 1, 0,
          0,   0, 0, 1]);
    const transformMatrix = this._gl.getUniformLocation(this._shaderProgram, "transformMatrix");
    this._gl.uniformMatrix4fv(transformMatrix, false, matrix);
  }

  private _scale(w = 1, h = 1, d= 1) {
    const matrix = [
      w,    0,    0,   0,
      0,    h,    0,   0,
      0,    0,    d,   0,
      0,    0,    0,   1
    ];
    const transformMatrix = this._gl.getUniformLocation(this._shaderProgram, "transformMatrix");
    this._gl.uniformMatrix4fv(transformMatrix, false, matrix);
  }

  private _createShaders() {
    const gl = this._gl;
    const vs = `
      attribute vec4 coords;
      attribute float pointSize;
      uniform mat4 transformMatrix;
      attribute vec4 colors;
      varying vec4 varyingColors;
      void main(void) {
        gl_Position = transformMatrix * coords;
        gl_PointSize = pointSize;
        varyingColors = colors;
      }
    `;

    const fs = `
      precision mediump float;
      uniform vec4 color;
      varying vec4 varyingColors;
      void main(void) {
        gl_FragColor = varyingColors;
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

  private _assignColors(count) {
    let colors = [];
    for(let i = 0; i < count; i ++ ) {
      colors.push(Math.random());
      colors.push(Math.random());
      colors.push(Math.random());
      colors.push(1);
    }
    return colors;
  }

  private _assignVertices (count): Array<number> {
    this.vertexCount = count;
    return [0,0, 1, 0, 1, 1, 0, 1];
  }

  private _createVertices() {
    const gl = this._gl;
    const shaderProgram = this._shaderProgram;
    this._vertices = this._assignVertices(4);
    this._colors = this._assignColors(4);
    this._locateVertices();
    this._locateColors();

    let pointSize = gl.getAttribLocation(shaderProgram, 'pointSize');
    gl.vertexAttrib1f(pointSize, 5);
  }


  private _draw() {
    const gl = this._gl;
    mat4.rotateX(this._matrix,this._matrix, 0.01);
    const transformMatrix = this._gl.getUniformLocation(this._shaderProgram, 'transformMatrix');
    gl.uniformMatrix4fv(transformMatrix, false, this._matrix);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    requestAnimationFrame(this._draw.bind(this));
  }

  private _locateVertices() {
    const gl = this._gl;
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices), gl.DYNAMIC_DRAW);

    let coords = gl.getAttribLocation(this._shaderProgram, 'coords');
    gl.vertexAttribPointer(coords, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coords);
  }

  private _locateColors() {
    const gl = this._gl;
    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._colors), gl.STATIC_DRAW);

    let colorsLocation = gl.getAttribLocation(this._shaderProgram, 'colors');
    gl.vertexAttribPointer(colorsLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorsLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
}
