// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { RiskAnalysisComponent } from './app/components/risk-analysis/risk-analysis.component';

bootstrapApplication(RiskAnalysisComponent)
  .catch(err => console.error(err));
