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
compte:ChartsModel[]=[];
chart: Chart | null = null;

ngOnInit(): void {
    this.getInfoDons()
    this.getCharts()
}

getInfoDons(){
  this.chartsService.getCompte().subscribe(data=>{
    this.compte=data;
    console.log(this.compte);
  })
}


getCharts(){

  const labels = this.compte.map(c => `Compte ${c.id}`); // Remplacez `id` par la propriété que vous souhaitez utiliser comme étiquette
    const dataValues = this.compte.map(c => c.dons); // Supposons que 'dons' est une propriété de votre modèle

    const ctx = document.getElementById('myChart') as HTMLCanvasElement; // Assurez-vous que l'ID correspond à votre canvas
    console.log("testos: ",dataValues);
    if (this.chart) {
      this.chart.destroy(); // Détruisez l'ancien graphique s'il existe
    }

    this.chart = new Chart(ctx, {
      type: 'doughnut', // Type de graphique
      data: {
        labels: labels,
        datasets: [{
          label: 'Dons à ce jours',
          data: dataValues,
          backgroundColor: 'rgba(247, 19, 163, 0.95)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  


}


