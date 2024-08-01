import React from "react";
import style from "./TimerList.module.scss";
import moment from "moment";
import PropTypes from "prop-types";

function TimerList({ archive }) {
  const blockContent = (date, array) => {
    const itemDate = ({ dataStart, dataEnd, description, seconds }, index) => {
      const dateValue = {
        start: moment(dataStart).format("MMMM Do YYYY, h:mm:ss a"),
        end: moment(dataEnd).format("MMMM Do YYYY, h:mm:ss a"),
        range: moment.utc(seconds * 1000).format("HH:mm:ss"),
      };

      return (
        <ul>
          <li>{index + 1}</li>
          <li>
            <span>Дата/время старта: </span>
            {dateValue.start}
          </li>
          <li>
            <span>Дата/время окончания: </span>
            {dateValue.end}
          </li>
          <li>
            <span>Длительность: </span>
            {dateValue.range}
          </li>
          <li>
            <span>Описание: </span>
            {description || "-"}
          </li>
        </ul>
      );
    };

    return (
      <>
        <p>{date}</p>
        {array?.map((el, i) => (
          <React.Fragment key={el.id}>{itemDate(el, i)}</React.Fragment>
        ))}
      </>
    );
  };

  return !!archive?.length ? (
    archive.map(([date, array]) => (
      <div className={style.groupItemDate} key={date}>
        {blockContent(date, array)}
      </div>
    ))
  ) : (
    <p className={style.emptyList}>Список завершенных таймеров пуст!</p>
  );
}

export default TimerList;

TimerList.propTypes = {
  archive: PropTypes.array,
};
