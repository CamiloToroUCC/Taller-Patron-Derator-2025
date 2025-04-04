// regulatory-risk-decorator.ts
import { RiskCalculator, Investment } from "../models/risk-calculator.interface";
import { RiskCalculatorDecorator } from "./risk-calculator-decorator";

export class RegulatoryRiskDecorator extends RiskCalculatorDecorator {
  constructor(calculator: RiskCalculator) {
    super(calculator);
  }

  override calculateRisk(investment: Investment): number {
    const baseRisk = super.calculateRisk(investment);
    const regulatoryRisk = 3; // Valor de ejemplo
    return baseRisk + regulatoryRisk;
  }
}
