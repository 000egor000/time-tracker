import { Button, Whisper, Tooltip } from "rsuite";
import PropTypes from "prop-types";
import { Plus } from "@rsuite/icons";

import { useMessage } from "../../hooks/useMessage";
import { defaultAddTimer } from "./const";
import { useMemo } from "react";
import style from "./AddTracker.module.scss";

function AddTracker({ params, createTimer }) {
  const { goToPush } = useMessage();

  const isAdd = useMemo(
    () => params?.every((el) => el.status !== null),
    [params]
  );

  const newTimer = () => {
    if (!isAdd && !!params?.length) {
      goToPush("Для начала поменяете статус в ранее добавленных!");
      return;
    }

    createTimer(defaultAddTimer);
  };

  return (
    <div className={style.addTracker}>
      <Whisper placement="right" speaker={<Tooltip>Добавить таймер</Tooltip>}>
        <Button appearance="default" onClick={newTimer}>
          <Plus />
        </Button>
      </Whisper>
    </div>
  );
}

export default AddTracker;

AddTracker.propTypes = {
  params: PropTypes.array,
  createTimer: PropTypes.func,
};
