// sentiment-risk-decorator.ts
import { RiskCalculator, Investment } from "../models/risk-calculator.interface";
import { RiskCalculatorDecorator } from "./risk-calculator-decorator";

export class SentimentRiskDecorator extends RiskCalculatorDecorator {
  constructor(calculator: RiskCalculator) {
    super(calculator);
  }

  override calculateRisk(investment: Investment): number {
    const baseRisk = super.calculateRisk(investment);
    const sentimentFactor = 5; // Valor de ejemplo
    return baseRisk + sentimentFactor;
  }
}
