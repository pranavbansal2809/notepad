import os
from flask import Flask, request, jsonify
from flask_cors import CORS

from Routes.createNote import create_note
from Routes.updateNote import update_note
from Routes.deleteNote import delete_note
from Routes.getNote import get_note

from Model.NoteModel import db


basedir = os.path.abspath(os.path.dirname(__file__))
instance_path = os.path.join(basedir, 'instance')
os.makedirs(instance_path, exist_ok=True)

# Initialize the Flask App
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(instance_path, "notes.db")}'
# Suppress a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

db.init_app(app)

app.register_blueprint(create_note)
app.register_blueprint(update_note)
app.register_blueprint(delete_note)
app.register_blueprint(get_note)


if __name__ == '__main__':
    # This block ensures the database tables are created
    # before the app starts running for the first time.
    with app.app_context():
        db.create_all()
    
    # Start the Flask development server on port 5000
    # The 'flask run' command will use this port
    app.run(port=5000)