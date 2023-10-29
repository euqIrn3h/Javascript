import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Output() sidebarEvent = new EventEmitter<string>();

  event(type: string){
    this.sidebarEvent.emit(type);
  }
}
