import { Box, Chip, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

import { STATUS } from "../../utils/constants";

const StatusBar = ({ status }) => {

  const getStatusConfig = () => {
    switch (status) {
      case STATUS.CONNECTED:
        return {
          label: "Connected",
          color: "success",
          icon: <CheckCircleIcon />
        };
      case STATUS.SEARCHING:
        return {
          label: "Searching...",
          color: "warning",
          icon: <SearchIcon />
        };
      case STATUS.DISCONNECTED:
        return {
          label: "Disconnected",
          color: "error",
          icon: <CancelIcon />
        };
      case STATUS.IDLE:
      default:
        return {
          label: "Idle",
          color: "default",
          icon: <PauseCircleIcon />
        };
    }
  };

  const { label, color, icon } = getStatusConfig();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
      <Chip
        label={
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {icon} {label}
          </Typography>
        }
        color={color}
        variant="outlined"
      />
    </Box>
  );
};

export default StatusBar;