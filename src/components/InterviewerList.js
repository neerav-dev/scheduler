import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  const interviewerListItemParse = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={props.setInterviewer}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        {interviewerListItemParse}
      </h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
}
