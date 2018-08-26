import { trigger, state, style, animate, transition, keyframes, query, group, animateChild } from '@angular/animations';
import { animation } from '@angular/core/src/animation/dsl';

export const routerFadeStateTrigger = trigger('routerFadeState', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(300)
  ]),
  transition(':leave', animate(300, style({
    opacity: 0
  })))
]);

export const routeSlideStateTriggerOld = trigger('routeSlideState', [
  transition(':enter', [
    style({
      transform: 'translateX(-100%)',
      opacity: 0
    }),
    animate(3500)
  ]),
  transition(':leave', animate('3400ms 100ms ease-out', style({
    transform: 'translateX(100%)',
    opacity: 1
  })))
]);

export const routeSlideStateTrigger = trigger('routeSlideState', [
  transition('* => *', [
    group([
      query(':enter', [
        style({
          transform: 'translateY(-100%)',
          opacity: 0
        }),
        animate(500)
      ], {optional: true}),
      query(':leave', [
        animate(500, style({
          transform: 'translateY(100%)',
          opacity: 0
        }))
      ], {optional: true})
    ])
  ])
]);

export const ngIfAnimationTrigger = trigger('ngIfAnimation', [
  transition(':enter, :leave', [
    query('@*', animateChild())
  ])
]);

export const slideTrigger = trigger('slideState', [
  transition(':enter', [
    style({
      // transform: 'translateY(-100%)',
      opacity: 0
    }),
    animate('500ms ease-out', style({
      // transform: 'translateY(0)',
      opacity: 1
    }))
  ]),
  transition(':leave', [
    style({
      // transform: 'translateY(-100%)',
      opacity: 1
    }),
    animate('100ms ease-out', style({
      // transform: 'translateY(100%)',
      opacity: 0
    }))
  ])
]);

