Example Flask+SQLAlchemy Project
================================

This example project demos integration between Graphene, Flask and SQLAlchemy. The project contains two models, one named `Blog` and another named `User`.

[](https://github.com/graphql-python/graphene-sqlalchemy/tree/master/examples/flask_sqlalchemy#getting-started)Getting started
------------------------------------------------------------------------------------------------------------------------------

First you'll need to get the source of the project. Do this by cloning the whole Graphene repository:

```source-shell
# Get the example project code
git clone https://github.com/graphql-python/graphene-sqlalchemy.git
cd graphene-sqlalchemy/examples/flask_sqlalchemy
```

It is good idea (but not required) to create a virtual environment for this project. We'll do this using [virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/) to keep things simple, but you may also find something like [virtualenvwrapper](https://virtualenvwrapper.readthedocs.org/en/latest/) to be useful:

```source-shell
# Create a virtualenv in which we can install the dependencies
virtualenv env
source env/bin/activate
```

Now we can install our dependencies:

```source-shell
pip install -r requirements.txt
```

Now the following command will setup the database, and start the server:

```source-shell
./app.py

```

Now head on over to <http://127.0.0.1:4000/graphql> and run some queries!