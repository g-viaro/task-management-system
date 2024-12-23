import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  constructor(private titleService: Title, private router: Router) {}

  ngOnInit(): void {     
    
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), map(() => {
      let route: ActivatedRoute = this.router.routerState.root;
      let routeTitle = '';
      while (route!.firstChild) {
        route = route.firstChild;
      }
      if (route.snapshot.data['title']) {
        routeTitle = route!.snapshot.data['title'];
      }
      return routeTitle;
    })).subscribe((title: string) => {
      if (title) {
        this.titleService.setTitle(`Task Management System - ${title}`);
      }
    });  
    
  }

}
