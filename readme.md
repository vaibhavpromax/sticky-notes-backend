
## Installation

Install my-project with npm

```bash
  git clone https://github.com/vaibhavpromax/sticky-notes-backend.git
  cd sticky-notes-backend
  npm install
```
run the following commands to create docker containers -
```bash
//create redis container
docker run --restart always -d --name redis-container -p 6379:6379 redis:latest
//create mysql container
docker run --restart always -d --name mysql-test -p 3306:3307 -e MYSQL_ROOT_PASSWORD=pass mysql:latest

// use the below command to go to your mysql container
// enter password : pass
mysql --comments --host 127.0.0.1 --port 3307 -u root -p

// inside the container use 
create database sticky_notes;
```

after this we need to create tables and seed it with data:
navigate inside backend folder and then:
```bash
cd db
// check if sequelize-cli is present 
npm install --save-dev sequelize-cli
// create the tables
npx sequelize db:migrate
// populate the tables with default data 
npx sequelize db:seed:all

```
This will create two default profiles 
username : test_user
password: user

one admin profile
username : admin
password: admin


```bash
// navigate to the root folder sticky-notes-backend and run
 npm start
```

Server should start running and listening at the PORT 8080

## DB Schema
![Schema Screenshot](https://drive.google.com/file/d/1429UkK01zEvvpWkS3irA53So4A8Wl3HB/view?usp=sharing)


