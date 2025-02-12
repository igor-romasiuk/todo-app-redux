const API_URL = 'https://jsonplaceholder.typicode.com/todos'

export const todoApi = {
    getAllTodos: async () => {
        try {
            const response = await fetch(API_URL)
            
            if (!response.ok) {
                throw new Error('Failed to fetch todos')
            }

            return response.json()
        } catch (error) {
            console.error('Error fetching todos:', error)
            throw error
        }
    },
    createTodo: async (todo) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            })

            if (!response.ok) {
                throw new Error('Failed to create todo')
            }

            return response.json()
        } catch (error) {
            console.error('Error creating todo:', error)
            throw error
        }
    },
    updateTodo: async (id, updates) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updates)
            })

            if (!response.ok) {
                throw new Error('Failed to update todo')
            }

            return response.json()
        } catch (error) {
            console.error('Error updating todo:', error)
            throw error
        }
    },
    toggleTodo: async (id, completed) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed })
            })

            if (!response.ok) {
                throw new Error('Failed to toggle todo')
            }

            return response.json()
        } catch (error) {
            console.error('Error toggling todo:', error)
            throw error
        }
    },
    deleteTodo: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error('Failed to delete todo')
            }

            return response.json()
        } catch (error) {
            console.error('Error deleting todo:', error)
            throw error
        }
    }

}