import { ElementRef, Renderer2 } from '@angular/core';
import { CurrencyFormatDirective } from './currency-format.directive';

describe('CurrencyFormatDirective', () => {

  let elementRef: ElementRef;
  let renderer: Renderer2;
  it('should create an instance', () => {
    const directive = new CurrencyFormatDirective(elementRef, renderer);
    expect(directive).toBeTruthy();
  });
});
