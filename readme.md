Deployment Instruction

First Time
- npm install -g gulp-cli
- npm install -g bower

- git clone https://github.com/rajatvijay/kickstarter-helpdesk.git
- cd kickstarter-helpdesk

- npm install
- bower init
- bower install

- gulp build --appName=kickStarter --env=PRODUCTION (or DEV if you dont want uglified JS)

- Then just make your sever serve from public/kickStarter directory

Second Time and so on
- cd kickstarter-helpdesk


- git pull origin master
- gulp build --appName=kickStarter --env=PRODUCTION (or DEV if you dont want uglified JS)