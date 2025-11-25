import React, { useState } from 'react';

const CalculatorApp = () => {
    const [display, setDisplay] = useState('0');
    const [prevValue, setPrevValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplay(String(digit));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? String(digit) : display + digit);
        }
    };

    const inputDot = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.');
        }
    };

    const clear = () => {
        setDisplay('0');
        setPrevValue(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    const performOperation = (nextOperator) => {
        const inputValue = parseFloat(display);

        if (prevValue === null) {
            setPrevValue(inputValue);
        } else if (operator) {
            const currentValue = prevValue || 0;
            const newValue = calculate(currentValue, inputValue, operator);
            setPrevValue(newValue);
            setDisplay(String(newValue));
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const calculate = (prev, next, op) => {
        switch (op) {
            case '/': return prev / next;
            case '*': return prev * next;
            case '-': return prev - next;
            case '+': return prev + next;
            default: return next;
        }
    };

    const Button = ({ label, color = 'bg-gray-700', textColor = 'text-white', onClick, wide }) => (
        <button
            onClick={onClick}
            className={`${wide ? 'col-span-2 w-full aspect-[2/1]' : 'w-full aspect-square'} ${color} ${textColor} rounded-full text-3xl font-medium active:opacity-70 transition-opacity flex items-center justify-center`}
        >
            {label}
        </button>
    );

    return (
        <div className="h-full bg-black text-white flex flex-col p-4">
            <div className="flex-1 flex items-end justify-end mb-4">
                <span className="text-7xl font-light tracking-tight truncate">{display}</span>
            </div>

            <div className="grid grid-cols-4 gap-3">
                <Button label="AC" color="bg-gray-400" textColor="text-black" onClick={clear} />
                <Button label="+/-" color="bg-gray-400" textColor="text-black" onClick={() => { }} />
                <Button label="%" color="bg-gray-400" textColor="text-black" onClick={() => { }} />
                <Button label="÷" color="bg-orange-500" onClick={() => performOperation('/')} />

                <Button label="7" onClick={() => inputDigit(7)} />
                <Button label="8" onClick={() => inputDigit(8)} />
                <Button label="9" onClick={() => inputDigit(9)} />
                <Button label="×" color="bg-orange-500" onClick={() => performOperation('*')} />

                <Button label="4" onClick={() => inputDigit(4)} />
                <Button label="5" onClick={() => inputDigit(5)} />
                <Button label="6" onClick={() => inputDigit(6)} />
                <Button label="-" color="bg-orange-500" onClick={() => performOperation('-')} />

                <Button label="1" onClick={() => inputDigit(1)} />
                <Button label="2" onClick={() => inputDigit(2)} />
                <Button label="3" onClick={() => inputDigit(3)} />
                <Button label="+" color="bg-orange-500" onClick={() => performOperation('+')} />

                <Button label="0" wide onClick={() => inputDigit(0)} />
                <Button label="." onClick={inputDot} />
                <Button label="=" color="bg-orange-500" onClick={() => performOperation('=')} />
            </div>
        </div>
    );
};

export default CalculatorApp;
