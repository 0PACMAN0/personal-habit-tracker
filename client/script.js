const API_URL ='http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    loadHabits();
});


async function loadHabits() {
    try{
        const response = await axios.get(`${API_URL}/habits`);
        const habits = response.data;

        displayHabits(habits);
    }
    catch(error){
        console.error('Error loading habits:', error);
    }
}


function displayHabits(habits) {
    const habitsList = document.getElementById('habitsList');
    habitsList.innerHTML = '';

    habits.forEach(habit=>{
        const habitDiv = createHabitElement(habit);
        habitsList.appendChild(habitDiv);
    });
}

// Function to create HTML element for a single habit
function createHabitElement(habit) {
    const habitDiv = document.createElement('div');  // Create a div container
    habitDiv.className = 'habit-item';  // Add CSS class for styling

    // Create the HTML content for this habit
    habitDiv.innerHTML = `
        <div>
            <span style="text-decoration: ${habit.completed ? 'line-through' : 'none'}">
                ${habit.name}
            </span>
            <small style="color: #666; margin-left: 10px;">
                ${habit.completed ? '✅ Completed' : '⏳ Pending'}
            </small>
        </div>
        <div>
            <button onclick="toggleHabit(${habit.id}, ${!habit.completed})"
                    style="margin-right: 10px; background-color: ${habit.completed ? '#ff9800' : '#4CAF50'}">
                ${habit.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onclick="deleteHabit(${habit.id})"
                    style="background-color: #f44336;">
                Delete
            </button>
        </div>
    `;

    return habitDiv;  // Return the completed HTML element
}



async function addHabit(){
    const habitInput = document.getElementById('habitInput');
    const habitName = habitInput.value.trim();

    if(!habitName){
        alert('Please enter a habit name');
        return;
    }

    try{
        const response = await axios.post(`${API_URL}/habits`, { name: habitName });
        console.log('habbit added:', response.data);
        habitInput.value = '';
        loadHabits();
    }
    catch(error){
        console.error('Error adding habit:', error);
        alert('Failed to add habit. Please try again.');
    }
}


async function toggleHabit(habitId, newCompletedStatus){
    try{
        const response = await axios.put(`${API_URL}/habits/${habitId}`, { completed: newCompletedStatus });
        console.log('Habit updated:', response.data);
        loadHabits();
    }
    catch(error){
        console.error('Error updating habit:', error);
        alert('Failed to update habit. Please try again.');
    }
}

async function deleteHabit(habitId) {
    if(!confirm('Are you sure you want to delete this habit?')){
        return;
    }

    try{
        const response = await axios.delete(`${API_URL}/habits/${habitId}`);
        console.log('Habit deleted:', response.data);
        loadHabits();
    }
    catch(error){
        console.error('Error deleting habit:', error);
        alert('Failed to delete habit. Please try again.');
    }
}