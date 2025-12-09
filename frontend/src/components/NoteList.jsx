import React from 'react';

    function NoteList({ notes, onCreateNote, onSelectNote, selectedNoteId }) {
      
      // Helper to format date
      const formatDate = (isoString) => {
        return new Date(isoString).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        });
      };

      return (
        <div className="w-full md:w-1/3 lg:w-1/4 h-full border-r border-gray-200 bg-gray-50 flex flex-col">
          {/* Header and New Note Button */}
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={onCreateNote}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-colors duration-150"
            >
              + New Note
            </button>
          </div>
          
          {/* Notes List */}
          <div className="overflow-y-auto flex-grow">
            {notes.length === 0 ? (
              <p className="text-gray-500 text-center p-4">No notes yet.</p>
            ) : (
              <ul>
                {notes.map((note) => (
                  <li key={note.id}>
                    <button
                      onClick={() => onSelectNote(note.id)}
                      className={`w-full text-left p-4 hover:bg-gray-100 ${
                        selectedNoteId === note.id ? 'bg-blue-100' : ''
                      }`}
                    >
                      <h3 className="font-semibold text-gray-800 truncate">
                        {note.title || 'Untitled'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(note.created_at)}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
    }

    export default NoteList;