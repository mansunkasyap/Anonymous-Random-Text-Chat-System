// src/services/socketService.js

let socket = null;

export const connectSocket = (url) => {
  socket = new WebSocket(url);
  return socket;
};

export const getSocket = () => socket;

export const sendMessage = (data) => {
  console.log(data, "datadata");
  
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  }
};