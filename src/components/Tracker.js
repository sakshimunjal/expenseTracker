import React, { useState } from "react";

import './Tracker.css'

const Tracker = ()=>{
    const [totalExpense, setTotalExpense] = useState(0);
    const [expenseLog, setExpenseLog] = useState([])
    const [isValid, setIsValid] = useState(true)
    const [inputVal, setInputVal] = useState(0)
    const [errorMsg, setErrorMsg] = useState('')

    const isNumberValid = (n)=>{
        return (n!=='' && !isNaN(Number(n)) && Number(n) > 0)
    }

    const handleInputNumber = (event)=>{
        setInputVal(event.target.value);
        if(isNumberValid(event.target.value))
        { 
            setIsValid(true)
            setErrorMsg('')
        }
        else{
            setIsValid(false)
            setErrorMsg('Please enter a positive number')
        }
    }

    const addExpense = ()=>{
        if(isNumberValid(inputVal)){
            let oldExpense = totalExpense;
            let newExpense = oldExpense + Number(inputVal);
            setTotalExpense(newExpense);
            setExpenseLog([...expenseLog, `${new Date().toISOString()} - ${inputVal} - Add`])
        }
        
    }

    const removeExpense = ()=>{
        if(isNumberValid(inputVal)){
            let oldExpense = totalExpense;
            let newExpense = oldExpense - Number(inputVal);
            if(newExpense >= 0){
                setTotalExpense(newExpense)
                setExpenseLog([...expenseLog, `${new Date().toISOString()} - ${inputVal} - Remove`])
            }else{
                setIsValid(false);
                setErrorMsg('Total expense cannot be negative')
            }
        }

        
    }

    return(
        <div>
            <div className="styleDiv centerContent">
                <h3>Balance: {totalExpense}</h3>
                {console.log(isValid)}
                <input className={isValid? '' :"error"} type="number" value={inputVal} onChange={handleInputNumber} placeholder="Please enter a number"/>
                <br/>
                {!isValid ? <span className="errorMsg">{errorMsg}</span>: null}
                <br/>
                <button className="button" type="button" onClick={addExpense}>Add</button>
                <button className="button" type="button" onClick={removeExpense}>Remove</button>
            </div>
           {expenseLog.length > 0 ? <div className="styleDiv">
               <h3>Transactions:</h3>
               {expenseLog.map((e, index)=> <p key={index}>{e}</p>)}
           </div>: ''}
        </div>
    )
}

export default Tracker;