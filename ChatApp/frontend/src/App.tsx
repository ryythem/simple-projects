import { useEffect, useRef, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  //@ts-ignore
  const wsRef = useRef();

  useEffect(() => {
    const ws = new WebSocket("http://localhost:8000");
    ws.onmessage = (event) => {
      //@ts-ignore
      setMessages((m) => [...m, event.data]);
    };
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );
    };

    return () => {
      ws.close();
    };
  }, []);
  return (
    <div className="h-screen bg-black flex justify-center items-center">
      <div className="flex flex-col justify-center items-center rounded-xl">
        <div>
          {messages.map((m) => (
            <div className="text-white">{m}</div>
          ))}
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            className="bg-white"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            onClick={() => {
              //@ts-ignore
              wsRef.current.send(
                JSON.stringify({
                  type: "chat",
                  payload: {
                    message: message,
                  },
                })
              );
            }}
            className="text-white bg-purple"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
