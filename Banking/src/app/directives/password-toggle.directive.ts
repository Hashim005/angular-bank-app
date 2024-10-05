import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPasswordToggle]'
})
export class PasswordToggleDirective implements AfterViewInit {
  private isPasswordVisible:boolean = false

  constructor(private el:ElementRef, private renderer:Renderer2) { }
  ngAfterViewInit(): void {
    this.updateButtonIcon();
  }
  @HostListener('click') onClick(){
    this.isPasswordVisible = !this.isPasswordVisible;
    const input = this.el.nativeElement.previousElementSibling;
    this.renderer.setAttribute(input, 'type', this.isPasswordVisible ? 'text' : 'password');
    this.updateButtonIcon()
  }

  private updateButtonIcon() {
    const icon = this.isPasswordVisible ? 'visibility_off' : 'visibility';
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', `<mat-icon>${icon}</mat-icon>`);
  }

}
