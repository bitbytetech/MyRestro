from sqlmodel import Session, select
from app.db.database import engine
from app.models.models import User, UserRole
from app.core.security import get_password_hash

def seed_admin():
    with Session(engine) as session:
        admin = session.exec(select(User).where(User.email == "admin@myrestro.com")).first()
        if not admin:
            admin = User(
                email="admin@myrestro.com",
                hashed_password=get_password_hash("admin123"),
                full_name="System Admin",
                role=UserRole.ADMIN
            )
            session.add(admin)
            session.commit()
            print("Admin user created: admin@myrestro.com / admin123")
        else:
            print("Admin user already exists.")

if __name__ == "__main__":
    seed_admin()
