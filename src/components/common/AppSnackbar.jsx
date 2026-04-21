import { Snackbar, Alert } from "@mui/material";

const AppSnackbar = ({
  open,
  message,
  severity = "info",
  duration = 3000,
  onClose
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={onClose}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;