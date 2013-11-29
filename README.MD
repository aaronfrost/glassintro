#Things added in this step:
==========================

##package.json
- added the dependency: google-oauth (npm install --save google-oauth)

##app.js
- added the auth route

##routes/auth.js
- added the file
- used environment vars for the id and secret
- on auth success the token gets added to the session

##routes/index.js
- pass the token (in the session) to the template

##views/index.html
- if the access_token was passed in, render it

##Procfile
- this is a file for Heroku so that it knows what process to run

##.env
- this is where you store your environment variables.
- plain text, as such
>client_id=googleclientid
>client_secret=googlesecret
>//I will show you this in a second

#ON HEROKU

- install the heroku toolbelt
- open your terminal/command prompt for the rest
- cd into the directory with this code
- login to heroku cli
    heroku login
    //enter your heroku username and password
- commit your code to git
    git init
    git add .
    git commit -m "Initial Commit"
- create Heroku app
    heroku create
- add my ssh keys to my heroku account
    heroku keys:add
    //adds your ssh keys to your heroku account so you can commit to the git repo
- push your code to the heroku git repo
    git push heroku master
    //watch the logs. they tell you the status of the deploy

#On Google API Console
- visit https://code.google.com/apis/console/
- create a project, give it a name
- click 'API Access'
- In the "client id for web applications", click edit
- In the "redirect urls" enter the url to your heroku app
>when you executed 'heroku create' it gave you a url for your app
> example: http://fuzzy-kitten.herokuapp.com/auth
> you will also need to add this url to the 'routes/auth.js' file. if you haven't do that, do it now and you will then need to git commit and push your code again
> use the 'auth' endpoint, cause that is what we created
- Save that change
- copy the Client ID and Client secret from here

#More for Heroku
- open the terminal/command prompt
- cd to the directory of your app
- add your client id and secret to the heroku environment
    heroku config:set client_id=YOURID client_secret=YOURSECRET

#Now you can visit your code and it should work if you click the