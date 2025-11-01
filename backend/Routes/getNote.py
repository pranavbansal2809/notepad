from flask import Blueprint, request, jsonify
from Model.NoteModel import db, Note

get_note = Blueprint('get_note', __name__)

@get_note.route('/api/notes', methods=['GET'])
def get_note_method():
    # Query the database for all notes, ordered by newest first
    notes = Note.query.order_by(Note.created_at.desc()).all()
    
    # Convert the list of Note objects to a list of dictionaries
    # using our 'to_json' helper method
    return jsonify([note.to_json() for note in notes])


