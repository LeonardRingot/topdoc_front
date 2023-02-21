import React, { useState, useEffect } from "react";
import * as ServiceAPI from '../../services/ServiceAPI'
import styles from "../../styles/Home.module.css"
import moment from "moment";

export default function Calendrier()
{
    const [loading, setLoading] = useState(true);
  let [planningData, setPlanningData] = useState(null);
  const [date, setDate] = useState(moment());
  useEffect(() => {
    setLoading(true);
    ServiceAPI.requeteGetPlanning()
      .then((response) => {
        if (response.status === 200 && response.data.length > 0) {
            console.log(response.data)
          setPlanningData(response.data);
          setDate(moment(response.data[0].jour));
          setLoading(false);
        }
      })
  }, []);
  function prevWeek() {
    setDate((prevDate) => prevDate.subtract(1, "week"));
  }

  function nextWeek() {
    setDate((prevDate) => prevDate.add(1, "week"));
  }
  function renderDays() {
    const days = [];
    const startDate = date.clone().startOf("week");
  
    for (let i = 0; i < 7; i++) {
      const day = startDate.clone().add(i, "day");
      let startHour = "";
      let endHour = "";
  
      // Find the planning data for the current day
      const dayData = planningData.find((item) => item.jour === day.format("YYYY-MM-DD"));
  
      // If the planning data for the day is found, get the start and end hours
      if (dayData) {
        const creneau = dayData.creneaux.find((creneau) => creneau.day === day.format("dddd"));
        if (creneau) {
          startHour = creneau.StartHour;
          endHour = creneau.EndHour;
         
        }
      }
  
      days.push(
        <div className="col cell" key={day.format("YYYY-MM-DD")}>
          <div className="calendar-day">{day.format("ddd")}</div>
          <div className="calendar-date">{day.format("DD")}</div>
          <div className="calendar-hours">
            <div>{startHour}</div>
            <div>{endHour}</div>
          </div>
        </div>
      );
    }
  
    return <div className="row week">{days}</div>;
  }
  function renderEvents() {
    const events = [];
    planningData.forEach((event) => {
      event.creneaux.forEach((creneau) => {
        const eventStart = moment(creneau.StartHour, "HH:mm");
        const eventEnd = moment(creneau.EndHour, "HH:mm");
        if (event.jour === date.format("YYYY-MM-DD") && eventStart.isValid() && eventEnd.isValid()) {
          const eventDuration = eventEnd.diff(eventStart, "minutes");
          const eventTop = eventStart.diff(moment().startOf("day"), "minutes");
          events.push(
            <div
              className="calendar-event"
              key={event.id}
              style={{ top: eventTop, height: eventDuration }}
            >
              {event.title}
            </div>
          );
        }
      });
    });
    return <div className="calendar-events">{events}</div>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevWeek}>Prev</button>
        <h2>{date.format("MMMM YYYY")}</h2>
        <button onClick={nextWeek}>Next</button>
      </div>
      {renderDays()}
      {renderEvents()}
    </div>
  );
}