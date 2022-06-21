# Nestjs | React | Redux | TailwindCSS | MySQL | Docker | Docker-compose
JWT Login flow with Movies CRUD using  Nestjs, React, Redux, Tailwind, TailwindUI, Mysql and Docker

## How to run locally
```
- Clone the repository
- Run docker-compose up -d
```

After running, access the application at ```http://localhost:8080```

### Note: 

_Sometime it can happen that the services couldn't end up running everything due to database init took much time, hence docker timeout of execution. 
If you face that kind of issue please re-run ```docker-compose up -d``` which will end up running all the services with
Database initialization._

_This is case for the first time run only. After that, onwards just ```docker-compose start``` will work fine_

## Services:
Once the services are running successfully, the application is exposed to the ```HOST``` as follows:

* DB: http://localhost:3608
* Backend: http://localhost:3000
* Frontend: http://localhost:8080

## Additional Information:
* Credentials and port mappings can be found in root folders ```.env``` file; 
* Authentication is Done with ```JWT Token``` validation.
* Authenticated route requires ```Roles``` decorator.
* States are maintained by ```Redux```
* Frontend is done with ```Tailwind```
* Movie listing has the functionality for Adding and Editing specific movies.
* Database config has `synchronise: true` enabled - which is only applicable to local development



