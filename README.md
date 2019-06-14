# Todolist_server
Todo-list web application server side code

### Update
* It can be deployed onto Docker ( 2019/06/15 )


## Develop Tool
* Node.js Express

## Usage
1. Make sure node.js has been installed
2. Run "npm install" to fetch all packages needed
3. Run "npm run watch" to launch server ready for client http request

## Deploy onto Docker
1. cd into this directory
2. Run "docker build -t <image name> ."
3. Run "docker run -p 7070:7070 -d <Image ID>"
4. Open chrome browser. Visit localhost:7070
5. Done
