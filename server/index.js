const express = require('express');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('habit tracker server is running!');
});


let habits = [
  { id: 1, name: "Drink 8 glasses of water", completed: false },
  { id: 2, name: "Exercise for 30 minutes", completed: true }
];

app.get('/api/habits', (req,res)=>{
    res.json(habits);
});

app.post('/api/habits',(req,res)=>{
    const {name} = req.body;

    const newHabit = {
        id: habits.length + 1,
        name,
        completed: false
    };


    habits.push(newHabit);
    res.json(newHabit);
});

app.put('/api/habits/:id', (req, res) => {
    const habitId = parseInt(req.params.id);
    const { completed } = req.body;

    const habit = habits.find(h=>h.id === habitId);

    if(!habit){
        return res.status(404).json({error:'Habit not found'});
    }

    habit.completed = completed;
    res.json(habit);
});

app.delete('/api/habits/:id', (req, res) => {
    const habitId = parseInt(req.params.id);


    const habitIndex = habits.findIndex(h => h.id === habitId);

    if(habitIndex === -1){
        return res.status(404).json({error: 'Habit not found'});
    }

    const deletedHabit = habits.splice(habitIndex, 1)[0];
    res.json({message:'habit deleted successfully',habit: deletedHabit});
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


