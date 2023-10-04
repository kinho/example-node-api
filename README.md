# <b>EXAMPLE NODE API</b>

### Description
Simple example Nodejs API with express in a docker container.

### Requirements
- node 18
- yarn
- docker
- docker-compose

### Configuration
Create file .env in root project based on .env.example file.

### Installation
```bash
$ yarn install
```

### Running api
```bash
# localhost:3000/
$ docker-compose up

# to clean up
$ docker compose down -v
$ docker rmi -f $(docker images -a -q)
```

### Running test
```bash
$ cd test
$ npm run test
```
