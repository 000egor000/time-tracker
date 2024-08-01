import { Button, Whisper, Tooltip } from "rsuite";
import PropTypes from "prop-types";

const TimerButton = ({ icon, tooltip, disabled, onClick, appearance }) => {
  return (
    <Whisper placement="right" speaker={<Tooltip>{tooltip}</Tooltip>}>
      <Button appearance={appearance} onClick={onClick} disabled={disabled}>
        {icon}
      </Button>
    </Whisper>
  );
};

TimerButton.propTypes = {
  icon: PropTypes.element.isRequired,
  tooltip: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  appearance: PropTypes.string.isRequired,
};

export default TimerButton;
