import { style } from '@angular/animations';
import { Directive, Input, OnInit, ElementRef, Renderer2, HostBinding } from '@angular/core';
import * as octicons from 'octicons';

@Directive({
  selector: '[appOpticons]'
})
export class OpticonsDirective implements OnInit {

  @Input() octicon: string;
  @Input() color: string;
  @Input() width: string;
  // @HostBinding('style.backgroundColor') backgroundColor = this.octicon;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    // console.log(this.octicon);
    const el: HTMLElement = this.elementRef.nativeElement;
    el.innerHTML = octicons[this.octicon].toSVG();
    el.style.cursor = 'pointer';

    const icon: Node = el.firstChild;
    if (this.color) {
      this.renderer.setStyle(icon, 'fill', this.color);
    }
    if (this.width) {
      this.renderer.setStyle(icon, 'width', this.width);
      this.renderer.setStyle(icon, 'height', '100%');
    }
  }

}
