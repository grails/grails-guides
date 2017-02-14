import {Component, style, state, animate, transition, trigger, HostListener} from '@angular/core';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('socialize', [
      state('out', style({right: -300})),
      state('in', style({right: 0})),
    ])
  ]
})
export class NavComponent {
  sidebar: Sidebar = new Sidebar('out');
  navExpanded = true;

  constructor() { }

  @HostListener('document:click', ['$event']) documentClick(evt: MouseEvent) {
    if (evt.srcElement.id !== 'sidebarToggle') {
      this.sidebar.state = 'out';
    }
  }
}

class Sidebar {

  constructor(public state: string) {}

  toggleState() {
    if (this.state === 'in') {
      this.state = 'out';
    } else {
      this.state = 'in';
    }
  }
}
