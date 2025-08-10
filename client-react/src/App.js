import React,{useState, useEffect} from 'react';
import axios from 'axios';
import HabitList from './components/HabitList';
import AddHabitForm from './components/AddHabitForm';
import './App.css';

const API_URL = 'http://localhost:5000/api';  // Adjust the URL as needed

function App(){
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () =>{
    try{
      const response = await axios.get(`${API_URL}/habits`);
      setHabits(response.data);
    }
    catch(error){
      console.error('Error loading habits:', error);
      alert('Failed to load habits. Please try again later.');
    }
    finally {
      setLoading(false);
    }
  };




  const handleAddHabit = async(habitName)=>{
    try{
      const response = await axios.post (`${API_URL}/habits`, { name: habitName });
      setHabits([...habits, response.data]);
      console.log('Habit added:', response.data);
    }
    catch(error){
      console.error('Error adding habit:', error);
      alert('Failed to add habit. Please try again.');
    }
  };

  const handleToggleHabit = async (habitId, newCompletedStatus) => {
    try{
      const response = await axios.put(`${API_URL}/habits/${habitId}`, { completed: newCompletedStatus });
      setHabits(habits.map(habit =>
        habit.id === habitId
          ? { ...habit, completed: newCompletedStatus }
          : habit
      ));
      console.log('Habit updated:', response.data);
    }
    catch(error){
      console.error('Error updating habit:', error);
      alert('Failed to update habit. Please try again.');
    }
  };


  const handleDeleteHabit = async (habitId) => {
    if(!window.confirm('Are you sure you want to delete this habit?')){
      return;
    }

    try{
      await axios.delete(`${API_URL}/habits/${habitId}`);
      setHabits(habits.filter(habit => habit.id !== habitId));
      console.log('Habit deleted successfully');
    }
    catch(error){
      console.error('Error deleting habit:', error);
      alert('Failed to delete habit. Please try again.');
    }
  };

  if(loading){
    return <div className='App'>Loading habits...</div>;
  }

  return (
    <div className="App">
      <div className="container">
        <h1>My Habit Tracker</h1>

        <AddHabitForm onAddHabit={handleAddHabit} />

        <HabitList
          habits={habits}
          onToggleHabit={handleToggleHabit}
          onDeleteHabit={handleDeleteHabit}
        />
      </div>
    </div>
  );

}


export default App;