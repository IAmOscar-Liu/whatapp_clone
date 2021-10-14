import React, { useContext, createContext, useState, useEffect } from "react";
import io from "socket.io-client";

interface ContextProps {
  socket: SocketIOClient.Socket | null;
}

const SocketContext = createContext<ContextProps>({
  socket: null,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({
  id,
  children,
}: {
  id: string;
  children: JSX.Element;
}) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", { query: { id } });

    setSocket(newSocket);

    return () => { newSocket.close() };
  }, [id]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
