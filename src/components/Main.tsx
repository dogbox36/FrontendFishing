import React from "react";

import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

import './style.css';
import events from "./events";

export default function App(): JSX.Element {

  const calendarProps = {
    defaultView: "dayGridMonth",
    header: {
      left: "prev,next",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },
    themeSystem: "Simplex",
    plugins: [dayGridPlugin],
    events: events
  };


  const containerStyle = {
    maxWidth: "40%",
    maxHeight: "25%",
  };

  return (
    <div className="App" style={containerStyle}>
      <FullCalendar {...calendarProps} />
    </div>
  );
}
