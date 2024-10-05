import { ElementRef, Renderer2 } from '@angular/core';
import { PasswordToggleDirective } from './password-toggle.directive';


describe('PasswordToggleDirective', () => {
  let elementRef: ElementRef;
  let renderer: Renderer2;

  beforeEach(() => {
    elementRef = new ElementRef(document.createElement('input'));
    renderer = jasmine.createSpyObj('Renderer2', ['setAttribute']);
  });
  
  it('should create an instance', () => {
    const directive = new PasswordToggleDirective(elementRef, renderer);
    expect(directive).toBeTruthy();
  });
});
