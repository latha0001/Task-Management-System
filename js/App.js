const { useState, useEffect } = React;

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('Pending');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && description && dueDate) {
            addTask({ title, description, dueDate, status });
            setTitle('');
            setDescription('');
            setDueDate('');
            setStatus('Pending');
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <form onSubmit={handleSubmit} class="bg-white p-4 rounded shadow-md">
            <h2 class="text-xl font-bold mb-4">Create New Task</h2>
            <div class="mb-4">
                <label class="block text-gray-700">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} class="w-full p-2 border rounded" />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} class="w-full p-2 border rounded"></textarea>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Due Date</label>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} class="w-full p-2 border rounded" />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} class="w-full p-2 border rounded">
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <button type="submit" class="bg-blue-500 text-white p-2 rounded">Add Task</button>
        </form>
    );
};

const TaskList = ({ tasks, updateTask, deleteTask }) => {
    return (
        <div class="mt-4">
            <h2 class="text-xl font-bold mb-4">Task List</h2>
            {tasks.map((task, index) => (
                <div key={index} class="bg-white p-4 rounded shadow-md mb-4">
                    <h3 class="text-lg font-bold">{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Due Date: {task.dueDate}</p>
                    <p>Status: {task.status}</p>
                    <div class="flex space-x-2 mt-2">
                        <button onClick={() => updateTask(index)} class="bg-yellow-500 text-white p-2 rounded">Edit</button>
                        <button onClick={() => deleteTask(index)} class="bg-red-500 text-white p-2 rounded">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('All');

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    const updateTask = (index) => {
        const newTasks = [...tasks];
        const task = newTasks[index];
        const updatedTask = { ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending' };
        newTasks[index] = updatedTask;
        setTasks(newTasks);
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);

    return (
        <div>
            <h1 class="text-3xl font-bold text-center mb-4">Task Management System</h1>
            <TaskForm addTask={addTask} />
            <div class="mt-4">
                <label class="block text-gray-700">Filter by Status</label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)} class="w-full p-2 border rounded">
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <TaskList tasks={filteredTasks} updateTask={updateTask} deleteTask={deleteTask} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
