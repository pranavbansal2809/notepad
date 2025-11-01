from flask import Blueprint, request, jsonify
from Model.NoteModel import db, Note

delete_note = Blueprint('delete_note', __name__)

@delete_note.route('/api/notes/<int:id>', methods=['DELETE'])
def delete_note_method(id):
    # Get the note by its ID, or return a 404 error if not found
    note = Note.query.get_or_404(id)
    
    if not note:
        return jsonify({'message': 'Note not deleted'})

    # Delete the note from the database
    db.session.delete(note)
    db.session.commit()
    
    # Return a success message
    return jsonify({'message': 'Note deleted'})