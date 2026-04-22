import {
  Box,
  Button,
  Typography,
  Stack,
  Divider,
  Chip
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RefreshIcon from "@mui/icons-material/Refresh";
import ChatIcon from "@mui/icons-material/Chat";

import StatusBar from "./StatusBar";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { EVENTS, STATUS } from "../../utils/constants";

const ChatBox = ({ status, messages, send }) => {
  console.log(status, "status");

  const startChat = () => {
    send({ type: EVENTS.START });
  };

  const sendMsg = (msg) => {
    send({ type: EVENTS.MESSAGE, message: msg });
  };

  const skipChat = () => {
    send({ type: EVENTS.SKIP });
  };

  const getConnectionStatus = () => {
    switch (status) {
      case STATUS.CONNECTED:
      case STATUS.SEARCHING:
        return { label: "Online", color: "success" };

      case STATUS.DISCONNECTED:
        return { label: "Offline", color: "error" };

      case STATUS.IDLE:
      default:
        return { label: "Offline", color: "default" };
    }
  };

  const { label, color } = getConnectionStatus();

  return (
    <Box sx={{ position: "relative", height: "100%" }}>

      <Chip
        label={label}
        color={color}
        size="small"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          fontWeight: 500,
          paddingLeft: 1,
          "&::before": {
            content: '""',
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "currentColor",
            display: "inline-block",
            marginRight: 1
          }
        }}
      />

      {/* Main Layout */}
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>

        {/* Status Bar */}
        {status !== STATUS.IDLE && <StatusBar status={status} />}
        {status !== STATUS.IDLE && <Divider sx={{ my: 1 }} />}

        {/* Top Section */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>

          {/* Idle */}
          {status === STATUS.IDLE && (
            <Stack spacing={2} alignItems="center" justifyContent="center" flex={1}>
              <ChatIcon sx={{ fontSize: 60, color: "gray" }} />
              <Typography variant="h6">Anonymous Chat</Typography>
              <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                onClick={startChat}
              >
                Connect
              </Button>
            </Stack>
          )}

          {/* Searching */}
          {status === STATUS.SEARCHING && (
            <Stack spacing={2} alignItems="center" justifyContent="center" flex={1}>
              <Chip label="Searching for partner..." color="warning" />
              <Typography variant="body2" color="text.secondary">
                Please wait while we find someone for you
              </Typography>
            </Stack>
          )}

          {/* Connected */}
          {status === STATUS.CONNECTED && (
            <Box sx={{ flex: 1, overflowY: "auto", mb: 1 }}>
              <MessageList messages={messages} />
            </Box>
          )}

          {/* Disconnected */}
          {status === STATUS.DISCONNECTED && (
            <Stack spacing={2} alignItems="center" justifyContent="center" flex={1}>
              <Typography variant="h6" color="error">
                Disconnected
              </Typography>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={startChat}
              >
                Reconnect
              </Button>
            </Stack>
          )}
        </Box>

        {/* Input */}
        {status !== STATUS.IDLE && (
          <MessageInput
            onSend={sendMsg}
            disabled={status !== STATUS.CONNECTED}
          />
        )}

        {/* Controls */}
        {/* {status === STATUS.CONNECTED && (
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<SkipNextIcon />}
              onClick={skipChat}
            >
              Skip This Chat
            </Button>
          </Stack>
        )} */}


        {status === STATUS.CONNECTED && (
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>

            {/* Skip */}
            <Button
              fullWidth
              variant="outlined"
              color="warning"
              startIcon={<SkipNextIcon />}
              onClick={skipChat}
            >
              Skip
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<RefreshIcon />}
              onClick={() => send({ type: EVENTS.END })}
            >
              End Chat
            </Button>

          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default ChatBox;