import PropTypes from "prop-types";
import { Button, Whisper, Tooltip } from "rsuite";

const ButtonWithTooltip = ({
  icon,
  tooltip,
  onClick,
  appearance = "default",
}) => (
  <Whisper placement="auto" speaker={<Tooltip>{tooltip}</Tooltip>}>
    <Button appearance={appearance} onClick={onClick}>
      {icon}
    </Button>
  </Whisper>
);

export default ButtonWithTooltip;

ButtonWithTooltip.propTypes = {
  icon: PropTypes.element,
  tooltip: PropTypes.string,
  appearance: PropTypes.string,
  onClick: PropTypes.func,
};
