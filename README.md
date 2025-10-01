# NOTES HELP

## Extensions:
- Docker (by Microsoft)
- ESLint (by Microsoft)
- Prettier – Code formatter (by Prettier)
- MongoDB for VS Code (by MongoDB)

## Creating a Docker Container:
docker run -i -t ubuntu:24.04 /bin/bash

## Setting up MongoDB in Docker:
docker run -d --name dbserver -p 27017:27017 --restart unless-stopped mongo:6.0.4

## Adding Info to Mongo DB:
```
Right Click on Container and Attach Shell
mongosh mongodb://localhost:27017/mydb

```
