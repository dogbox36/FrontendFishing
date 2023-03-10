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
date: Date;
}

export default class ContactPage extends Component<Props, State> {
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

render() {
return (
<div>
<div className="App full-calendar-container">
<FullCalendar ref={this.calendarComponentRef} {...this.calendarProps} />
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
