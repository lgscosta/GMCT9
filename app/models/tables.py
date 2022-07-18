from app import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    yearIn = db.Column(db.Integer)

    def __init__(self, username, password, name, email, yearIn):
        self.username = username
        self.password = password
        self.name = name
        self.email = email
        self.yearIn = yearIn


    def __repr__(self):
        return "<User %r>" % self.username