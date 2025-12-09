import React, { useState, useEffect } from 'react';
    import ReactMarkdown from 'react-markdown';

    function NoteEditor({ note, onSaveNote, onDeleteNote }) {
      const [title, setTitle] = useState('');
      const [content, setContent] = useState('');

      // When the 'note' prop changes (i.e., user selects a different note),
      // update the editor's internal state.
      useEffect(() => {
        if (note) {
          setTitle(note.title);
          setContent(note.content);
        } else {
          // Clear fields if no note is selected
          setTitle('');
          setContent('');
        }
      }, [note]);

      // Handle the Save button click
      const handleSave = () => {
        onSaveNote(note.id, { title, content });
      };

      // Handle the Delete button click
      const handleDelete = () => {
        // Show a confirmation dialog before deleting
        if (window.confirm('Are you sure you want to delete this note?')) {
          onDeleteNote(note.id);
        }
      };

      // If no note is selected, show a welcome/placeholder message
      if (!note) {
        return (
          <div className="flex-grow flex items-center justify-center bg-white p-8">
            <p className="text-xl text-gray-400">
              Select a note to view/edit, or create a new one.
            </p>
          </div>
        );
      }

      // If a note IS selected, show the editor
      return (
        <div className="flex-grow flex flex-col h-full">
          {/* Header Bar with Save/Delete Buttons */}
          <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
            <h2 className="text-xl font-semibold">Editor</h2>
            <div>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-red-600 transition-colors duration-150 mr-2"
              >
                Delete
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-green-600 transition-colors duration-150"
              >
                Save
              </button>
            </div>
          </div>
          
          {/* Editor and Preview Panes */}
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-140px)]">
            {/* Editor Pane */}
            <div className="flex flex-col p-4 border-r border-gray-200">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note Title"
                className="text-2xl font-bold p-2 mb-4 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note in Markdown..."
                className="flex-grow p-2 border border-gray-200 rounded-lg shadow-inner resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            
            {/* Preview Pane */}
            <div className="p-4 overflow-y-auto bg-white">
              <h1 className="text-2xl font-bold p-2 mb-4 border-b-2 border-transparent">
                {title || 'Preview'}
              </h1>
              {/* This 'prose' class from @tailwindcss/typography styles the markdown */}
              <ReactMarkdown className="prose lg:prose-lg max-w-none">
                {content || '*Start typing to see your markdown rendered...*'}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      );
    }

    export default NoteEditor;