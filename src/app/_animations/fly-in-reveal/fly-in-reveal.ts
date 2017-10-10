import {
  animation,
  style,
  animate,
} from '@angular/animations';

export const flyInRevealNframe =  {
  transform: 'translateX(0)',
};

export const flyInRevealAnimation = animation([
  style({ transform:  'translateX({{ startPos }})' }),
  animate('{{ time }}', style({ transform: 'translateX({{ endPos }})' })),
], {
  params: {
    time: '4000ms',
    startPos: '-100px',
    endPos: '0',
  },
});
