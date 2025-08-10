import React, {useState} from "react";

const AddHabitForm = ({onAddHabit}) => {
    const [habitName, setHabitName] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!habitName.trim()){
            alert('Please enter a habit name');
            return;
        }

        onAddHabit(habitName.trim());
        setHabitName('');
    };
    return (
        <form onSubmit={handleSubmit} className="add-habit-form">
            <input
                type="text"
                placeholder="Enter new habit"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                className="habit-input"
            />
            <button type="submit">Add Habit</button>
        </form>
    );
};

export default AddHabitForm;