import { useState } from "react";
import { Box, TextField, IconButton, Typography, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MessageInput = ({ onSend, disabled }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
      <TextField
        fullWidth
        size="small"
        placeholder={
          disabled ? "Connect to start chatting..." : "Type a message..."
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <IconButton
        color="primary"
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        sx={{
          backgroundColor: disabled ? "#e0e0e0" : "#1976d2",
          color: "white",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
          borderRadius: 2,
          px: 1.5
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInput;