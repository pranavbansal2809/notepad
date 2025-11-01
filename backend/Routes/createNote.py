from flask import Blueprint, request, jsonify
from Model.NoteModel import db, Note

create_note = Blueprint('create_note', __name__)

@create_note.route('/api/notes', methods=['POST'])
def create_note_method():
    # Get the JSON data from the request body
    data = request.json
    
    # Basic validation
    if not data or 'title' not in data:
        return jsonify({'message': 'Title is required'}), 400

    # Create a new Note object
    new_note = Note(
        title=data['title'],
        content=data.get('content', '') # Default to empty string if no content
    )
    
    # Add to the database session and commit
    db.session.add(new_note)
    db.session.commit()
    
    # Return the new note as JSON with a 201 (Created) status
    return jsonify(new_note.to_json()), 201