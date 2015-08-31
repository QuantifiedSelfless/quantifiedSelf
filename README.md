= Quantified Self Art Project = 
This app is the source code for the web presence and data processing infrastructure for the quantified self art project opening at CU-Boulder in April 2016.

We use a mixture of a JS front-end app using React and a Python Tornado back-end.

Please ensure pip is installed do:

`pip install requirements.txt` to get all python dependencies

Next ensure you have `node` and `npm` installed and go to the `web/` directory and type:

`npm install` to get all JS dependencies.

We are using the gulp build engine. All front-end build and maintenance should stay in `web/` so backend logistics and front-end code do not get mixed.

If you want to test front-end code...

1. run `gulp build`
2. run python -m SimpleHTTPServer 8000
3. point your browser to http://localhost:8000
4. Browse to the page you're testing
