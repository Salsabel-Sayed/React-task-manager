import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation

function AddTask() {
  const [tasks, setTasks] = useState([]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      completed: false,  // This could be a checkbox or just default as false
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, 'Title must be at least 3 characters')
        .max(20, 'Title must be at most 20 characters')
        .required('Title is required'),
      description: Yup.string()
        .min(3, 'Description must be at least 3 characters')
        .max(100, 'Description must be at most 100 characters')
        .required('Description is required'),
      completed: Yup.boolean(), // This is optional based on your use case
    }),
    onSubmit: async (values) => {
      try {
        const newTask = {
          title: values.title,
          description: values.description,
          completed: values.completed,
        };
        
        const { data } = await axios.post(
          'https://task-manager-j1at.onrender.com/api/tasks/createTask',
          newTask,
          { headers: { Authorization: localStorage.getItem('token') } }
        );

        setTasks([...tasks, data.tasks]);
        formik.resetForm(); // Reset the form after successful task creation
      } catch (error) {
        console.error('Error creating task:', error);
      }
    },
  });

  return (
    <section className="taskSection">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 style={{
    cursor: 'pointer',
    fontFamily: "'Comic Sans MS', cursive, sans-serif", 
    fontSize: '1.25rem', 
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '8px',
    textAlign: 'center',
    transition: 'background-color 0.3s ease', 
  }}>Manage Your Tasks</h1>

            {/* Add Task Form */}
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Task Title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="text-danger">{formik.errors.title}</div>
                )}
              </div>

              <div className="mb-3">
                <textarea
                  className="form-control mb-2"
                  placeholder="Task Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="text-danger">{formik.errors.description}</div>
                )}
              </div>

              {/* Add Completed checkbox if needed */}
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="completed"
                  checked={formik.values.completed}
                  onChange={formik.handleChange}
                />
                <label className="form-check-label" htmlFor="completed">
                  Task Completed
                </label>
              </div>

              <Button type="submit" className="mt-2" disabled={formik.isSubmitting}>
                Add Task
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddTask;
