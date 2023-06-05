import { Component } from '@angular/core';
import { Gakou } from '../meniu';
import { ActivatedRoute } from '@angular/router';
import { Gakoues } from '../mock-menu';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-meniu',
  templateUrl: './meniu.component.html',
  styleUrls: ['./meniu.component.css']
})

export class MeniuComponent {
  gakous: Gakou[] = [];
  getGakouNames(): string {
    this.gakous = Gakoues;
    return this.gakous.map(gakou => gakou.name).join(', ');
  }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
  this.getGakouNames();
  this.gakous = Gakoues;
}

navigateToDetail(gakou: Gakou): void {
    this.router.navigate(['/xx-zy', gakou.id]);
  }
}

function navigateToDetail(gakou: any, Gakou: any) {
  throw new Error('Function not implemented.');
}

