import { Component, OnInit } from '@angular/core';
import { AdminSecretService } from 'src/app/services/admin-secret.service';

@Component({
  selector: 'app-admin-secret',
  templateUrl: './admin-secret.component.html',
  styleUrls: ['./admin-secret.component.css']
})
export class AdminSecretComponent implements OnInit {

  public secret: string = '';
  constructor(private adminService: AdminSecretService) { 
    this.getSecret();
  }

  ngOnInit(): void {
  }

  getSecret(){
    this.adminService.getSecret().subscribe((res) => {
      this.secret = res
    });
  }

}
