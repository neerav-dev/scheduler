export function selectUserByName(state, name) {
  const filteredNames = state.users.filter((user) => user.name === name);
  return filteredNames;
}

export function getAppointmentsForDay(state, day) {
  if (state.length === 0) {
    return [];
  } else {
    const filteredAppointment = state.days.filter(
      (currentDay) => currentDay.name === day
    );

    if (filteredAppointment.length === 0) {
      return [];
    }

    const appointmentIds = filteredAppointment[0].appointments;
    const appointments = appointmentIds.map((id) => state.appointments[id]);

    return appointments;
  }
}
