import { Alert, Snackbar } from "@mui/material";
import { connect, useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../storage/actions";

const Notification = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(alertActions.clear());
  };
  return (
    <Snackbar
      open={Boolean(alert.show)}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert severity="success" sx={{ width: "100%" }}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

const mapState = (state) => {
  const { alert } = state;
  return { alert };
};

const actionCreators = {
  clearAlerts: alertActions.clear
};

export default connect(mapState, actionCreators)(Notification);
