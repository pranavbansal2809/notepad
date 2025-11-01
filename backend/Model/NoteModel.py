from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=True) # Content is the Markdown text
    created_at = db.Column(db.DateTime, default=datetime.now)

    # Helper method to convert a Note object to a JSON-serializable dictionary
    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            # .isoformat() converts the datetime object to a standard string
            'created_at': self.created_at.isoformat() 
        }