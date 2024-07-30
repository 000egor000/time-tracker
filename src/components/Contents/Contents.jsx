import { useMemo, useState, useEffect, useCallback } from "react";
import { ControlTimer } from "../ControlTimer";
import { AddTracker } from "../AddTracker";
import { TimerView } from "../TimerView";
import { TimerList } from "../TimerList";
import styles from "./Contents.module.scss";
import { fetchTimers, createTimer, updateTimer } from "../../base";
import PropTypes from "prop-types";

function Contents({ currentView }) {
  const [timers, setTimers] = useState([]);

  const loadTimers = async () => {
    const data = await fetchTimers();
    setTimers(data);
  };

  const createNewTimer = async (params) => {
    await createTimer(params);

    setTimers((val) => [...val, { ...params, id: timers.length + 1 }]);
  };

  const editTimer = async (params, id) => {
    await updateTimer(params, id);
  };

  useEffect(() => {
    loadTimers();
  }, []);

  const archivedTimers = useMemo(() => {
    const result = timers
      .filter((timer) => timer.status === "stop")
      .reduce((acc, current) => {
        const date = new Date(current.dataStart).toISOString().split("T")[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(current);
        return acc;
      }, {});

    return Object.entries(result);
  }, [timers]);

  const styleViews = useCallback(
    (key) => {
      switch (currentView) {
        case "all":
          return { height: "50%" };
        case key:
          return { height: "100%" };
        default:
          return { display: "none" };
      }
    },
    [currentView]
  );

  return (
    <div className={styles.contents}>
      <div className={styles.controlTimer} style={styleViews("gear")}>
        {timers?.map(
          (timer) =>
            timer.status !== "stop" && (
              <div key={timer.id} className={styles.itemTracer}>
                <ControlTimer
                  params={timer}
                  onChange={setTimers}
                  editTimer={editTimer}
                />
                <TimerView params={timer} onChange={setTimers} />
              </div>
            )
        )}

        <AddTracker
          params={timers}
          onChange={setTimers}
          createTimer={createNewTimer}
        />
      </div>

      <div className={styles.listTimer} style={styleViews("list")}>
        <TimerList archive={archivedTimers} />
      </div>
    </div>
  );
}

Contents.propTypes = {
  currentView: PropTypes.string.isRequired,
};

export default Contents;
