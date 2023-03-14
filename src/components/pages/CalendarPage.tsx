import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import huLocale from '@fullcalendar/core/locales/hu';
import events from "../events";
import ProfilePage from '../ProfilePage';
import '../Sidebar.css';

interface Props {
authToken: string;
onLogout: () => Promise<void>;
}

interface State {}

interface Event {
id: number;
title: string;
start: Date;
end: Date;
}

export default class CalendarPage extends Component<Props, State> {
calendarComponentRef = React.createRef<FullCalendar>();

handleDatesSet = () => {
const calendarApi = this.calendarComponentRef.current?.getApi();
const start = calendarApi?.view?.currentStart.toISOString();
const end = calendarApi?.view?.currentEnd.toISOString();

fetch('http://localhost:3000/events', {
    headers: {
      'Authorization': `Bearer ${this.props.authToken}`
    }
  })
    .then(res => res.json())
    .then(data => {
      const events = data.map((event: any) => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
      }));
      calendarApi?.removeAllEvents();
      calendarApi?.addEventSource(events);
    })
    .catch(error => console.error(error));
  
  }

  handleLogout = async () => {
  await this.props.onLogout();
  }
  
  calendarProps = {
  defaultView: "dayGridMonth",
  header: {
  left: "prev,next",
  center: "title",
  right: "dayGridMonth,timeGridWeek,timeGridDay",
  },
  themeSystem: "simple",
  plugins: [dayGridPlugin],
  events: events as unknown as EventInput[],
  locale: huLocale,
  datesSet: this.handleDatesSet,
  };
  
  handleAddEvent = () => {
  // TODO: implement event creation UI
  }
  
  handleCreateEvent = () => {
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const start = (document.getElementById('start') as HTMLInputElement).value;
    const end = (document.getElementById('end') as HTMLInputElement).value;
  
    fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.props.authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, start, end }),
    })
      .then(res => res.json())
      .then(data => {
        const newEvent = {
          id: data.id,
          title: data.title,
          start: new Date(data.start),
          end: new Date(data.end),
        };
        const calendarApi = this.calendarComponentRef.current?.getApi();
        calendarApi?.addEvent(newEvent);
      })
      .catch(error => console.error(error));
  }
  

  render() {
  return (
  <div>
  <div className="App full-calendar-container">
  <FullCalendar ref={this.calendarComponentRef} {...this.calendarProps} />
  <div className="add-event-form">
  <label htmlFor="title">Cím:</label>
  <input type="text" id="title" name="title" />

  <label htmlFor="start">Kezdés:</label>
        <input type="datetime-local" id="start" name="start" />


<label htmlFor="end">Vége:</label>
<input type="datetime-local" id="end" name="end" />

<button onClick={this.handleCreateEvent}>Létrehozás</button>
</div>


</div>
<div>
<button className="logoutbutton" onClick={this.handleLogout}>Logout</button>
</div>
<div>
<ProfilePage authToken={this.props.authToken} onLogout={this.props.onLogout} />
</div>
</div>
);
}
}
