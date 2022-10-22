import { useAppDispatch, useAppSelector } from "@/storage/helpers";
import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { alertActions } from "../../storage/actions";

const NotificationView = () => {
  const alert = useAppSelector((state: any) => state.alert);
  const dispatch = useAppDispatch();
  const handleClose = (event: any, reason: string) => {
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

const mapState = (state: any) => {
  const { alert } = state;
  return { alert };
};

const actionCreators = {
  clearAlerts: alertActions.clear
};

export const Notification =  connect(mapState, actionCreators)(NotificationView);
