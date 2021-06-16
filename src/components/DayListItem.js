import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

const formatSpot = function (spots) {
  let spotsText = "";

  if (spots === 0) {
    spotsText = "no spots";
  } else {
    if (spots >= 2) {
      spotsText = `${spots} spots`;
    } else {
      spotsText = `${spots} spot`;
    }
  }

  return `${spotsText} remaining`;
};

export default function DayListItem(props) {
  let DayListClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  return (
    <li
      data-testid="day"
      className={DayListClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpot(props.spots)}</h3>
    </li>
  );
}
