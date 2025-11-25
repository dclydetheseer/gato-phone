import React, { useState } from 'react';
import { Delete } from 'lucide-react';

const CalculatorApp = () => {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');

    const handleNumber = (num) => {
        setDisplay(prev => prev === '0' ? num : prev + num);
    };

    const handleOperator = (op) => {
        setEquation(display + ' ' + op + ' ');
        setDisplay('0');
    };

    const handleEqual = () => {
        try {
            // eslint-disable-next-line no-eval
            const result = eval(equation + display);
            setDisplay(String(result));
            setEquation('');
        } catch (e) {
            setDisplay('Error');
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setEquation('');
    };

    const handleDelete = () => {
        setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    };

    const CalcButton = ({ label, onClick, color = "bg-gray-100 text-gray-900", type = "text-2xl" }) => (
        <button
            onClick={onClick}
            className={`w-full h-full rounded-full flex items-center justify-center font-medium active:scale-95 transition-transform ${color} ${type}`}
        >
            {label}
        </button>
    );

    return (
        <div className="h-full bg-white flex flex-col p-4">
            {/* Display */}
            <div className="flex-1 flex flex-col items-end justify-end mb-4 px-4">
                <div className="text-gray-500 text-xl mb-2 h-8">{equation}</div>
                <div className="text-6xl font-light text-gray-900 break-all text-right w-full">
                    {display}
                </div>
            </div>

            {/* Keypad */}
            <div className="h-[60%] grid grid-cols-4 grid-rows-5 gap-3">
                <CalcButton label="AC" onClick={handleClear} color="text-red-500" />
                <CalcButton label="( )" onClick={() => { }} color="text-blue-500" />
                <CalcButton label="%" onClick={() => handleOperator('%')} color="text-blue-500" />
                <CalcButton label="÷" onClick={() => handleOperator('/')} color="text-blue-500" type="text-3xl" />

                <CalcButton label="7" onClick={() => handleNumber('7')} />
                <CalcButton label="8" onClick={() => handleNumber('8')} />
                <CalcButton label="9" onClick={() => handleNumber('9')} />
                <CalcButton label="×" onClick={() => handleOperator('*')} color="text-blue-500" type="text-3xl" />

                <CalcButton label="4" onClick={() => handleNumber('4')} />
                <CalcButton label="5" onClick={() => handleNumber('5')} />
                <CalcButton label="6" onClick={() => handleNumber('6')} />
                <CalcButton label="-" onClick={() => handleOperator('-')} color="text-blue-500" type="text-4xl" />

                <CalcButton label="1" onClick={() => handleNumber('1')} />
                <CalcButton label="2" onClick={() => handleNumber('2')} />
                <CalcButton label="3" onClick={() => handleNumber('3')} />
                <CalcButton label="+" onClick={() => handleOperator('+')} color="text-blue-500" type="text-3xl" />

                <CalcButton label="0" onClick={() => handleNumber('0')} />
                <CalcButton label="." onClick={() => handleNumber('.')} />
                <CalcButton label={<Delete size={24} />} onClick={handleDelete} />
                <CalcButton label="=" onClick={handleEqual} color="bg-blue-500 text-white" />
            </div>
        </div>
    );
};

export default CalculatorApp;
