# OZ-CSC-480-HCI-521-Spring-2024
To deploy, run:
```docker compose up```

NOTE: you may have to run mvn wrapper:wrapper from Backend/database-controller first
NOTE: if deploying to moxie or another machine with an outdated Docker version, you may have to add this field under the mongo service in the database-controller's docker-compose.yml:
```    security_opt:
        - seccomp:unconfined
      ```