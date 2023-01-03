import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateCounter } from "../actions";
import Graph from './Graph';
export default function Test() {
    var counter = useSelector((state) => state.updateCounter);

    const dispatch = useDispatch();
    const updateCounterHandler = () => {
        dispatch(updateCounter(counter+1));
    };

    useEffect(() => {
      document.title = counter;
    }, [counter]);

    return (
        <div>
            <h1>Welcome to react {counter}</h1>
            <button onClick={updateCounterHandler}>
                Click
            </button>
            <div>
                <Graph/>
            </div>
        </div>
    )
}
