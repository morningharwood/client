import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { MatchMediaService } from '../../../_handies/window/match-media';
import { isPlatformBrowser } from '@angular/common';
import {
  vec3,
  mat4,
  quat,
} from 'gl-matrix-ts';


@Directive({
  selector: '[bonerGl]',
})
export class BonerGlDirective implements OnInit {
  private _platformId: string;
  private _canvas: any;
  private _gl: any;
  private _shaderProgram: any;
  private vertexCount: number = 5000;
  private _matrix = mat4.create();
  private _buffer: any;
  private _indexCount: number;
  private _quat: any = quat.create();
  private _translate: any = [
    -3.5,
    -1.0,
    -9.0,
  ];
  private _scale: any = [
    0.75,
    0.75,
    1.0,
  ];
  private _rafId: number;
  private _pivot: number[] = [
    0,
    0,
    0,
  ];
  private mouse: any = {x: null, y: null};

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
    this._locateIndices();
    this._locatePointSize();
    this._locatePerspective();
    this._setCamera(0, 0, -4);
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
      [
        vs,
        gl.VERTEX_SHADER,
      ],
      [
        fs,
        gl.FRAGMENT_SHADER,
      ],
    ];

    for (let s of shaders) {
      gl.attachShader(this._shaderProgram, this._getShader(s));
    }

    gl.linkProgram(this._shaderProgram);
    gl.useProgram(this._shaderProgram);
  }


  private _getShader(shaderArr) {
    const shader = shaderArr[ 0 ];
    const type = shaderArr[ 1 ];
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
      1,
    ];
  }

  private _assignVertices(count): Array<number> {
    this.vertexCount = count;
    return [
      -1,
      -1,
      -1,
      ...BonerGlDirective._assignColors(),
      1,
      -1,
      -1,
      ...BonerGlDirective._assignColors(),
      -1,
      1,
      -1,
      ...BonerGlDirective._assignColors(),
      1,
      1,
      -1,
      ...BonerGlDirective._assignColors(),
      -1,
      1,
      1,
      ...BonerGlDirective._assignColors(),
      1,
      1,
      1,
      ...BonerGlDirective._assignColors(),
      -1,
      -1,
      1,
      ...BonerGlDirective._assignColors(),
      1,
      -1,
      1,
      ...BonerGlDirective._assignColors(),
    ];
  }

  private _pushBuffer() {
    const gl = this._gl;
    this._buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._assignVertices(8)), gl.DYNAMIC_DRAW);
  }

  private _popBuffer() {
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
  }

  private _locateVertices() {
    const gl = this._gl;

    let coords = gl.getAttribLocation(this._shaderProgram, 'coords');
    gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 7, 0);
    gl.enableVertexAttribArray(coords);
  }

  private _locateColors() {
    const gl = this._gl;
    let colorsLocation = gl.getAttribLocation(this._shaderProgram, 'colors');
    gl.vertexAttribPointer(colorsLocation, 4, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 7, Float32Array.BYTES_PER_ELEMENT * 3);
    gl.enableVertexAttribArray(colorsLocation);
  }

  private _locatePointSize() {
    const gl = this._gl;
    let pointSize = gl.getAttribLocation(this._shaderProgram, 'pointSize');
    gl.vertexAttrib1f(pointSize, 5);

  }

  private _openingAnimation() {
    quat.slerp(this._quat, this._quat, [
      0.0,
      0.0,
      0.3,
      0.0,
    ], 0.02);

    vec3.lerp(this._translate, this._translate, [
      0.0,
      0.0,
      -9.0,
    ], .05);
    vec3.lerp(this._scale, this._scale, [
      3.5,
      0.75,
      1.0,
    ], .05);
    vec3.lerp(this._pivot, this._pivot, [
      0,
      1.0,
      1.0,
    ], 0.05);
  }

  private _draw() {
    const gl = this._gl;


    mat4.fromRotationTranslationScaleOrigin(
      this._matrix,
      this._quat,
      this._translate,
      this._scale,
      this._pivot,
    );
    if (this._quat[ 2 ] <= 0.2999) {
      this._openingAnimation();
    } else {
      quat.slerp(this._quat, this._quat, [
        0.0,
        (this.mouse.x / 10000),
        (this.mouse.y / 10000),
        0.0,
      ], 0.005);
      mat4.fromRotationTranslationScaleOrigin(
        this._matrix,
        this._quat,
        this._translate,
        this._scale,
        this._pivot,
      );
    }
    const transformMatrix = this._gl.getUniformLocation(this._shaderProgram, 'transformMatrix');
    gl.uniformMatrix4fv(transformMatrix, false, this._matrix);
    // gl.clearColor(0.0, 0.5, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, this._indexCount, gl.UNSIGNED_BYTE, 0);
    this._rafId = requestAnimationFrame(this._draw.bind(this));
  }

  private _locatePerspective() {
    let perspectiveMatrix = mat4.create();
    mat4.perspective(perspectiveMatrix, 1, this._canvas.width / this._canvas.height, 0.1, 10);
    const perspectiveLocation = this._gl.getUniformLocation(this._shaderProgram, 'perspectiveMatrix');
    this._gl.uniformMatrix4fv(perspectiveLocation, false, perspectiveMatrix);
  }

  private _setCamera(x, y, z) {
    mat4.translate(this._matrix, this._matrix, [
      x,
      y,
      z,
    ]);
  }

  private _locateIndices() {
    const indices = [
      0,
      1,
      2,
      1,
      2,
      3,
      2,
      3,
      4,
      3,
      4,
      5,
      4,
      5,
      6,
      5,
      6,
      7,
      6,
      7,
      0,
      7,
      0,
      1,
      0,
      2,
      6,
      2,
      6,
      4,
      1,
      3,
      7,
      3,
      7,
      5,
    ];
    this._indexCount = indices.length;
    const indexBuffer = this._gl.createBuffer();
    this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), this._gl.STATIC_DRAW);
  }

  @HostListener('mousemove', ['$event'])
  watchMouse($event: MouseEvent) {
    this.mouse.x = $event.screenX;
    this.mouse.y = $event.screenY;
  }

}
