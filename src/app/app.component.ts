import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AfterViewInit,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.router.navigateByUrl('/meniu');
  }


  showSubmenu: string = '';
  timeout: any;
  isMouseInSubmenu: boolean = false;

  onMouseEnter(item: string): void {
    this.showSubmenu = item;
  }

  onMouseLeave(): void {
    this.timeout = setTimeout(() => {
      if (!this.isMouseInSubmenu) {
        this.showSubmenu = '';
      }
    }, 3000); // 等待三秒后隐藏子菜单
  }

  onMouseEnterSubmenu(): void {
    this.isMouseInSubmenu = true;
  }

  onMouseLeaveSubmenu(): void {
    this.isMouseInSubmenu = false;
    this.showSubmenu = ''; // 立即隐藏弹出的框
    clearTimeout(this.timeout);
  }




}

