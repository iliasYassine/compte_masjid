import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../charts.service';
import { ChartsModel } from './chartsmodel';
import { Chart, registerables,LinearScale } from 'chart.js';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [NgFor],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnInit{


constructor(private chartsService:ChartsService){ Chart.register(...registerables);}
compte: ChartsModel[] = [];
  chart: Chart | null = null;
  totalDons: number = 0;
  objectif: number = 10000; // Exemple d'objectif

  ngOnInit(): void {
    this.getInfoDons();
  }

  getInfoDons() {
    this.chartsService.getCompte().subscribe(data => {
      this.compte = data;
      this.calculateTotalDons();
      this.getCharts();
    });
  }

  calculateTotalDons() {
    this.totalDons = this.compte.reduce((sum, c) => sum + (c.dons || 0), 0);
  }

  getCharts() {
    const achieved = this.totalDons; // Montant atteint
    const remaining = this.objectif - achieved > 0 ? this.objectif - achieved : 0; // Montant restant

    // Utiliser les valeurs pour le graphique
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Montant Atteint', 'Montant Restant'],
        datasets: [{
          label: 'Dons',
          data: [achieved, remaining],
          backgroundColor: [
            'rgba(247, 19, 163, 0.95)', // Couleur pour le montant atteint
            'rgba(54, 162, 235, 0.6)', // Couleur pour le montant restant
          ],
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const label = tooltipItem.label || '';
                const value = tooltipItem.raw || 0;
                return `${label}: ${value} €`;
              }
            }
          },
          legend: {
            display: true,
            position: 'top',
          },
        },
        elements: {
          arc: {
            borderWidth: 0 // Enlever le contour
          }
        }
      }
    });
  }
}


