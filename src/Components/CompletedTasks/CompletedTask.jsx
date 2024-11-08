import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardText, CardTitle, Button } from 'react-bootstrap';
import axios from 'axios';

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  // Fetch only completed tasks from the API
  const fetchCompletedTasks = async () => {
    try {
      const { data } = await axios.get('https://task-manager-j1at.onrender.com/api/tasks/filterCompletedTasks', {
        headers: { Authorization: localStorage.getItem('token') },
      });

      if (data && data.findCompleted && data.findCompleted.length > 0) {
        setTasks(data.findCompleted);
        console.log("Fetched completed tasks:", data.findCompleted);
      } else {
        console.log("No completed tasks found.");
        setTasks([]);
      }
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
    }
  };

  // Update task completion status and remove from completed list
  const handleUpdateTask = async (taskId, isCompleted) => {
    try {
      // Set task to incomplete on the server using a boolean
      await axios.put(
        `https://task-manager-j1at.onrender.com/api/tasks/updateTask/${taskId}`,
        { completed: false }, // using boolean instead of "no"
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );

      // Remove the task from the local completed tasks list
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error updating task status:', error.response ? error.response.data : error.message);
    }
  };

  // Delete a single task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`https://task-manager-j1at.onrender.com/api/tasks/deleteSpecificTask/${taskId}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Delete all tasks from the local view only
  const handleDeleteAllTasks = () => {
    setTasks([]); // Clear only the local state
  };

  return (
    <section className="tasks">
      <div className="container">
        <h1 style={{
    cursor: 'pointer',  
    fontFamily: "'Comic Sans MS', cursive, sans-serif", 
    fontSize: '1.25rem', 
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '8px',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
  }}>Completed Tasks</h1>
        <Button className="deleteAllBtn bg-danger mb-3" onClick={handleDeleteAllTasks}>Delete All Tasks</Button>
        <div className="row">
          {tasks.length === 0 ? (
            <p style={{
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      fontSize: '1.2rem',
      color: '#888888',
      textAlign: 'center',
      marginTop: '20px',
      padding: '10px',
      backgroundColor: '#F9F9F9',
      borderRadius: '10px',
      display: 'inline-block',
    }}>No completed tasks available.</p>
          ) : (
            tasks.map(task => (
              <div key={task._id} className="col-md-4">
                <Card className="task-card" style={{ width: '18rem' }}>
                  <CardBody>
                    <CardTitle tag="h5"><strong>title:</strong> {task.title}</CardTitle>
                    <CardText><strong>description:</strong> {task.description}</CardText>
                    <Button
                      className="updateBtn bg-success me-2"
                      onClick={() => handleUpdateTask(task._id, task.completed)}
                    >
                      Mark as Incomplete
                    </Button>
                    <Button
                      className="deleteBtn bg-danger"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </Button>
                  </CardBody>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default CompletedTasks;
