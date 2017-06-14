[React Starter Kit](https://www.reactstarterkit.com) is an opinionated boilerplate for web

##How to run Docker

### Run the app in your local docker container with real time code changes
### Step 1 - Build
  `./start-local build`
### Step 2 - Up and run
  `./start-local up`

### Go into the container
  `docker run -it sof-web:local /bin/sh`

### Build the docker image for remote environments and CICD
- use following files

  `docker/docker-compose.remote.yml`
  `docker/Dockerfile.local`
