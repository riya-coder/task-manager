import "./App.css";
import { FaPlus } from "react-icons/fa";
import trash from "./trash-can.svg";
import React, { useState, useEffect, useRef } from "react";

function App() {
  /* ---- react hooks */
  const LS_KEY = "taskList";
  const taskRef = useRef();
  const [taskArray, setArray] = useState([]);

  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem(LS_KEY));
    if (storedArray) setArray(storedArray);
    else console.log("No tasks");
  }, []);

  /* --- helper functions --- */
  function handleAdd() {
    const newTask = taskRef.current.value;
    if (newTask !== "") {
      const newArray = [
        ...taskArray,
        { id: Date.now(), name: newTask, status: false },
      ];
      localStorage.setItem(LS_KEY, JSON.stringify(newArray));
      setArray(newArray);
      taskRef.current.value = "";
    }
  }

  function handleDelete(id) {
    const updatedArray = taskArray.filter((item) => item.id !== id);
    localStorage.setItem(LS_KEY, JSON.stringify(updatedArray));
    setArray(updatedArray);
  }

  return (
    <div className="App">
      {/* ---header---- */}
      <header className="App-header">
        <nav>
          {/* logo-text */}
          <div className="logo-text">
            <div className="square">T</div>
            <div class="heading">Tasks</div>
          </div>
          {/* add task */}
          <div className="add">
            <div className="notebook-symbol">📝</div>
            <input type="text" placeholder="Add a task.." ref={taskRef} />
            <div className="plus" onClick={handleAdd}>
              <FaPlus />
            </div>
          </div>
        </nav>
      </header>
      {/* ---main---- */}
      <main>
        <div
          className="box"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + "/bgflower.jpg"})`,
          }}
        >
          {/* main-header */}
          <div className="main-header">
            <p>Tasks: {taskArray.length} </p>
          </div>
          {/* list of tasks */}
          {Array.isArray(taskArray) && taskArray.length ? (
            <ul className="task-list">
              {taskArray.map((item) => (
                <li key={item.id}>
                  <p className="task-name">{item.name}</p>
                  <img
                    onClick={() => handleDelete(item.id)}
                    src={trash}
                    className="trash-icon"
                    alt="Trash Can"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p></p>
          )}
        </div>
      </main>
      {/* ----footer---- */}
      <footer>
        <div className="copyright">Copyright © 2023 Tasks</div>
        <ul id="bottom">
          <a href="#bottom">Privacy</a>
          <a href="#bottom">Terms of Service</a>
        </ul>
      </footer>
    </div>
  );
}

export default App;
