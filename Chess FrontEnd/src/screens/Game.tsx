import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import { ChessBoard } from "../components/ChessBoard";
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export default function Game() {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started,setStarted]=useState(false);
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          setStarted(true)
          console.log("game Initialized");
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("move make");
          break;
        case GAME_OVER:
          console.log("Game Over");
          break;
      }
    };
  }, [socket]);
  if (!socket) return <div>Connecting...</div>;

  return (
    <div className="flex justify-center text text-black ">
      <div className="pt-13  max-w-4xl w-full">
        <div className=" grid grid-cols-6 gap-4">
          <div className=" col-span-4  text-center ">
            <ChessBoard board={board} socket={socket} chess={chess} setBoard={setBoard}/>
          </div>
          <div className="col-span-2 bg-slate-800 flex justify-center">
            <div className="pt-10">
              {!started && <button
                onClick={() => {
                  socket.send(
                    JSON.stringify({
                      type: INIT_GAME,
                    }),
                  );
                }}
                className="text-xl font-bold text-white bg-green-500 px-12 py-2 text-center rounded-md"
              >
                Play
              </button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
