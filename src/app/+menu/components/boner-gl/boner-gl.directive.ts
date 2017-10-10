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
  private _buffer: any;

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
    this._setUpGl();
    this._createShaders();
    this._pushBuffer();
    this._locateVertices();
    this._locateColors();
    this._popBuffer();
    this._locatePointSize();
    this._locatePerspective();
    this._setCamera(0,0,-2);
    this._draw();
  }

  private _setUpCanvas() {
    this._canvas = this._render.selectRootElement(this._elRef).nativeElement;
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
  }

  private _setUpGl() {
    this._gl = this._canvas.getContext('webgl');
    this._gl.enable(this._gl.DEPTH_TEST);
    this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
    this._gl.clearColor(1, 1, 1, 1);
  }

  private _createShaders() {
    const gl = this._gl;
    const vs = `
      attribute vec4 coords;
      attribute float pointSize;
      uniform mat4 transformMatrix;
      uniform mat4 perspectiveMatrix;
      attribute vec4 colors;
      varying vec4 varyingColors;
      void main(void) {
        gl_Position = perspectiveMatrix * transformMatrix * coords;
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

  private static _assignColors() {
    return [
      Math.random(),
      Math.random(),
      Math.random(),
      1
    ]
  }

  private _assignVertices (count): Array<number> {
    this.vertexCount = count;
    return [
      0, 0, ...BonerGlDirective._assignColors(),
      1, 0, ...BonerGlDirective._assignColors(),
      1, 1, ...BonerGlDirective._assignColors(),
      0, 1, ...BonerGlDirective._assignColors(),
    ];
  }

  private _pushBuffer() {
    const gl = this._gl;
    this._buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._assignVertices(4)), gl.DYNAMIC_DRAW);
  }

  private _popBuffer() {
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
  }

  private _locateVertices() {
    const gl = this._gl;

    let coords = gl.getAttribLocation(this._shaderProgram, 'coords');
    gl.vertexAttribPointer(coords, 2, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 6, 0);
    gl.enableVertexAttribArray(coords);
  }

  private _locateColors() {
    const gl = this._gl;
    let colorsLocation = gl.getAttribLocation(this._shaderProgram, 'colors');
    gl.vertexAttribPointer(colorsLocation, 4, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 6, Float32Array.BYTES_PER_ELEMENT * 2);
    gl.enableVertexAttribArray(colorsLocation);
  }

  private _locatePointSize() {
    const gl = this._gl;
    let pointSize = gl.getAttribLocation(this._shaderProgram, 'pointSize');
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

  private _locatePerspective() {
    let perspectiveMatrix = mat4.create();
    mat4.perspective(perspectiveMatrix, 1, this._canvas.width / this._canvas.height, 0.1, 10);
    const perspectiveLocation = this._gl.getUniformLocation(this._shaderProgram, 'perspectiveMatrix');
    this._gl.uniformMatrix4fv(perspectiveLocation, false, perspectiveMatrix);
  }

  private _setCamera(x,y,z) {
    mat4.translate(this._matrix, this._matrix, [x, y, z]);
  }
}
