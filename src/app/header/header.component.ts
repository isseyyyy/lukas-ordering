import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  ngOnInit(): void {
    const headerEl: any = document.querySelector('#header');

    window.addEventListener("scroll", function () {
      const scrollPos: number = window.scrollY;
      
      if ( scrollPos > 100 ) {
        headerEl.classList.add('header__mini');
      } else {
        headerEl.classList.remove('header__mini');
      }
    });
  };
};
