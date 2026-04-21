import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { SENDER } from "../../utils/constants";

const MessageList = ({ messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 1 }}>
      {messages.map((msg, index) => {

        
        const isOwn = msg.sender === SENDER.YOU;

        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: isOwn ? "flex-end" : "flex-start",
            }}
          >
            <Paper
              elevation={2}
              sx={{
                px: 2,
                py: 1,
                maxWidth: "70%",
                backgroundColor: isOwn ? "#1976d2" : "#f1f1f1",
                color: isOwn ? "white" : "black",
                borderRadius: 2,
              }}
            >
              <Typography variant="body2">
                {msg.text}
              </Typography>
            </Paper>
          </Box>
        );
      })}

      <div ref={bottomRef} />
    </Box>
  );
};

export default MessageList;