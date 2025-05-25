from app import create_app, db
from app.models import User

app = create_app()

with app.app_context():
    test_user = User(username="admin", email="admin@example.com", role="admin")
    test_user.set_password("1234")
    db.session.add(test_user)
    db.session.commit()

    users = User.query.all()
    print(users)
