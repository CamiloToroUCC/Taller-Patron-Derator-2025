// basic-risk-calculator.ts
import { RiskCalculator, Investment } from "../models/risk-calculator.interface";

export class BasicRiskCalculator implements RiskCalculator {
  calculateRisk(investment: Investment): number {
    return investment.marketVolatility * 0.5 +
           investment.liquidity * 0.3 +
           investment.riskProfile * 0.2;
  }
}
