import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import * as api from './serviceAPI'; // Import all functions from our api.js

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Data Fetching ---

  // Fetch all notes on initial component load
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const fetchedNotes = await api.getNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []); // Empty dependency array means this runs once on mount

  // --- Event Handlers ---

  const handleCreateNote = async () => {
    try {
      const newNote = await api.createNote({
        title: 'New Note',
        content: '# Start writing...'
      });
      // Add new note to the top of the list
      setNotes([newNote, ...notes]);
      // Automatically select the new note
      setSelectedNoteId(newNote.id);
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  const handleSelectNote = (id) => {
    setSelectedNoteId(id);
  };

  const handleSaveNote = async (id, updates) => {
    try {
      const updatedNote = await api.updateNote(id, updates);
      // Update the note in our local state
      setNotes(notes.map(note => 
        note.id === updatedNote.id ? updatedNote : note
      ));
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await api.deleteNote(id);
      // Remove the note from our local state
      setNotes(notes.filter(note => note.id !== id));
      // De-select the note
      setSelectedNoteId(null);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  // --- Derived State ---
  
  // Find the currently selected note object from the notes array
  const selectedNote = notes.find(note => note.id === selectedNoteId);

  // --- Render ---

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-gray-500">Loading notes...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <NoteList
        notes={notes}
        onCreateNote={handleCreateNote}
        onSelectNote={handleSelectNote}
        selectedNoteId={selectedNoteId}
      />
      <NoteEditor
        note={selectedNote}
        onSaveNote={handleSaveNote}
        onDeleteNote={handleDeleteNote}
      />
    </div>
  );
}

export default App;