import { useState, useEffect } from 'react';

const ColorDots = () => {
    const [dotColors, setDotColors] = useState(['bg-red-400', 'bg-red-400', 'bg-red-400']);
    const colors = [
        'bg-red-400', 
        'bg-blue-400', 
        'bg-green-400', 
        'bg-yellow-400', 
        'bg-purple-400', 
        'bg-pink-400', 
        'bg-indigo-400', 
        'bg-teal-400', 
        'bg-orange-400', 
        'bg-cyan-400', 
        'bg-lime-400', 
        'bg-rose-400', 
        'bg-violet-400', 
        'bg-amber-400', 
        'bg-fuchsia-400', 
        'bg-emerald-400', 
        'bg-sky-400', 
        'bg-slate-400', 
        'bg-zinc-400', 
        'bg-gray-400', 
        'bg-neutral-400',
        // 
        // 'bg-red-600', 
        // 'bg-blue-600', 
        // 'bg-green-600', 
        // 'bg-yellow-600', 
        // 'bg-purple-600', 
        // 'bg-pink-600', 
        // 'bg-indigo-600', 
        // 'bg-teal-600', 
        // 'bg-orange-600', 
        // 'bg-cyan-600', 
        // 'bg-lime-600', 
        // 'bg-rose-600', 
        // 'bg-violet-600', 
        // 'bg-amber-600', 
        // 'bg-fuchsia-600', 
        // 'bg-emerald-600', 
        // 'bg-sky-600', 
        // 'bg-slate-600', 
        // 'bg-zinc-600', 
        // 'bg-gray-600', 
        // 'bg-neutral-600'
    ];

    useEffect(() => {
        let currentDot = 0;

        const interval = setInterval(() => {
            setDotColors(prev => {
                const newColors = [...prev];

                // Change color of the current dot
                const currentColorIndex = colors.indexOf(newColors[currentDot]);
                const nextColorIndex = (currentColorIndex + 1) % colors.length;
                newColors[currentDot] = colors[nextColorIndex];

                // Move to next dot for next iteration
                currentDot = (currentDot + 1) % 3;

                return newColors;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex gap-1'>
            {dotColors.map((colorClass, index) => (
                <div
                    key={index}
                    className={`${colorClass} w-2 h-2 rounded-full shadow bg`}
                ></div>
            ))}
        </div>
    );
};

export default ColorDots;