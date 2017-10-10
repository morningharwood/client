import {
  animation,
  style,
  animate,
  keyframes,
} from '@angular/animations';


export const fadeAnimation = animation([
  style({ opacity: '{{ start }}' }),
  animate('{{ time }}', style({ opacity: '{{ end }}' })),
], {
  delay: '5000ms',
  params: {
    time: '4000ms',
    start: 0,
    end: 1,
  },
});

export const grow = animation([
  style({
    width: '{{ start }}%',
    transform: 'rotate({{degStart}}deg)',
    'transform-origin': '0 {{originStart}}%'
  }),
  animate('{{ time }}ms', keyframes([
      style({
        width: `{{endStep1}}%`,

        transform: 'rotate({{degStart}}deg)',
        'transform-origin': '0 {{originStart}}%',
        offset: .5
      }),
      style({
        width: '{{end}}%',

        'transform-origin': '0 {{originEnd}}%',
        transform: 'rotate(-{{ degEnd }}deg)',
        offset: 1
      }),
  ])
  )], {
  params: {
    time: 5000,
    start: 0,
    endStep1: 50,
    end: 100,
    degStart: 0,
    degEnd: 30,
    originStart: 0,
    originEnd: 100,

  }
});
