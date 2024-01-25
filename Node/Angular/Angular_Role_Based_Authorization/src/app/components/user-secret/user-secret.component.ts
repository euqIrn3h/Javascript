import { Component, OnInit } from '@angular/core';
import { UserSecretService } from 'src/app/services/user-secret.service';

@Component({
  selector: 'app-user-secret',
  templateUrl: './user-secret.component.html',
  styleUrls: ['./user-secret.component.css']
})
export class UserSecretComponent implements OnInit {

  public secret: string = '';
  constructor(private userService: UserSecretService) { 
    this.getSecret();
  }

  ngOnInit(): void {
  }

  getSecret(){
    this.userService.getSecret().subscribe((res) => {
      this.secret = res;
    });
  }
}
