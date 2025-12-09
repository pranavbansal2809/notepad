import axios from 'axios';

// Create an axios instance that points to our proxied API
const apiClient = axios.create({
  baseURL: '/api',
});

// Fetches all notes
export const getNotes = async () => {
  try {
    const response = await apiClient.get('/notes');
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

// Creates a new note
// noteData should be an object, e.g., { title: "New", content: "" }
export const createNote = async (noteData) => {
  try {
    const response = await apiClient.post('/notes', noteData);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

// Updates an existing note
// noteData should be an object, e.g., { title: "Updated", content: "..." }
export const updateNote = async (id, noteData) => {
  try {
    const response = await apiClient.put(`/notes/${id}`, noteData);
    return response.data;
  } catch (error) {
    console.error(`Error updating note ${id}:`, error);
    throw error;
  }
};

// Deletes a note
export const deleteNote = async (id) => {
  try {
    const response = await apiClient.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting note ${id}:`, error);
    throw error;
  }
};