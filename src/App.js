import './App.css';
import React from "react";
import {Main} from "./Main Class";


export let has_class = (item, classname) => {
    let tmp = item.current.className.split(" ")
    for (let i = 0; i < tmp.length; i++) {
        if (tmp[i] === classname) return true
    }
    return false
}

export let add_class = (item, classname) => {
    if (has_class(item,classname)) return
    item.current.className += " " + classname
}

export let remove_class = (item, classname) => {
    let tmp = item.current.className.split(" ")
    let final = ""
    for (let i = 0; i < tmp.length; i++) {
        if (tmp[i] !== classname) final += tmp[i] + " "
    }
    item.current.className = final
}

export let remove_element = (list, index) => {
    let tmp = []
    for (let i = 0; i < list.length; i++) {
        if (i !== index) tmp.push(list[i])
    }
    return tmp
}

export let temporarily_add_class = (item, className, timeout) => {
    add_class(item, className)
    setTimeout( () => {
        remove_class(item, className)
    }, timeout)
}

function App() {
  return (
    <div className="App">
        <Main> </Main>
    </div>
  );
}

export default App;
