# UI5-Task01

An SAP UI5 employee management application built with SAPUI5 framework, showcasing modern Fiori design patterns, responsive web development, and full CRUD operations.

## 📋 Overview

This application provides a comprehensive employee management system for OpenHub IT Corp., featuring employee listing, detailed views, search functionality, and complete CRUD operations. Built using SAP UI5 with a clean, responsive design following SAP Fiori guidelines and modern UX patterns.

## ✨ Features

- **Employee Directory**: Modern DynamicPage with responsive table showing employee data
- **Employee Details**: Clean detail view with avatar, contact info, and organizational data
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality with validation
- **Search Functionality**: Real-time filtering by name, role, department, or ID
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices with adaptive layouts
- **Loading States**: Visual feedback during data operations
- **Navigation**: Seamless routing between views with breadcrumb navigation
- **Data Formatting**: Currency formatting, employee ID generation, and department icons
- **Form Validation**: Real-time validation with error messages and state management
- **Internationalization**: Multi-language support (English/French) with proper fallback
- **Modern UI**: Uses SAP Fiori 3 theme with DynamicPage layout and modern controls

## 🏗️ Architecture

### Views

- [`App.view.xml`](webapp/view/App.view.xml) - Main application shell with routing container
- [`EmployeesList.view.xml`](webapp/view/EmployeesList.view.xml) - Employee list with DynamicPage, search, and responsive table
- [`EmployeeDetail.view.xml`](webapp/view/EmployeeDetail.view.xml) - Individual employee detail view with avatar and contact info
- [`NotFound.view.xml`](webapp/view/NotFound.view.xml) - 404 error page with illustrated message

### Controllers

- [`BaseController.js`](webapp/controller/BaseController.js) - Base controller with common functionality, dialog management, and validation
- [`App.controller.js`](webapp/controller/App.controller.js) - Main application controller
- [`EmployeesList.controller.js`](webapp/controller/EmployeesList.controller.js) - Handles employee list, search, filtering, and CRUD operations
- [`EmployeeDetail.controller.js`](webapp/controller/EmployeeDetail.controller.js) - Manages individual employee details, editing, and deletion
- [`NotFound.controller.js`](webapp/controller/NotFound.controller.js) - Handles 404 error page navigation

### Fragments

- [`EmployeeDialog.fragment.xml`](webapp/fragment/EmployeeDialog.fragment.xml) - Reusable dialog for adding/editing employees with form validation

### Data & Models

- [`employeeData.json`](webapp/model/employeeData.json) - Contains 25 employee records with mixed departments
- [`formatter.js`](webapp/model/formatter.js) - Currency formatting, employee ID generation, department icons, and initials

### Internationalization

- [`i18n.properties`](webapp/i18n/i18n.properties) - English text resources (base)
- [`i18n_en.properties`](webapp/i18n/i18n_en.properties) - English text resources (explicit)
- [`i18n_fr.properties`](webapp/i18n/i18n_fr.properties) - French text resources

### Configuration

- [`Component.js`](webapp/Component.js) - Application component configuration
- [`manifest.json`](webapp/manifest.json) - App descriptor with routing, models, and i18n configuration

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

1. Install dependencies:

```bash
npm install
```

1. Start the development server:

```bash
npm start
# or for local development without FLP
npm run start-local
```

The application will be available at `http://localhost:8080`

## 📱 Usage

### Development Commands

- `npm start` - Start development server with Fiori Launchpad
- `npm run start-local` - Start local development server
- `npm run build` - Build for production
- `npm run start-noflp` - Start server without Fiori Launchpad
- `npm run unit-test` - Run unit tests
- `npm run int-test` - Run integration tests

### Navigation Flow

1. **Employee List** (`/`) - Browse all 25 employees with search and filtering
2. **Employee Detail** (`/employee/{id}`) - View detailed employee information with edit/delete options
3. **Add Employee** - Create new employee records with form validation
4. **Edit Employee** - Update existing employee data
5. **Delete Employee** - Remove employees with confirmation dialog

## 🎨 UI Components & Features

### Employee List View (`EmployeesList.view.xml`)

- **DynamicPage Layout**: Modern Fiori 3 design with collapsible header
- **Responsive Table**: Employee data with ID, Name, Email, Role, and Salary columns
- **Search Functionality**: Real-time filtering by name, role, department, or employee ID
- **Statistics Panel**: Shows total employees and department count
- **Action Buttons**: Add new employee and refresh data
- **Growing Table**: Pagination with lazy loading (10 items per page)
- **Avatar Integration**: Employee initials with color-coded backgrounds
- **Department Icons**: Visual icons for different departments
- **Email Links**: Clickable mailto links in email column

### Employee Detail View (`EmployeeDetail.view.xml`)

- **DynamicPage Header**: Employee avatar, name, and role prominently displayed
- **Contact Information**: Email and phone as clickable links
- **Organizational Data**: Department, role, and formatted salary
- **Action Buttons**: Edit and delete employee with confirmation
- **Responsive Layout**: Single column on mobile, two columns on desktop
- **Breadcrumb Navigation**: Easy navigation back to employee list
- **Employee ID**: Formatted as EMP-XXX pattern

### Employee Dialog (`EmployeeDialog.fragment.xml`)

- **Reusable Fragment**: Used for both adding and editing employees
- **Form Validation**: Real-time validation with error states and messages
- **Responsive Form**: Single column on mobile, optimized for all screen sizes
- **Required Field Indicators**: Visual cues for mandatory fields
- **Department Selection**: ComboBox with predefined departments
- **Type-specific Inputs**: Email and phone inputs with appropriate keyboards
- **Save/Cancel Actions**: Form submission with validation checks

## 🔧 Technical Stack

- **Framework**: SAPUI5 1.136.1
- **Core Libraries**:
  - `sap.ui.core` - Core functionality and base classes
  - `sap.m` - Mobile-first controls and responsive design
  - `sap.f` - Advanced Fiori controls (DynamicPage, Avatar)
- **Routing**: Hash-based routing with `sap.m.routing.Router`
- **Data Binding**: JSON Model with two-way binding and expression binding
- **Internationalization**: ResourceModel with multi-language support (EN/FR)
- **Responsive Design**: Built-in UI5 responsive grid system and adaptive layouts
- **Form Validation**: Custom validation with real-time feedback
- **Styling**: SAP Fiori 3 theme with custom CSS enhancements

## 📁 Project Structure

```text
UI5-Task01/
├── webapp/
│   ├── controller/          # MVC Controllers
│   │   ├── BaseController.js      # Base functionality, dialogs, validation
│   │   ├── App.controller.js      # Main app controller
│   │   ├── EmployeesList.controller.js  # List view, search, CRUD operations
│   │   ├── EmployeeDetail.controller.js # Detail view, edit, delete
│   │   └── NotFound.controller.js # Error handling
│   ├── view/               # XML Views
│   │   ├── App.view.xml           # Main app shell
│   │   ├── EmployeesList.view.xml # Employee list with DynamicPage
│   │   ├── EmployeeDetail.view.xml # Employee detail view
│   │   └── NotFound.view.xml      # 404 error page
│   ├── fragment/           # Reusable UI fragments
│   │   └── EmployeeDialog.fragment.xml # Add/Edit employee dialog
│   ├── model/              # Data models and formatters
│   │   ├── employeeData.json      # 25 employee records
│   │   └── formatter.js           # Data formatting utilities
│   ├── i18n/               # Internationalization
│   │   ├── i18n.properties        # Base text resources
│   │   ├── i18n_en.properties     # English text
│   │   └── i18n_fr.properties     # French text
│   ├── css/                # Custom styles
│   │   └── style.css              # Application-specific CSS
│   ├── Component.js        # Application component
│   ├── manifest.json       # App configuration and metadata
│   └── index.html         # Entry point
├── package.json            # Project dependencies and scripts
├── ui5.yaml               # UI5 tooling configuration
├── ui5-local.yaml         # Local development configuration
└── README.md              # This file
```

## � Data Structure

The application manages employee data with the following structure:

- **25 Employee Records** with mixed departments (IT, Finance, HR, Management)
- **Complete Contact Information** (name, email, phone)
- **Organizational Data** (role, department, salary)
- **Unique IDs** for routing and data management
- **Department Distribution** to avoid clustering by department type

## 📄 Notes

- This project demonstrates modern SAP UI5 development practices
- Implements complete CRUD operations with proper validation
- Features responsive design for all device types
- Uses SAP Fiori design guidelines and patterns
- Includes internationalization for global deployment
- Built for educational and demonstration purposes

---

Built with ❤️ by Ntwali. Powered by SAPUI5
