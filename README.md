## Requirements:
* Docker w/ Docker Compose plugin

## Quickstart:
### Overview:
Once you have downloaded the repository and configured all necessary environment variables, the application can be run in production mode using Docker Compose:
``` docker compose up ```

### Additional Configuration:
#### Environment Variables:
**NOTE:** Environment variables can be set through a command-line interface, **OR** by simply placing a .env file containing the required key/values at the root of this directory; either can be interpreted by Docker Compose.

Before running, certain environment variables **must** be set:
* MONGO_INITDB_ROOT_USERNAME
* MONGO_INITDB_ROOT_PASSWORD

If running with the "dev" profile, additional environment variables **must** be configured:
* ME_CONFIG_MONGODB_ADMINUSERNAME
* ME_CONFIG_MONGODB_ADMINPASSWORD

If you are developing, it is highly recommended to include this in your .env file in order to reduce image build times:
* OPENJ9_SCC="false"

As an example of how your .env file might look:
```
MONGO_INITDB_ROOT_USERNAME="user"
MONGO_INITDB_ROOT_PASSWORD="password"
ME_CONFIG_MONGODB_ADMINUSERNAME="user"
ME_CONFIG_MONGODB_ADMINPASSWORD="password"
OPENJ9_SCC="false"
```

#### Docker Compose Options:
Docker Compose has been configured to have two "modes":
* Production mode (``` docker compose up ```)
* Dev mode (``` docker compose --profile dev up ```)

The main difference between Production mode and Dev mode is that Mongo Express, a web interface for administering MongoDB accessed via http://localhost:8081, is only provided in Dev mode.

The credentials for logging into Mongo Express in dev mode are:
Username: admin
Password: pass

# RECOMMENDED DOCKER COMMAND FOR DEVELOPING:
docker compose --profile dev up --force-recreate --build

## TROUBLESHOOTING:
* If you are getting an issue where you cannot authenticate to MongoDB, run: ``` docker compose down -v ```

#### Development Tips:
* If network issues occur, try ``` docker compose up ``` with the following flag at the end: ``` --force-recreate ```
* If you would like to reset the database, do ``` docker volume ls``` and find the volume, then delete it with ``` docker volume rm <name of volume>```
* When you have made changes to the source code, add the ``` --build ``` flag to the end of the command to rebuild
