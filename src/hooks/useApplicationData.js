import { useState, useEffect } from "react";
import axios from "axios";
function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function setSpots(operation) {
    const daysArr = [...state.days];
    const currentDay = daysArr.filter((day) => day.name === state.day);
    const appointment = currentDay[0].appointments.map(
      (id) => state.appointments[id]
    );
    let spots = appointment.filter((t) => t.interview === null).length;

    // increment or decrement spots depending on operation
    if (operation === "PUT") {
      spots = spots - 1;
    } else if (operation === "DELETE") {
      spots = spots + 1;
    }

    //update the spots in copy of days array
    daysArr.forEach((day) => {
      if (day.id === currentDay[0].id) {
        day.spots = spots;
      } else {
      }
    });

    setState((prev) => ({
      ...prev,
      days: daysArr,
    }));
  }

  const setDay = (day) => setState({ ...state, day });

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((result) => {
        setState({
          ...state,
          appointments,
        });
        setSpots("DELETE");
      });
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((result) => {
        setState({
          ...state,
          appointments,
        });
        setSpots("PUT");
      });
  }
  return { state, setDay, bookInterview, cancelInterview };
}
export default useApplicationData;
