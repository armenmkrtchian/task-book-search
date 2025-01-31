# TaskBookSearch

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.1.
This repository contains an Angular project that implements a typeahead search feature with search optimizations, virtual scrolling, and state management using NgRx. The project fetches data from a public API and provides a seamless user experience with efficient rendering and query management.

## Features

**Typeahead Search:** Implements a search bar with debounce and switchMap to optimize API calls.

**Virtual Scrolling:** Uses Angular's CDK Virtual Scroller to render large datasets efficiently.

**Batch-Based Pagination:** Loads data in batches to improve performance.

**NgRx Store:** Saves meaningful search queries in the store and suggests past queries for subsequent searches.

**Optimized Query Management:** Stores only queries that trigger results and breaks down words for better suggestions.

## Technologies Used

**Angular:** Frontend framework.

**NgRx:** State management (actions, effects, reducers, selectors).

**RxJS:** Reactive programming for handling asynchronous operations.

**Angular CDK Virtual Scroller:** Efficient rendering of large lists.

**Public API:** Fetches data based on user queries.

## Setup Instructions

**Install Dependencies:**

```bash
npm install
```

**Run the Application:**

```bash
ng serve
```

**To start a local development server, run**:

```bash
ng serve
```

**Running unit tests**

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Key Implementation Details

### Typeahead Search
**Debounce**: Reduces the number of API calls by waiting for a pause in typing.

**switchMap**: Cancels previous API calls if a new query is entered.

### Virtual Scrolling
**Angular CDK Virtual Scroller:** Efficiently renders only the visible items in the list, improving performance for large datasets.

### NgRx Store
**Actions**: Define actions for saving queries and fetching results.

**Effects**: Handle side effects like API calls.

**Reducers**: Manage state changes based on actions.

**Selectors**: Retrieve data from the store efficiently.

### Services and Interceptors
**SearchService**: Handles API calls.

### Video Demonstration

A short video demonstrating the solution is included in the repository. Watch it to see the application in action.

### Notes
- The project avoids using AI tools like ChatGPT for code generation.

- Code is cleaned up and optimized for readability and performance.

- The task was completed within the 2-day timeframe.
