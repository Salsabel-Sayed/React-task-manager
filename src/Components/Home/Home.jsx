import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardText, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  useEffect(() => {
    fetchAllTasks();
  }, []);

  // Fetch all tasks
  const fetchAllTasks = async () => {
    try {
      const { data } = await axios.get('https://task-manager-j1at.onrender.com/api/tasks/getAllTasks', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching all tasks:', error);
    }
  };

  // Handle deleting a specific task
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

  // Handle deleting all tasks
  const handleDeleteAllTasks = async () => {
    try {
      await axios.delete('https://task-manager-j1at.onrender.com/api/tasks/deleteAllTasks', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setTasks([]);
    } catch (error) {
      console.error('Error deleting all tasks:', error);
    }
  };

  const handleToggleCompleted = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus ? 'no' : 'yes';
      await axios.patch(
        `https://task-manager-j1at.onrender.com/api/tasks/updateCompletedTask/${taskId}`,
        { completed: newStatus },
        { headers: { Authorization: localStorage.getItem('token') } }
      );

      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, completed: !currentStatus } : task
        )
      );
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const handleOpenModal = (task) => {
    setCurrentTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setUpdatedTitle('');
    setUpdatedDescription('');
  };

  const handleUpdateTask = async () => {
    try {
      await axios.put(
        `https://task-manager-j1at.onrender.com/api/tasks/updateTask/${currentTask._id}`,
        {
          title: updatedTitle,
          description: updatedDescription,
        },
        { headers: { Authorization: localStorage.getItem('token') } }
      );

      setTasks(
        tasks.map((task) =>
          task._id === currentTask._id ? { ...task, title: updatedTitle, description: updatedDescription } : task
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <section className="homeTasks">
      <div className="container">
        <div className="row justify-content-between align-items-center mb-3">
          <div className="col">
            <div className="container">
  <h1
    style={{
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#FF6F61',
      backgroundColor: '#FFF0F5',
      padding: '10px 20px',
      borderRadius: '12px',
      textAlign: 'center',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    }}
  >
    Your Tasks
  </h1>
  {/* Rest of your component */}
</div>

          </div>
          <div className="col-auto">
            {/* Delete All Tasks button */}
            <Button color="danger" onClick={handleDeleteAllTasks}>
              Delete All Tasks
            </Button>
          </div>
        </div>

        <div className="row">
          {tasks.length === 0 ? (
            <div className="col-12">
               <p
    style={{
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      fontSize: '1.2rem',
      color: '#888888',
      textAlign: 'center',
      marginTop: '20px',
      padding: '10px',
      backgroundColor: '#F9F9F9',
      borderRadius: '10px',
      display: 'inline-block',
    }}
  >
    😔 No tasks available.
  </p>
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="col-xl-4">
                <Card className="task-card" color="light" style={{ width: '18rem', background: '#a9a9a963' }}>
                  <CardBody>
                    <CardTitle tag="h5">title:{task.title}</CardTitle>
                    <CardText>description: {task.description}</CardText>
                    <Button
                      className="updateBtn bg-success border-0 me-2"
                      onClick={() => handleOpenModal(task)}
                    >
                      Update
                    </Button>
                    <Button
                      className="deleteBtn bg-danger border-0"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </Button>
                    <h3
  onClick={() => handleToggleCompleted(task._id, task.completed)}
  style={{
    cursor: 'pointer',
    color: task.completed ? '#4CAF50' : '#FF6347', // green for completed, red for not completed
    fontFamily: "'Comic Sans MS', cursive, sans-serif", // example of a cute font
    fontSize: '1.25rem', // larger than typical h3 for a cute effect
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '8px',
    backgroundColor: task.completed ? '#E8F5E9' : '#FFEBEE', // light green or pink background
    textAlign: 'center',
    transition: 'background-color 0.3s ease', // smooth color change
  }}
>
  {task.completed ? 'Completed' : 'Not Completed'}
</h3>

                  </CardBody>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal isOpen={modalOpen} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}>Update Task</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="taskTitle">Title</Label>
            <Input
              type="text"
              id="taskTitle"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="taskDescription">Description</Label>
            <Input
              type="textarea"
              id="taskDescription"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdateTask}>Save Changes</Button>
          <Button color="secondary" onClick={handleCloseModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </section>
  );
}

export default Home;
