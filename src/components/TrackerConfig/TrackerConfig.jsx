import { ButtonToolbar, Input, InputGroup, Whisper, Tooltip } from "rsuite";

import {
  OneColumn,
  PauseOutline,
  PlayOutline,
  Paragraph,
  History,
} from "@rsuite/icons";

import styles from "./TrackerConfig.module.scss";
import { tooltipData } from "./const";

import { Emoji } from "./components/Emoji";
import { ButtonWithTooltip } from "./components/ButtonWithTooltip";

const TrackerConfig = () => {
  const { time, description, defaultTime, tooltip } = tooltipData;

  return (
    <div className={styles.groupBtn}>
      <InputGroup className={styles.inputGroup} inside>
        <Input placeholder="Описание" />
        <InputGroup.Addon>
          <Whisper
            placement="top"
            speaker={
              <Tooltip>
                {description} <Emoji icon={<Paragraph />} />
              </Tooltip>
            }
          >
            <Paragraph />
          </Whisper>
        </InputGroup.Addon>
      </InputGroup>

      <InputGroup className={styles.inputGroup} inside>
        <Input placeholder="Время" type="number" defaultValue={defaultTime} />
        <InputGroup.Addon>
          <Whisper
            placement="top"
            speaker={
              <Tooltip>
                {time} <Emoji icon={<History />} />
              </Tooltip>
            }
          >
            <History />
          </Whisper>
        </InputGroup.Addon>
      </InputGroup>

      <ButtonToolbar className={styles.ButtonToolbar}>
        <ButtonWithTooltip icon={<OneColumn />} tooltip={tooltip.STOP} />
        <ButtonWithTooltip icon={<PauseOutline />} tooltip={tooltip.PAUSE} />
        <ButtonWithTooltip icon={<PlayOutline />} tooltip={tooltip.START} />
      </ButtonToolbar>
    </div>
  );
};

export default TrackerConfig;
