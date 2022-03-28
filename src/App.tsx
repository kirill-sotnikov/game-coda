import React, { useState } from "react";
import "./App.css";
import Enemy from "./components/Enemy";
import { EnemyList } from "./type/types";

function App() {
  const [score, setScore] = useState<number>(0);
  const [lose, setLose] = useState<boolean>(false);
  const [leftPos, setLeftPos] = useState<number>(135);
  const [allEnemy, setAllEnemy] = useState<EnemyList[]>([
    { id: 1, status: true },
    { id: 2, status: true },
    { id: 3, status: true },
    { id: 4, status: true },
    { id: 5, status: true },
    { id: 6, status: true },
  ]);
  function generateItem() {
    setAllEnemy((state) => [...state, { id: Date.now(), status: true }]);
  }
  function withOutElement(element: EnemyList) {
    const beforeElemnt = [];
    const afterElemnt = [];
    let flag = true;
    for (let i of allEnemy) {
      if (i.id === element.id) {
        flag = false;
      }
      if (flag) {
        beforeElemnt.push(i);
      } else if (!flag && i.id != element.id) {
        afterElemnt.push(i);
      }
    }
    return [...beforeElemnt, element, ...afterElemnt];
  }

  function deleteItem(id: number) {
    const currentItem = allEnemy.find((item) => item.id === id);

    if (currentItem) {
      setScore((state) => state + 1);
      const changeCurItem = { ...currentItem, status: false };
      setAllEnemy(withOutElement(changeCurItem));
    }
    generateItem();
  }
  function gameIsLosed() {
    setLose(true);
  }

  function goLeft() {
    if (leftPos > 0) {
      setLeftPos((state) => state - 15);
    }
  }

  function goRight() {
    if (leftPos < 270) {
      setLeftPos((state) => state + 15);
    }
  }

  if (lose) {
    return (
      <>
        <h1
          style={{
            width: 200,
            margin: "20px auto",
            color: "green",
            textAlign: "center",
          }}
        >
          Lose :(
        </h1>
        <h1
          style={{
            width: 200,
            margin: "20px auto",
            color: "green",
            textAlign: "center",
          }}
        >
          SCORE: {score}
        </h1>
      </>
    );
  }
  window.addEventListener("keydown", (e) => {
    const buttonDown = e.key;
    if (buttonDown === "d") {
      goRight();
    } else if (buttonDown === "a") {
      goLeft();
    }
  });
  return (
    <div className="App">
      <div>
        <p style={{ color: "green" }}>SCORE: {score}</p>
      </div>
      <div className="gamePlain">
        {allEnemy.map((item, index) => {
          if (item.status) {
            return (
              <Enemy
                key={index}
                id={item.id}
                deleteItem={deleteItem}
                gameIsLosed={gameIsLosed}
                left={leftPos}
              />
            );
          }
        })}

        <div className="defender" style={{ left: leftPos }}></div>
      </div>
      <div>
        <button className="controleButton" onClick={goLeft}>
          Left
        </button>
        <button className="controleButton" onClick={goRight}>
          Right
        </button>
      </div>
    </div>
  );
}

export default App;
