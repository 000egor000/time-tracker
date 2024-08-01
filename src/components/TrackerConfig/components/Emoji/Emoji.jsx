import PropTypes from "prop-types";

const Emoji = ({ icon }) => <span>{icon}</span>;

export default Emoji;

Emoji.propTypes = {
  icon: PropTypes.icon.isRequired,
};
