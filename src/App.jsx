import React, { useState } from "react";
import styles from "./App.module.css";

export function App() {
    const [operand1, setOperand1] = useState("");
    const [operator, setOperator] = useState("");
    const [operand2, setOperand2] = useState("");
    const [result, setResult] = useState("");

    const NUMS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const BUTTONS = ["-", "+", "C", "=", "*", "/"];

    const numberClick = (num) => {
        if (operator === "") {
            setOperand1(operand1 + num);
        } else {
            setOperand2(operand2 + num);
        }
    };

    const calculateResult = () => {
        let number = 0;
        switch (operator) {
            case "+":
                number = Number(operand1) + Number(operand2);
                break;
            case "-":
                number = Number(operand1) - Number(operand2);
                break;
            case "*":
                number = Number(operand1) * Number(operand2);
                break;
            case "/":
                if (Number(operand2) === 0) {
                    return alert("На ноль делить нельзя=)");
                }
                number = Number(operand1) / Number(operand2);
                break;
            default:
                return;
        }
        return Math.floor(number).toString();
    };

    const actionClick = (action) => {
        if (action === "C") {
            setOperand1("");
            setOperator("");
            setOperand2("");
            setResult("");
        } else if (action === "=") {
            if (operand1 !== "" && operator !== "" && operand2 !== "") {
                const result = calculateResult();
                if (result === undefined || result === Infinity) {
                    return;
                } else {
                    setResult(result);
                }
            } else {
                alert("Ошибка: введите первое число, выберите действие и введите второе число");
            }
        } else {
            setOperator(action);
            setResult("");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.display}>
                <span className={result !== "" ? styles.result : styles.normal}>
                    {operand1} {operator} {operand2} {result !== "" ? "=" + result : ""}
                </span>
            </div>
            <div className={styles.buttons}>
                {NUMS.map((num) => (
                    <button key={num} className={styles.numButton} onClick={() => numberClick(num)}>
                        {num}
                    </button>
                ))}
                {BUTTONS.map((button) => (
                    <button
                        key={button}
                        className={button === "C" ? styles.clearButton : button === "=" ? styles.equalsButton : styles.operButton}
                        onClick={() => actionClick(button)}
                    >
                        {button}
                    </button>
                ))}
            </div>
        </div>
    );
}
