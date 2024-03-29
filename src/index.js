import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AdventureCreator from "./AdventureCreator";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

ReactDOM.render(
  <BrowserRouter>
    <DndProvider backend={HTML5Backend}>
      <AdventureCreator />
    </DndProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
