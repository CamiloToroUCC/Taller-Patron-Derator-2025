# Dashboard de Inversiones Interactivo

Este es un proyecto interactivo de simulación de inversiones, diseñado para ayudar a los usuarios a visualizar, gestionar y analizar una cartera de activos. La aplicación incluye funcionalidades dinámicas como selección de activos, inversión simulada, registro de historial de operaciones y gráficos interactivos que muestran la evolución del valor de la cartera.

## Funcionalidades Principales

- **Watchlist de Activos**: Muestra una lista de activos disponibles para invertir, con información sobre precios, cambios porcentuales y puntajes de riesgo (`riskScore`).
- **Inversión Automática y Manual**: 
  - Para activos de bajo riesgo, la inversión se ejecuta automáticamente con una ganancia simulada del 5%.
  - Para activos de alto riesgo, se solicita confirmación mediante un panel inline (sin pop-ups).
- **Registro de Historial**: Cada inversión realizada se almacena en un historial, con detalles como fecha, activo, resultado y valor total.
- **Gráfico Dinámico**: Se incluye un gráfico interactivo creado con Chart.js para visualizar la evolución del valor total de los activos en tiempo real.

## Tecnologías Utilizadas

El proyecto está desarrollado utilizando las siguientes herramientas y tecnologías:

- **Framework Frontend**: Angular (Componentes Standalone)
- **Lenguaje**: TypeScript
- **HTML y CSS**: Para la interfaz de usuario y estilos dinámicos
- **Biblioteca de Gráficos**: [Chart.js](https://www.chartjs.org/)
- **Arquitectura de Componentes**: Modular y basado en patrones de diseño como el patrón Decorator

## Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión 16 o superior): Puedes descargarlo desde [Node.js Official Site](https://nodejs.org/).
- **Angular CLI** (Command Line Interface): Instálalo globalmente ejecutando:
  ```bash
  npm install -g @angular/cli
