cd front-end && npm install
cd ../server && npm install
cd ../
nohup node server/server.js &
cd front-end && npm start