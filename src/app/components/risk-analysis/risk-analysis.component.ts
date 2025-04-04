import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Investment } from '../../models/risk-calculator.interface';
import { 
  BasicTransaction, 
  InvestTransactionDecorator, 
  Transaction 
} from '../../services/transaction.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-risk-analysis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './risk-analysis.component.html',
  styleUrls: ['./risk-analysis.component.css']
})
export class RiskAnalysisComponent implements OnInit, AfterViewInit {
  totalAssetValue: string = "$38,256.08";
  
  // activo riskScore individual
  watchlist: Array<{ symbol: string, name: string, price: string, change: string, riskScore: number }> = [
    { symbol: "BTC", name: "Bitcoin", price: "$17,751.05", change: "+1.3%", riskScore: 7 },
    { symbol: "ETH", name: "Ethereum", price: "$6,980.10", change: "-1.8%", riskScore: 4 },
    { symbol: "BNB", name: "Binance Coin", price: "$10,731.01", change: "+2.0%", riskScore: 6 },
    { symbol: "TRX", name: "Tron", price: "$7,324.17", change: "+1.4%", riskScore: 8 },
    { symbol: "ADA", name: "Cardano", price: "$1.35", change: "+2.5%", riskScore: 5 },
    { symbol: "SOL", name: "Solana", price: "$30.50", change: "-1.0%", riskScore: 7 }
  ];

  //  seleccionado  activo para invertir
  selectedAsset: { symbol: string, name: string, price: string, change: string, riskScore: number } | null = null;
  
  
  investmentResult: string = "";
  alertClass: string = ""; 
  
  // Ppanel inline de confirmación para activos de alto riesgo
  pendingConfirmation: boolean = false;
  
  // Historial
  investmentHistory: Array<{ date: Date, asset: string, symbol: string, result: string, totalAssetValue: string }> = [];
  
  // instancia del gráfico bibliotecaa Chart
  chart: Chart | null = null;

  constructor() {}

  ngOnInit(): void {
    // trae su propio riskScore.
  }
  
  ngAfterViewInit(): void {
    // Grafico despues renderizar la vista
    const ctx = (document.getElementById('investmentChart') as HTMLCanvasElement).getContext('2d');
    this.chart = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: [], // fechas (horas o minutos)
        datasets: [{
          label: 'Valor Total de Activos',
          data: [],
          borderColor: '#00D084',
          backgroundColor: 'rgba(0,208,132,0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
  
  //lel gráfico con los datos del historial
  updateChart(): void {
    const dates = this.investmentHistory.map(record => record.date.toLocaleTimeString());
    const values = this.investmentHistory.map(record => parseFloat(record.totalAssetValue.replace(/[^\d\.]/g, '')));
    if (this.chart) {
      this.chart.data.labels = dates;
      this.chart.data.datasets[0].data = values;
      this.chart.update();
    }
  }
  
  //  nueva entrada en el historial e invoca la actualización del gráfico
  private addInvestmentRecord(result: string): void {
    this.investmentHistory.push({
      date: new Date(),
      asset: this.selectedAsset ? this.selectedAsset.name : '',
      symbol: this.selectedAsset ? this.selectedAsset.symbol : '',
      result: result,
      totalAssetValue: this.totalAssetValue
    });
    this.updateChart();
  }


  selectAsset(asset: { symbol: string, name: string, price: string, change: string, riskScore: number }): void {
    this.selectedAsset = asset;
    this.pendingConfirmation = false;
    this.investmentResult = "";
    this.alertClass = "";
  }

  // al pulsar "Invest Now"
  onInvest(): void {
    if (this.selectedAsset) {
      let currentValue = parseFloat(this.totalAssetValue.replace(/[^\d\.]/g, ''));
      
      if (this.selectedAsset.riskScore < 6) {
        let updatedValue = currentValue * 1.05;
        this.totalAssetValue = this.formatCurrency(updatedValue);
        this.investmentResult = `Inversión en ${this.selectedAsset.name} (${this.selectedAsset.symbol}) realizada con éxito a un precio de ${this.selectedAsset.price}.\n` +
                                `Resultado: Ganancia aplicada.\n` +
                                `Valor actualizado: ${this.totalAssetValue}.`;
        this.alertClass = "opportunity";
        this.pendingConfirmation = false;
        this.addInvestmentRecord("Ganancia aplicada");
      } else {
        this.pendingConfirmation = true;
        this.investmentResult = "";
        this.alertClass = "warning";
      }
    } else {
      this.investmentResult = "Por favor, seleccione un activo para invertir.";
      this.alertClass = "warning";
    }
  }

  //confirmar la inversión en activos de alto riesgo
  confirmInvestment(): void {
    if (this.selectedAsset) {
      let currentValue = parseFloat(this.totalAssetValue.replace(/[^\d\.]/g, ''));
      let updatedValue = currentValue * 0.95;  // Se simula una pérdida del 5%
      this.totalAssetValue = this.formatCurrency(updatedValue);
      this.investmentResult = `Inversión en ${this.selectedAsset.name} (${this.selectedAsset.symbol}) realizada con éxito a un precio de ${this.selectedAsset.price}.\n` +
                              `Resultado: Pérdida aplicada.\n` +
                              `Valor actualizado: ${this.totalAssetValue}.`;
      this.alertClass = "warning";
      this.pendingConfirmation = false;
      this.addInvestmentRecord("Pérdida aplicada");
    }
  }

  // cancelar la inversión
  cancelInvestment(): void {
    this.pendingConfirmation = false;
    this.investmentResult = "Operación cancelada.";
    this.alertClass = "warning";
  }

  //  formatear un número en notación de moneda
  private formatCurrency(value: number): string {
    return "$" + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
