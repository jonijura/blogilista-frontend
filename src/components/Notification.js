import { connect } from "react-redux";

const Notification = (props) => {
  const notification = props.notification;
  if (notification.length === 0) return;

  return (
    <div className={`notification ${notification.type}`}>
      {notification.msg}
    </div>
  );
};

export default connect((state) => ({ notification: state.notification }))(
  Notification
);
