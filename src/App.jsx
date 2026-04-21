import { Container, Typography, Box, Paper } from "@mui/material";
import ChatBox from "./components/chat/ChatBox";
import { useWebSocket } from "./hooks/useWebSocket";

function App() {
  const { status, messages, send } = useWebSocket();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Anonymous Chat
        </Typography>

        {/* Chat Container */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            height: "70vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ChatBox status={status} messages={messages} send={send} />
        </Paper>
      </Box>
    </Container>
  );
}

export default App;