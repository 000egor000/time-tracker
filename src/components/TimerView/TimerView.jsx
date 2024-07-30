import styles from "./TimerView.module.scss";
import { secondsToMilliseconds } from "./const";
import moment from "moment";
import PropTypes from "prop-types";
import { useMemo } from "react";

const TimerView = ({ params: { seconds } }) => {
  const timeParts = useMemo(() => {
    const momentTime = moment.utc(seconds * secondsToMilliseconds);
    return {
      hours: momentTime.format("H"),
      minutes: momentTime.format("mm"),
      seconds: momentTime.format("ss"),
    };
  }, [seconds]);

  return (
    <div className={styles.timerTime}>
      <span className={styles.timerHours}>{timeParts.hours}</span>
      <span className={styles.timerSeparator}>:</span>
      <span className={styles.timerMinutes}>{timeParts.minutes}</span>
      <span className={styles.timerSeparator}>:</span>
      <span className={styles.timerSeconds}>{timeParts.seconds}</span>
    </div>
  );
};

TimerView.propTypes = {
  params: PropTypes.shape({
    seconds: PropTypes.number.isRequired,
  }).isRequired,
};

export default TimerView;
