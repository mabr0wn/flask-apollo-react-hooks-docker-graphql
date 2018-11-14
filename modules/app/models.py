# sqlalchemy
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import backref, relationship
# Local
from .database import Base


class Blog(Base):
    __tablename__ = 'blog'
    id = Column(Integer, primary_key=True)
    title = Column(String)
    text = Column(String)


class Role(Base):
    __tablename__ = 'roles'
    role_id = Column(Integer, primary_key=True)
    name = Column(String)


class User(Base):
    __tablename__ = 'employee'
    id = Column(Integer, primary_key=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)
    '''
    Use default=func.now() to set the default time,
    of a user to the current time when a user record was
    created.
    ''' 
    created_on = Column(DateTime, default=func.now())
    blog_id = Column(Integer, ForeignKey('blog.id'))
    role_id = Column(Integer, ForeignKey('roles.role_id'))
    # Use cascade='delete,all' to propagate the deletion of a Blog onto its Users
    blog = relationship(
        Blog,
        backref=backref('users',
                        uselist=True,
                        cascade='delete,all'))
    role = relationship(
        Role,
        backref=backref('roles',
                        uselist=True,
                        cascade='delete,all'))