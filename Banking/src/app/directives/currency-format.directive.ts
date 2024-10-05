import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormat]'
})
export class CurrencyFormatDirective {
  private el !: HTMLInputElement

  constructor(private elementRef:ElementRef, private renderer:Renderer2) {
    this.el = this.elementRef.nativeElement

   }

   @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    // Ensure value is not undefined or null before formatting
    if (value) {
      const formattedValue = this.formatCurrency(value);
      this.renderer.setProperty(this.el, 'value', formattedValue);
    }
  }

  private formatCurrency(value: string): string {
    // Remove any non-numeric characters
    const cleaned = ('' + value).replace(/\D/g, '');
    // Format as currency (US example)
    const match = cleaned.match(/^(\d{1,3})(\d{3})?(\d{3})?(\d{1,2})?$/);
    if (match) {
      let result = match[1];
      if (match[2]) result += ',' + match[2];
      if (match[3]) result += ',' + match[3];
      if (match[4]) result += '.' + match[4];
      return result;
    }
    return value;
  }
}
