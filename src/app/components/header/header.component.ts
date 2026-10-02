import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() title: string = '';
    @Input() headers: { label: string; value: number }[] = [];
    @Input() imageSrc: string = '';
    @Input() imageAlt: string = '';
    @Input() imageClass: string = '';
}