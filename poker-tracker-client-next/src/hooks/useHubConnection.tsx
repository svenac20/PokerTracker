import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useState, useEffect } from "react";

export default function useHubConnection() {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_SIGNAL_R_URL}`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    setConnection(connect);
    connect
      .start()
      .then(() => {})
      .catch((err) =>
        console.error("Error while connecting to SignalR Hub:", err),
      );

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  return { connection };
}
