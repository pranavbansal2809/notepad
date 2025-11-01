from flask import Blueprint, request, jsonify
from Model.NoteModel import db, Note

update_note = Blueprint('update_note', __name__)

@update_note.route('/api/notes/<int:id>', methods=['PUT'])
def update_note_method(id):
    # Get the note by its ID, or return a 404 error if not found
    note = Note.query.get_or_404(id)
    
    # Get the JSON data from the request body
    data = request.json
    
    # Update the note's fields
    note.title = data.get('title', note.title)
    note.content = data.get('content', note.content)
    
    # Commit the changes to the database
    db.session.commit()
    
    # Return the updated note as JSON
    return jsonify(note.to_json())