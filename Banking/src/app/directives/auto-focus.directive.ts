import { AfterViewInit, Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements OnInit {

  constructor(private el:ElementRef, private renderer:Renderer2) { }
  ngOnInit(): void {
    this.el.nativeElement.focus()
  }


  @HostListener('mouseenter') onClick(){
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'lightblue')

  }

}
