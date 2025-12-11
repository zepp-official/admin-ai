# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **Appsmith low-code application** repository. Appsmith applications are built using a declarative JSON-based structure with JavaScript for business logic. The application is deployed and can be edited through the Appsmith platform.

**Application Name:** Admin AI
**Platform:** Appsmith (https://appsmith.com)
**Application Type:** Single-page application with canvas-based layout
**Live Application:** https://lp.appsmith.com/applications/6911372352f60b7cd8aa9394/pages/6911372352f60b7cd8aa9396

## Architecture

### Directory Structure

```
admin-ai/
├── application.json          # App-level configuration, pages, theme settings
├── metadata.json            # Schema versioning (client v2, server v12, format v5)
├── theme.json              # UI theme configuration (Modern theme)
├── pages/
│   └── Page1/              # Single page application
│       ├── Page1.json      # Page layout and canvas DSL
│       ├── jsobjects/      # JavaScript business logic
│       │   └── JSObject1/
│       │       ├── JSObject1.js      # JS object with functions and variables
│       │       └── metadata.json     # JS object configuration
│       └── queries/        # Query metadata wrapping JS functions
│           ├── JSObject1-myFun1/
│           └── JSObject1-myFun2/
```

### Key Architectural Concepts

1. **Canvas-Based Layout**: The application uses a fixed-position canvas (4896x124 grid) where widgets are positioned. Widget configurations are stored in the `dsl` section of `Page1.json`.

2. **JS Objects**: Business logic is written in JS objects (located in `jsobjects/`). Each JS object can contain:
   - Variables (state management): `myVar1`, `myVar2`, etc.
   - Functions (sync or async): `myFun1()`, `async myFun2()`, etc.
   - Functions are referenced as `JSObject1.myFun1.data` in widgets

3. **Queries**: Each JS object function gets a corresponding query configuration in `queries/`. These define:
   - Execution mode (client-side vs server-side)
   - Trigger behavior (MANUAL vs ON_PAGE_LOAD)
   - Timeout settings (default 10 seconds)
   - Arguments and pagination

4. **Client-Side Execution**: All JS functions in this app run client-side in the browser, not on the Appsmith server.

## Development Workflow

### Making Changes

Since this is an Appsmith application, changes are typically made through the Appsmith UI editor, but you can also edit the JSON/JS files directly:

1. **Editing JS Logic**: Modify `pages/Page1/jsobjects/JSObject1/JSObject1.js`
   - Use `this.myVar1` to access variables
   - Use `await storeValue('key', value)` for persistent storage
   - Access other queries/APIs via their names (e.g., `Api1.run()`)

2. **Adding Widgets**: Edit the `dsl` section in `pages/Page1/Page1.json`
   - Widgets must be added to the canvas with proper grid positioning
   - Each widget needs: type, widgetId, widgetName, leftColumn, rightColumn, topRow, bottomRow

3. **Configuration Changes**: Edit `application.json` for:
   - Navigation settings
   - Theme settings (density, sizing, max width)
   - Adding new pages

### Git Workflow

- Main branch: `master`
- Commit changes with descriptive messages
- Appsmith automatically syncs with this Git repository

## Appsmith-Specific Patterns

### Accessing Data in JS Objects

```javascript
export default {
  myVar: [],
  myFunction() {
    // Access own variables
    this.myVar = [1, 2, 3];

    // Access other widgets
    Table1.selectedRow

    // Access queries
    Api1.data
    Query1.run()

    // Appsmith framework functions
    showAlert('message', 'success')
    storeValue('key', value)
    navigateTo('PageName')
  }
}
```

### Widget-to-JS Binding

In widget properties, use mustache syntax `{{}}`:
- `{{JSObject1.myFun1()}}` - Execute function
- `{{JSObject1.myFun1.data}}` - Access function result
- `{{JSObject1.myVar1}}` - Access variable

### Function Execution Modes

- **MANUAL**: Function runs when explicitly called (button onClick, etc.)
- **ON_PAGE_LOAD**: Function runs automatically when page loads
- Edit `metadata.json` in the query folder to change execution mode

## Current Implementation Status

The application is in early development:
- Canvas is configured but no widgets are deployed yet
- JSObject1 has template functions (`myFun1`, `myFun2`) without implementation
- No external datasources (APIs, databases) are connected
- Single page application (Page1 is the only page)

## Important Notes

- **Schema Version**: Client v2, Server v12, File Format v5 - maintain compatibility when editing
- **Grid System**: Canvas uses 64 columns x 124 rows snap grid
- **Timeout**: All functions have a 10-second execution timeout
- **No External Datasources**: Currently no APIs or databases configured
- **Positioning**: Using FIXED positioning mode (not responsive/auto layout)
