### Full-stack: Flask + react + docker + aws
[Flask](http://flask.pocoo.org/) is a very powerful framework. You can build a vast variety of systems from a very basic web application to a large platform using flask. [React](https://reactjs.org) is a very popular, easy to use & very powerful front-end development JavaScript library. [Docker](https://www.docker.com/) is an open platform for developers and system administrators to build, ship, and run distributed applications, whether on laptops, data centre VMs, or the cloud. [AWS](https://aws.amazon.com/) Amazon Web Services (AWS) is a secure [cloud](https://aws.amazon.com/what-is-cloud-computing/) services platform, offering compute power, database storage, content delivery and other functionality to help businesses scale and grow. Explore how millions of [customers](https://aws.amazon.com/solutions/case-studies/) are currently leveraging AWS cloud [products](https://aws.amazon.com/products/) and [solutions](https://aws.amazon.com/solutions/) to build sophisticated applications with increased flexibility, scalability and reliability.

```
mkdir flask-blog
cd flask-blog
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
