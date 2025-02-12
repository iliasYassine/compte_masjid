import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { ChartsComponent } from './charts/charts/charts.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ChartsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'compte';
  constructor(router: Router) {
    // Ajouter les routes à la configuration du routeur
    router.resetConfig(routes);
  }
}
