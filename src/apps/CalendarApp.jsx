import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Menu } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { useOS } from '../context/OSContext';

const CalendarApp = () => {
    const { theme } = useOS();
    const [currentDate, setCurrentDate] = React.useState(new Date());

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Pad start of month
    const startDay = monthStart.getDay();
    const padding = Array(startDay).fill(null);

    return (
        <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Menu size={24} />
                    <span className="text-xl font-bold">{format(currentDate, 'MMMM yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 mb-2 px-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                    <div key={day} className="text-center text-xs font-bold opacity-50 py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 grid grid-cols-7 auto-rows-fr px-2 pb-4 gap-1">
                {padding.map((_, i) => (
                    <div key={`pad-${i}`} />
                ))}
                {days.map(day => {
                    const isToday = isSameDay(day, new Date());
                    return (
                        <div key={day.toString()} className="flex flex-col items-center pt-2 relative">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${isToday
                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}>
                                {format(day, 'd')}
                            </div>
                            {/* Simulated Event Dot */}
                            {Math.random() > 0.8 && (
                                <div className="w-1 h-1 bg-red-500 rounded-full mt-1"></div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* FAB */}
            <button className="absolute bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center text-white active:scale-95 transition-transform">
                <Plus size={24} />
            </button>
        </div>
    );
};

export default CalendarApp;
