### Full-stack: Flask + react + docker + aws
[Flask](http://flask.pocoo.org/) is a very powerful framework. You can build a vast variety of systems from a very basic web application to a large platform using flask. [React](https://reactjs.org) is a very popular, easy to use & very powerful front-end development JavaScript library. [Docker](https://www.docker.com/) is an open platform for developers and system administrators to build, ship, and run distributed applications, whether on laptops, data centre VMs, or the cloud. [AWS](https://aws.amazon.com/) Amazon Web Services (AWS) is a secure [cloud](https://aws.amazon.com/what-is-cloud-computing/) services platform, offering compute power, database storage, content delivery and other functionality to help businesses scale and grow. Explore how millions of [customers](https://aws.amazon.com/solutions/case-studies/) are currently leveraging AWS cloud [products](https://aws.amazon.com/products/) and [solutions](https://aws.amazon.com/solutions/) to build sophisticated applications with increased flexibility, scalability and reliability.

## IDE Setup

It's good practice to use a IDE that works with your current environment, below I set this project up using [PyCharm](https://www.jetbrains.com/pycharm/), but could easily use [VSCode](https://code.visualstudio.com/).  I choose this since we are using Python's Flask microframework as our backend.  You can choose anything that work's for you.

---

Below is the directory structure, you can follow this structure or create your own.

> **NOTE**: this is just an example of how to start your project structure, keep in mind this will change overtime.  Once this project is complete I will add the final stack image below and remove this note.

![alt text](https://i.imgur.com/Zr3ufcq.png)

- **instance** - This is located outside the app package and can hold local
    data that shouldn't be committed to version control, such as configuration secrets
    and database files.
- **app.py**: This is the entry point for the Flask web-server
- **venv**: This is to setup your virtual environment in Python, it seperates itself from the OS build.
- **requirements.txt**: Will install any Python Packages you will need for your app to run properly.
- **Dockerfile**: Dockerfile to build the docker containers.
- **docker-compose.yml & docker-compose.prod.yml**: Configuration for both development & production.
- **modules**: The directory that will contain all the modules, i.e. app, logger, etc.
- **app**: The main directory for the web server, where we build Flask.
- **dist**: Where React and other static files will serve.
- **logger**: Log errors and info into `output.log`.
