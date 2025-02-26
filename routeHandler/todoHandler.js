const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todoSchema');

const Todo = mongoose.model('Todo', todoSchema);

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find(); // Find all todos from the database
        res.status(200).json(todos); // Return the todos as a JSON response
    } catch (err) {
        res.status(500).json({ error: 'There was a server-side error' });
    }
});

// Get a todo by ID
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id); // Find a todo by its ID
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' }); // Return error if todo is not found
        }
        res.status(200).json(todo); // Return the todo as a JSON response
    } catch (err) {
        res.status(500).json({ error: 'There was a server-side error' });
    }
});

// Create a new todo
router.post('/', async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();

        res.status(201).json({ message: 'Todo was inserted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'There was a server-side error' });
    }
});

// Create multiple todos
router.post('/all', async (req, res) => {
    try {
        const todos = await Todo.insertMany(req.body); // Insert multiple todos

        res.status(201).json({
            message: 'Todos were inserted successfully',
            data: todos,
        });
    } catch (err) {
        res.status(500).json({ error: 'There was a server-side error' });
    }
});

// get inactive todos
// Get all inactive todos
router.get('/inactive', async (req, res) => {
    try {
        const data = await Todo.findInactive(); // ✅ Call the static method
        res.status(200).json({ data });
    } catch (err) {
        res.status(500).json({ error: 'There was a server-side error' });
    }
});

// Update a todo
router.put('/:id', async (req, res) => {
    try {
        // First, find the todo to update
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        // Update the todo with the new data from the request body
        Object.assign(todo, req.body);

        // Save the updated todo
        const updatedTodo = await todo.save();

        res.status(200).json({
            message: 'Todo was updated successfully',
            updatedTodo, // Return the updated todo object
        });
    } catch (err) {
        res.status(500).json({ error: 'There was a server-side error' });
    }
});

// Delete a todo
// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        // Find and delete the todo by ID
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.status(200).json({
            message: 'Todo was deleted successfully',
            deletedTodo, // Return the deleted todo object
        });
    } catch (err) {
        res.status(500).json({ error: 'There was a server-side error' });
    }
});

module.exports = router;
