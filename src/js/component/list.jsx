import { useState, useEffect } from "react";
import React from "react";

const ToDoList = () => {
    const [allValues, setAllValues] = useState ([])
    const [inputValue, setInputValue] = useState ("");


    const getFetch = () =>{
        const url = "https://assets.breatheco.de/apis/fake/todos/user/tuniet"
        const request = {
            method: "GET"    
        }
        fetch(url, request)
            .then(response => response.json())
            .then(result => {result.map((task) => {setAllValues(allValues => [...allValues, task.label])})})
            .catch(error => console.log("Error", error))
    }

    const putFetch = (list) =>{
        const url = "https://assets.breatheco.de/apis/fake/todos/user/tuniet"
        const request = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(list)
        }
        fetch(url, request)
            .then(response => response.json())
            .then(result => console.log("OK"))
            .catch(error => console.log("Error", error))
    }
    const addItem = (e) => {
        e.preventDefault();
        if(inputValue == "") return;

        setAllValues(allValues => [...allValues, inputValue]);
        setInputValue("");
        
        let newList = [];
        for(let i = 0; i < allValues.length; i++){
            let item = {}
            item["label"] = allValues[i];
            item["done"] = false;
            newList.push(item)
        }
        putFetch(newList);
    }
    
    useEffect(() => {
        getFetch();
    }, []);

    return (
        <div className="list">
            <form onSubmit={addItem}><input type="text" onChange={e => setInputValue(e.target.value)} value={inputValue} /></form>
            <div>
                {allValues.map((task, index) => <div className="itemContainer" key = {index}><p className="item">{task}</p></div>)}
            </div>
            <p className="bottom">{allValues.length == 0 ? "No tasks, add a task" : allValues.length + " items left"}</p>
        </div>
    );
}
export default ToDoList;

