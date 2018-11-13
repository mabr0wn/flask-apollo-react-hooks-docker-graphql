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
    from .models import Blog, User, Role
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    # Create the fixtures
    blog1 = Blog(title='Introducing Hooks', text='Hooks are a new feature proposal that lets you use state and other React features without writing a class. They’re currently in React v16.7.0-alpha.')
    db_session.add(blog1)
    blog2 = Blog(title='Introducing Redux-form', text='redux-form primarily consists of three things: A Redux reducer that listens to dispatched redux-form actions to maintain your form state in Redux. A React component decorator that wraps your entire form in a Higher Order Component (HOC) and provides functionality via props.')
    db_session.add(blog2)
    blog3 = Blog(title='Redux', text='Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience.')
    db_session.add(blog3)
    blog4 = Blog(title='GraphQL', text='GraphQL is an open-source data query and manipulation language, and a runtime for fulfilling queries with existing data. GraphQL was developed internally by Facebook in 2012 before being publicly released in 2015.  On 7 November 2018, the GraphQL project was moved from Facebook to the newly-established GraphQL foundation.')

    admin = Role(name='Administator')
    db_session.add(admin)
    blogger = Role(name='blogger')
    db_session.add(blogger)

    Matt = User(username='mabrown', blog=blog1, role=admin)
    db_session.add(Matt)
    John = User(username='jdoe', blog=blog2, role=blogger)
    db_session.add(John)
    Emily = User(username='emiller', blog=blog3, role=blogger)
    db_session.add(Emily)
    Phillip = User(username='pgonzales', blog=blog4, role=blogger)
    db_session.commit()