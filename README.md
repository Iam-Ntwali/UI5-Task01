# UI5-Task01

An SAP UI5 employee management application built with SAPUI5 framework, showcasing modern Fiori design patterns and responsive web development.

## 📋 Overview

This application provides a comprehensive employee management system for OPENHUB IT Limited, featuring employee listing, detailed views, and search functionality. Built using SAP UI5 with a clean, responsive design following SAP Fiori guidelines.

## ✨ Features

- **Employee Directory**: View all employees in a paginated table format
- **Employee Details**: Detailed view for individual employee information
- **Search Functionality**: Search employees by name, role, or ID
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Loading States**: Visual feedback during data operations
- **Navigation**: Seamless routing between views
- **Data Formatting**: Currency and text formatting utilities

## 🏗️ Architecture

### Views

- [`App.view.xml`](webapp/view/App.view.xml) - Main application shell with routing
- [`EmployeeDetail.view.xml`](webapp/view/EmployeeDetail.view.xml) - Employee list view with search and table
- [`Employee.view.xml`](webapp/view/Employee.view.xml) - Individual employee detail view

### Controllers

- [`App.controller.js`](webapp/controller/App.controller.js) - Main application controller
- [`EmployeeDetail.controller.js`](webapp/controller/EmployeeDetail.controller.js) - Handles employee list and search functionality
- [`Employee.controller.js`](webapp/controller/Employee.controller.js) - Manages individual employee details and navigation

### Data & Models

- [`employeeData.json`](webapp/model/employeeData.json) - Contains 25 employee records with comprehensive data
- [`formater.js`](webapp/model/formater.js) - Currency and text formatting utilities

### Configuration

- [`Component.js`](webapp/Component.js) - Application component configuration
- [`manifest.json`](webapp/manifest.json) - App descriptor with routing and dependencies

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- SAP UI5 CLI (`npm install -g @ui5/cli`)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/UI5-Task01.git
cd UI5-Task01
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
ui5 serve
```

The application will be available at `http://localhost:8080`

## 📱 Usage

### Development Commands

- `ui5 serve` - Start development server
- `ui5 build` - Build for production
- `ui5 serve --open` - Start server and open browser automatically

### Navigation Flow

1. **Employee List** (`/`) - Browse all employees with search capability
2. **Employee Detail** (`/employee/{id}`) - View detailed employee information
3. **Back Navigation** - Return to list view from detail view

## 🎨 UI Components & Features

### Employee List View

- **Responsive Table**: Displays employee information with pagination
- **Search Functionality**: Real-time filtering by name, role, or employee ID
- **Column Headers**: Name, Role, Department, Salary
- **Row Selection**: Navigate to employee details

### Employee Detail View

- **Object Header**: Employee name and role prominently displayed
- **Information Panel**: Structured display of employee data
- **Back Navigation**: Return to employee list
- **Responsive Layout**: Adapts to different screen sizes

## 🔧 Technical Stack

- **Framework**: SAPUI5 1.136.1
- **Core Libraries**:
  - `sap.ui.core` - Core functionality
  - `sap.m` - Mobile-first controls
- **Routing**: Hash-based routing with `sap.m.routing.Router`
- **Data Binding**: JSON Model with two-way binding
- **Responsive Design**: Built-in UI5 responsive grid system

## 📁 Project Structure

```
UI5-Task01/
├── webapp/
│   ├── controller/          # MVC Controllers
│   │   ├── App.controller.js
│   │   ├── Employee.controller.js
│   │   └── EmployeeDetail.controller.js
│   ├── view/               # XML Views
│   │   ├── App.view.xml
│   │   ├── Employee.view.xml
│   │   └── EmployeeDetail.view.xml
│   ├── model/              # Data models and formatters
│   │   ├── employeeData.json
│   │   └── formater.js
│   ├── css/                # Custom styles
│   ├── i18n/               # Internationalization
│   ├── Component.js        # Application component
│   ├── manifest.json       # App configuration
│   └── index.html         # Entry point
├── package.json            # Project dependencies
├── ui5.yaml               # UI5 tooling configuration
└── README.md              # This file
```

## 📄 Notes

This project is part of a UI5 learning task and is intended for educational purposes only.

---

**Built with ❤️ using Ntwali. Powered by SAPUI5**
