# sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

# Create the engine for your db, currently using sqlite for this repo.
engine = create_engine('sqlite:///database.sqlite3', convert_unicode=True)
# Used for establishing a database session
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
'''
the `declarative_base()` callable returns a 
new base class from which all mapped classes 
should inherit. When the class definition is 
completed, a new Table and `mapper()` will have been generated.
'''                                         
Base = declarative_base()
# since we will be using a custom query
# adds additional query parameters automatically to all queries
# `https://stackoverflow.com/questions/12350807/whats-the-difference-between-model-query-and-session-querymodel-in-sqlalchemy`
Base.query = db_session.query_property()

def init_db():
    '''
    import all modules here that might define models so that
    tey will be registered properly on the metadata. Otherwise
    you will have to import them before calling init_db()
    '''
    from models import Blog, User, Role
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    # Create the fixtures
    blog1 = Blog(title='First fixture blog!', body='This is the body of the fixture blog1.')
    db_session.add(blog1)
    blog2 = Blog(title='Second fixture blog!', body='This is the body of the fixture blog2.')
    db_session.add(blog2)
    blog3 = Blog(title='Third fixture blog!', body='This is the body of the fixture blog3.')
    db_session.add(blog3)

    admin = Role(name='Administator')
    db_session.add(admin)
    blogger = Role(name='blogger')
    db_session.add(blogger)

    Matt = User(username='mabrown', blog=blog1, role=admin)
    db_session.add(Matt)
    John = User(User='jdoe', blog=blog2, role=blogger)
    db_session.add(John)
    Emily = User(User='emiller', blog=blog3, role=blogger)
    db_session.add(Emily)
    db_session.commit()