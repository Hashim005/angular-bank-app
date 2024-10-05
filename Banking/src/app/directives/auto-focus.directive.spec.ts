import { ElementRef, Renderer2 } from '@angular/core';
import { AutoFocusDirective } from './auto-focus.directive';

describe('AutoFocusDirective', () => {

  let elementRef: ElementRef;
  let renderer: Renderer2;
  it('should create an instance', () => {
    const directive = new AutoFocusDirective(elementRef, renderer);
    expect(directive).toBeTruthy();
  });
});
