# WebInterface
This repository contains the front- and backend code, visualizing the analyzed data. A detailed description of this component can be found [here](https://github.com/NewsAnalyseTool/Documentation/wiki/WebInterface-Documentation).

# Quick Installation
If you just want to get a first idea of what the project looks like, you can use a test backend, which does not need any connections to a database, so it is quite easy to set up. It was originally designed so that the frontend could be implemented without waiting for the backend to be complete. Therefore it only sends back random data, but this is enough to show all functionalities.

Follow these steps to set up and run the frontend:
1) Clone the repo as usual
2) Run `npm install` in the ./ui folder to install all the necessary dependencies.
3) Now run `npm run dev` to start the application.
4) Go to the ./test_backend folder and run `bin/python app.py`.
5) The test backend should now be running and you can visit the page in your browser.
