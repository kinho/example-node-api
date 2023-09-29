# <b>MISSION BRASIL API</b>


### Description
Mission Brasil challenge backend API.


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


### Running the api: localhost
```bash
# localhost:3000/
$ docker-compose up

# to clean up
$ docker compose down -v
$ docker rmi -f $(docker images -a -q)
```
