import React, { useEffect, useState } from "react";
type EnemyPropsType = () => void;
export default function Enemy(prop: {
  gameIsLosed: EnemyPropsType;
  left: number;
  id: number;
  deleteItem: (id: number) => void;
}) {
  const [leftPosition, setLeftPosition] = useState<number>(
    getRandomInt(10, 280)
  );
  const [topPosition, setTopPosition] = useState<number>(-10);
  const [disp, setDisp] = useState<"none" | "block">("none");

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTopPosition((state) => state + 5);
    }, getRandomInt(100, 400));
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (topPosition === 0) {
      setDisp("block");
    } else if (topPosition > 290) {
      prop.gameIsLosed();
    }
    if (topPosition > 260 && topPosition < 277) {
      if (leftPosition >= prop.left && leftPosition + 10 <= prop.left + 30) {
        console.log("delete");
        prop.deleteItem(prop.id);
      }
    }
  }, [topPosition]);

  return (
    <div
      className="enemy"
      style={{ left: leftPosition, top: topPosition, display: disp }}
    ></div>
  );
}
