import React from 'react';
import ReactDOM from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.jsx';
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
import 'react-clock/dist/Clock.css';
import { HoursProvider } from '../../api/hours/useHours';

// Startup the application by rendering the App layout component.
Meteor.startup(() => {
  const root = ReactDOM.createRoot(
    document.getElementById('root'),
  );
  root.render(<HoursProvider><App /></HoursProvider>);
});
