import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

const TerminalApp = () => {
    const [history, setHistory] = useState([
        { type: 'output', content: 'Gato OS Shell v1.0' },
        { type: 'output', content: 'Type "help" for a list of commands.' },
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (cmd) => {
        const args = cmd.trim().split(' ');
        const command = args[0].toLowerCase();

        let output = '';

        switch (command) {
            case 'help':
                output = 'Available commands: help, clear, echo, date, whoami, reboot';
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'echo':
                output = args.slice(1).join(' ');
                break;
            case 'date':
                output = new Date().toString();
                break;
            case 'whoami':
                output = 'root';
                break;
            case 'reboot':
                output = 'Rebooting system... (Simulation)';
                // In a real integration, we could call turnOff() then turnOn() from useOS
                break;
            default:
                output = `Command not found: ${command}`;
        }

        setHistory(prev => [
            ...prev,
            { type: 'input', content: cmd },
            { type: 'output', content: output }
        ]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        handleCommand(input);
        setInput('');
    };

    return (
        <div className="h-full bg-black text-green-400 font-mono p-4 flex flex-col text-sm overflow-hidden">
            <div className="flex-1 overflow-y-auto space-y-2">
                {history.map((line, i) => (
                    <div key={i} className={`${line.type === 'input' ? 'text-white' : 'text-green-400'}`}>
                        {line.type === 'input' ? '$ ' : ''}{line.content}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
                <span className="text-white">$</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white"
                    autoFocus
                />
            </form>
        </div>
    );
};

export default TerminalApp;
