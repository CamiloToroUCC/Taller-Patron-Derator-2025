// risk-analysis.service.ts
import { Injectable } from '@angular/core';
import { Investment, RiskCalculator } from '../models/risk-calculator.interface';
import { BasicRiskCalculator } from '../decorators/basic-risk-calculator';
import { SentimentRiskDecorator } from '../decorators/sentiment-risk-decorator';
import { RegulatoryRiskDecorator } from '../decorators/regulatory-risk-decorator';

@Injectable({
  providedIn: 'root'
})
export class RiskAnalysisService {
  private riskCalculator: RiskCalculator;

  constructor() {
    let calculator: RiskCalculator = new BasicRiskCalculator();
    calculator = new SentimentRiskDecorator(calculator);
    calculator = new RegulatoryRiskDecorator(calculator);
    this.riskCalculator = calculator;
  }

  public getRiskScore(investment: Investment): number {
    return this.riskCalculator.calculateRisk(investment);
  }
}
