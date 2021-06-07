import React from "react";
import classNames from "classnames";
import "components/Button.scss";
import DayListItem from "components/DayListItem";

export default function Button(props) {
  const { days, day, setDay } = props;
  let buttonClass = classNames({
    button: true,
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  const dayListItemParse = days.map((day, index) => {
    return (
      <DayListItem
        key={index}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{dayListItemParse}</ul>;
}
