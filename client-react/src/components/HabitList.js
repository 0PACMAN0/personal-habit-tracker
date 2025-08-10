import React from "react";

const HabitList = ({habits,onToggleHabit,onDeleteHabit}) => {
    return (
        <div className="habits-list">
            {habits.length === 0 ? (
                <p>No habits found. Start adding some!</p>
            ) : (
                habits.map(habit => (
                    <div key={habit.id} className="habit-item">
                        <span style={{textDecoration: habit.completed ? 'line-through' : 'none'}}>
                            {habit.name}
                        </span>
                        <small style={{color: '#666', marginLeft: '10px'}}>
                            {habit.completed ? '✅ Completed' : '⏳ Pending'}
                        </small>
                        <button onClick={() => onToggleHabit(habit.id, !habit.completed)}
                                style={{marginRight: '10px', backgroundColor: habit.completed ? '#ff9800' : '#4CAF50'}}>
                            {habit.completed ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                        <button onClick={() => onDeleteHabit(habit.id)} style={{backgroundColor: '#f44336'}}>
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default HabitList;
