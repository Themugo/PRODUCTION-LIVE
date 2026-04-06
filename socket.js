import { Server } from "socket.io";

let io;

export default function handler(req, res) {
  if (!res.socket.server.io) {
    io = new Server(res.socket.server);
    res.socket.server.io = io;

    let devices = [];

    io.on("connection", socket => {
      console.log("Client connected");
      socket.emit("devices-update", devices);

      socket.on("add-device", d => {
        devices.push(d);
        io.emit("devices-update", devices);
      });

      socket.on("remove-device", id => {
        devices = devices.filter(x => x.id !== id);
        io.emit("devices-update", devices);
      });

      socket.on("disconnect", () => console.log("Client disconnected"));
    });
  }
  res.end();
}
