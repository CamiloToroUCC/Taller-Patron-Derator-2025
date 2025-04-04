// risk-calculator-decorator.ts
import { RiskCalculator, Investment } from "../models/risk-calculator.interface";

export abstract class RiskCalculatorDecorator implements RiskCalculator {
  protected decoratedCalculator: RiskCalculator;

  constructor(calculator: RiskCalculator) {
    this.decoratedCalculator = calculator;
  }

  calculateRisk(investment: Investment): number {
    return this.decoratedCalculator.calculateRisk(investment);
  }
}
