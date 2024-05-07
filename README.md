# OZ-CSC-480-HCI-521-Spring-2024
To pull submodules (backend/frontend), run:
```git submodule init```

```git submodule update --recurse```

NOTE: you may have to run ```mvn wrapper:wrapper``` from Backend/database-controller before going to the next step

To deploy, run:
```docker compose up --build --force-recreate```

## Additional Tips
It is possible to run just the backend by running the above docker command from the 'Backend' directory.
This allows developing the frontend using npm start, which tracks changed as they are made for easier and faster development.

NOTE: if deploying to production, remember to set .env file in "Backend" folder (additional instructions in nested README.md)

NOTE: if deploying to moxie or another machine with an outdated Docker version, you may have to set security_opt under the mongo service in the database-controller's docker-compose.yml:
```
security_opt:
  - seccomp:unconfined
```
