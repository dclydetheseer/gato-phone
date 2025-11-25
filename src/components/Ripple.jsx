import React, { useState, useLayoutEffect } from 'react';

const Ripple = ({ color = "rgba(255, 255, 255, 0.3)", duration = 600 }) => {
    const [ripples, setRipples] = useState([]);

    useLayoutEffect(() => {
        let timeout;
        if (ripples.length > 0) {
            timeout = setTimeout(() => {
                setRipples([]);
            }, duration);
        }
        return () => clearTimeout(timeout);
    }, [ripples, duration]);

    const addRipple = (event) => {
        const container = event.currentTarget.getBoundingClientRect();
        const size = container.width > container.height ? container.width : container.height;
        const x = event.clientX - container.left - size / 2;
        const y = event.clientY - container.top - size / 2;

        const newRipple = {
            x,
            y,
            size,
            id: Date.now()
        };

        setRipples([...ripples, newRipple]);
    };

    return (
        <div
            className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none"
            onMouseDown={addRipple}
        >
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    style={{
                        top: ripple.y,
                        left: ripple.x,
                        width: ripple.size,
                        height: ripple.size,
                        backgroundColor: color,
                        animationDuration: `${duration}ms`
                    }}
                    className="absolute rounded-full animate-ripple opacity-0 scale-0"
                />
            ))}
        </div>
    );
};

export default Ripple;
