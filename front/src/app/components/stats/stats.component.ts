import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Stats } from '../../shared/models/stats';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit{

  Highcharts: typeof Highcharts = Highcharts; //required by highcharts

  stats: Stats[];
  names: string[];
  gamesChartOptions: Highcharts.Options;
  averagePointsChartOptions: Highcharts.Options;
  maxPointsChartOptions: Highcharts.Options;
  totalWinsChartOptions: Highcharts.Options;

  constructor(private gameService: GameService){}

  ngOnInit(): void {
    this.gameService.getGamesStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.names = this.stats.map(item => item.name);
        this.initCharts();
      }, 
      error: (err) => {
        console.log(err);
      }
    });
  }

  initCharts(){
    Highcharts.setOptions({
      colors: ['#D4AF37'],
      chart: {
        backgroundColor: '#fffaf0',
        borderColor: '#4A2C2A',
        borderWidth: 2,
        borderRadius: 10
      }
    });
    this.initGamesChart();
    this.initAveragePointsChart();
    this.initMaxPointsChart();
    this.initTotalWinsChart();
  }

  initGamesChart(){
    const games = this.stats.map(item => item.totalGames);
    this.gamesChartOptions = {
      chart: { 
        type: 'column',
      },
      title: { text: 'Games per player' },
      xAxis: { categories: this.names },
      yAxis: { title: { text: 'Total games' } },
      series: [
        {
          type: 'column',
          name: 'Games',
          data: games,
        },
      ],
    }
  }

  initAveragePointsChart(){
    const averagePoints = this.stats.map(item => +item.averagePoints);
    this.averagePointsChartOptions = {
      chart: { 
        type: 'column',
      },
      title: { text: 'Average Points per Player' },
      xAxis: { categories: this.names },
      yAxis: { title: { text: 'Points' } },
      series: [
        {
          type: 'column',
          name: 'Points',
          data: averagePoints,
        },
      ],
    }
  }

  initMaxPointsChart(){
    const maxPoints = this.stats.map(item => item.maxPoints);
    this.maxPointsChartOptions = {
      chart: { 
        type: 'column',
      },
      title: { text: 'Max Points per Player' },
      xAxis: { categories: this.names },
      yAxis: { title: { text: 'Points' } },
      series: [
        {
          type: 'column',
          name: 'Points',
          data: maxPoints,
        },
      ],
    }
  }

  initTotalWinsChart(){
    const totalWins = this.stats.map(item => +item.totalWins);
    this.totalWinsChartOptions = {
      chart: { 
        type: 'column',
      },
      title: { text: 'Total Wins per Player' },
      xAxis: { categories: this.names },
      yAxis: { title: { text: 'wins' } },
      series: [
        {
          type: 'column',
          name: 'wins',
          data: totalWins,
        },
      ],
    }
  }

}
