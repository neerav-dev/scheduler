# Interview Scheduler

React application that allows users to book and cancel interviews. We combine a concise API with a WebSocket server to build a realtime experience.

## Live Demo

Please visit [Scheduler App](https://scheduler-app-lhl.netlify.app/).

##### (backend is hosted on heroku that fall asleep so might have to wait 30secs. until it wakes up)

## Screenshots

!["Screenshot <name>"]('#')

## Technical Specifications

- React
- Webpack, Babel
- Axios, WebSockets
- Storybook, Webpack Dev Server, Jest, Testing Library

The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

https://scheduler-app-lhl.netlify.app/
