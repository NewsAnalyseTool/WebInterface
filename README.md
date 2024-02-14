# WebInterface
This repository contains the front- and backend code, visualizing the analyzed data. A detailed description of this component can be found [here](https://github.com/NewsAnalyseTool/Documentation/wiki/WebInterface-Documentation).

## Quick Installation
### Requirements
- Python >= 3.11.6
- npm 10.4.0

If you just want to get a first idea of what the project looks like, you can use a test backend, which does not need any connections to a database, so it is quite easy to set up. It was originally developed so that the frontend could be implemented without waiting for the backend to be complete. Therefore it only sends back random data, but this is enough to show all functionalities.

Follow these steps to set up and run the frontend:
1) Clone the repo as usual
2) Run `npm install` in the `ui` folder to install all the necessary dependencies
3) Go into the `test_backend` folder and create a python environment with `python3 -m venv venv`
4) Activate the virtual environment with `source venv/bin/activate`
5) Now, run `pip install -r requirements.txt` to install the nesessary dependencies
6) The backend can be started with `python app.py`
7) Start the frontend with `npm run dev` back in the `ui` folder

You should now be able to see the frontend in your browser with the url `http://localhost:5173/`.

## Complete Installation
### Requirements
- npm 10.4.0
- the other components are running (have a look at the documention [here](https://github.com/NewsAnalyseTool/Documentation/wiki/))
  
If you want to host the whole project and connect the frontend to the real backend, you only need to change one thing in the frontend:

Inside the `ui` folder you will find a `config.json` file. Change the ip address and port where the frontend can reach the API of the real backend. Now run the backend with `sbt run` and you are done.
