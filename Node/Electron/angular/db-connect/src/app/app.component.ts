import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  type!: string
  isUsers: boolean = false;
  isForm: boolean = false;
  isReport: boolean = false;

  getEvent(type: string){
    this.type = type;
    switch(type){
      case 'users':
        this.isUsers = true;
        this.isForm = false;
        this.isReport = false;
        break;
      case 'form':
        this.isUsers = false;
        this.isForm = true;
        this.isReport = false;
        break;
      case 'report':
        this.isUsers = false;
        this.isForm = false;
        this.isReport = true;
        break;
      default:
        this.isUsers = false;
        this.isForm = false;
        this.isReport = false
    }
  }
}
