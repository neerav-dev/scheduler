import { useState, useEffect } from "react";
import axios from "axios";
const useApplicationData = function () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function setSpots(day, days, appointments) {
    const currentDayIndex = days.findIndex((dayName) => dayName.name === day);
    const currentDay = days[currentDayIndex];
    const appointmentIds = currentDay.appointments;

    let spots = 0;

    for (const id of appointmentIds) {
      let appointment = appointments[id];
      !appointment.interview && spots++;
    }

    const newDay = { ...currentDay, spots };
    let newDays = [...days];
    newDays[currentDayIndex] = newDay;
    return newDays;
  }

  const setDay = (day) => setState({ ...state, day });

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      let newDays = setSpots(state.day, state.days, appointments);
      setState({
        ...state,
        appointments,
        days: newDays,
      });
    });
  };

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      let newDays = setSpots(state.day, state.days, appointments);
      setState({
        ...state,
        appointments,
        days: newDays,
      });
    });
  };
  return { state, setDay, bookInterview, cancelInterview };
};
export default useApplicationData;
