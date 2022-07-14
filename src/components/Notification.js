import { connect } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = (props) => {
  const notification = props.notification;
  if (notification === null) return null;

  return <Alert variant={notification.type}>{notification.msg}</Alert>;
};

export default connect((state) => ({ notification: state.notification }))(
  Notification
);
