import { ButtonToolbar, Input, InputGroup, Whisper, Tooltip } from "rsuite";

import {
  OneColumn,
  PauseOutline,
  PlayOutline,
  Paragraph,
  History,
} from "@rsuite/icons";

import { staticData } from "./const";
import style from "./ControlTimer.module.scss";
import { useMessage } from "../../hooks/useMessage";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { TimerButton } from "./components/TimerButton";

function ControlTimer({ params, onChange, editTimer }) {
  const {
    minutesToSeconds,
    timeInterval,
    tooltipText: { timeT, descriptionT, startT, pauseT, stopT },
    timerState: { PLAY, PAUSE, STOP },
  } = staticData;

  const { id, timer, description, status, isActive, seconds } = params;
  const idForLocal = `time_id=${id}`;

  const { goToPush } = useMessage();

  const updateParams = (newParams) => {
    onChange((val) => {
      return val.map((item) => {
        if (item.id === id) {
          return { ...item, ...newParams };
        }
        return item;
      });
    });
  };

  const handleTimerEvent = (event) => () => {
    goToPush(`по таймеру ${id} произошло событие ${event}!`);

    const result = { status: event };

    switch (event) {
      case PLAY:
        result.dataStart = new Date();
        result.isActive = true;
        break;
      case PAUSE:
        result.isActive = false;
        break;
      case STOP:
        result.dataEnd = new Date();
        result.isActive = false;
        localStorage.removeItem(idForLocal);
        break;
      default:
        break;
    }

    updateParams(result);
    editTimer({ ...params, ...result }, id);
  };

  /**
   * Control timer seconds
   */
  const controlSecond = () => {
    const timerValue = localStorage.getItem(idForLocal);

    if (timerValue && status === PLAY) {
      const timerValueNumber = +JSON.parse(timerValue);
      const newTimerValue = timerValueNumber + 1;
      localStorage.setItem(idForLocal, JSON.stringify(newTimerValue));
      updateParams({ seconds: newTimerValue });
    }
  };

  useEffect(() => {
    controlSecond();
  }, []);

  useEffect(() => {
    if (seconds >= +timer * minutesToSeconds && status) {
      handleTimerEvent(STOP)();
    }
  }, [params]);

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setTimeout(() => {
        updateParams({ seconds: seconds + 1 });
        localStorage.setItem(idForLocal, JSON.stringify(seconds + 1));
      }, timeInterval);
    }
    return () => clearInterval(intervalId);
  }, [seconds, isActive]);

  const handleChange = (key) => (value) => {
    updateParams({ [key]: value || "" });
  };

  const getDisabled = {
    params: status !== null,
    events: (key) => {
      return [key, key === PLAY ? status === PLAY : null].includes(status);
    },
  };

  const getAppearance = (key) => (status === key ? "primary" : "default");

  return (
    <div className={style.groupBtn}>
      <InputGroup inside className={style.InputGroup}>
        <Input
          placeholder="Описание"
          value={description}
          onChange={handleChange("description")}
          disabled={getDisabled.params}
        />
        <InputGroup.Addon>
          <Whisper
            placement="top"
            speaker={<Tooltip>{descriptionT}&#x1F60E;</Tooltip>}
          >
            <Paragraph />
          </Whisper>
        </InputGroup.Addon>
      </InputGroup>

      <InputGroup inside>
        <Input
          placeholder="Время"
          type="number"
          min={0}
          value={timer}
          onChange={handleChange("timer")}
          disabled={getDisabled.params}
        />
        <InputGroup.Addon>
          <Whisper
            placement="top"
            speaker={<Tooltip>{timeT}&#x1F603;</Tooltip>}
          >
            <History />
          </Whisper>
        </InputGroup.Addon>
      </InputGroup>

      <ButtonToolbar className={style.ButtonToolbar}>
        <TimerButton
          icon={<PlayOutline />}
          tooltip={startT}
          appearance={getAppearance(PLAY)}
          onClick={handleTimerEvent(PLAY)}
          disabled={getDisabled.events(PLAY)}
        />
        <TimerButton
          icon={<PauseOutline />}
          tooltip={pauseT}
          appearance={getAppearance(PAUSE)}
          onClick={handleTimerEvent(PAUSE)}
          disabled={getDisabled.events(PAUSE)}
        />
        <TimerButton
          icon={<OneColumn />}
          tooltip={stopT}
          appearance={getAppearance(STOP)}
          onClick={handleTimerEvent(STOP)}
          disabled={getDisabled.events(STOP)}
        />
      </ButtonToolbar>
    </div>
  );
}

ControlTimer.propTypes = {
  params: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  editTimer: PropTypes.func.isRequired,
};

export default ControlTimer;
