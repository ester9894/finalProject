import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {
    if (localStorage.getItem('userId') != null)
      this.router.navigateByUrl('home-page')
     
  }


  login() {
    this.router.navigateByUrl('login')
  }

  register() {
    this.router.navigateByUrl('register')

  }
}
