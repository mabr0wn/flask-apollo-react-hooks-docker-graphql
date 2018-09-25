### Project Layout
Create a project directory and enter it:

```
mkdir flask-tutorial
cd flask-tutorial
```
Then follow the [installation instructions](http://flask.pocoo.org/docs/1.0/installation/) to set up a Python virtual environment and install Flask for your project.

The tutorial will assume you’re working from the `flask-tutorial` directory from now on. The file names at the top of each code block are relative to this directory.

---

A Flask application can be as simple as a single file.

hello.py

```python
from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, World!'
```


blog using [Flask](http://flask.pocoo.org/docs/1.0/tutorial/factory/)
