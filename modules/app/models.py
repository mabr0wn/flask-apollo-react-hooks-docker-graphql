# sqlalchemy
from sqlalchemy import Column, Datetime, ForeignKey, Integer, String, func
from sqlalchemy.orm import backref, relationship
# local
from database import Base

class Blog(Base):
    __tablename__ = 'blog'
    id = Column(Integer, primary_key=True)
    title = Column(String)
    Body = Column(String)

class Role(Base):
    __tablename__ = 'roles'
    role_id = Column(Integer, primary_key=True)
    name = Column(String)

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    username = Column(String)
    '''
    Use default=func.now() to set the default time,
    of a user to the current time when a user record was
    created.
    ''' 
    created_on = Column(Datetime, default=func.now())
    role_id = Column(Integer, ForeignKey('roles.role_id'))
    # Use cascade='delete,all' to propagate the deletion of a Blog onto its Users
    blog = relationship(
        Blog,
        backref=backref('user',
                        useList=True,
                        cascade='delete,all'))
    role = relationship(
        Role,
        backref=backref('roles',
                        useList=True,
                        cascade='delete,all'))

