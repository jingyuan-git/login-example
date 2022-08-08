# system-monitoring-tools

## 1. Project Introduction
    
   - The system-monitoring-tools project based on react and gin, which separates the front and rear of the full stack. The project can monitor the basic information of the system.

## 2. How to Run in Development Environment

-  Required

   - PostgreSQL database
   - gin
   - react
   - IDE recommendation: VSCode
   - docker-compose
  

    ```bash
    # clone the project
    git clone https://github.com/jingyuan-git/pomotodo

    # create an database for pomotodo in PostgreSQL
    # and than will write database-related information into the configuration
    # in `server/conf/app.ini`
    ``` 

### 2.1 server project

- conf

    ```bash
    You should modify `server/conf/app.ini`

    [server]
    ; debug or release
    RunMode = debug
    ; Host = localhost
    HttpPort = 8000
    ...

    [database]
	Type = postgres
	User = postgres
	Password = root
	DevHost = localhost
	ProdHost = pgsql
	Port = 5432
	Name = api
	TimeZone = Australia/Melbourne
    ...
    ```

- build and run

    ``` bash
    cd server

    # use go mod And install the go dependency package
    go mod tidy

    # Compile 
    go build -o server main.go (windows the compile command is go build -o server.exe main.go )

    # Run binary
    ./server --env dev (windows The run command is ./server.exe --env dev)
    ```

- Project information and existing API

    ```
    [GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
    - using env:   export GIN_MODE=release
    - using code:  gin.SetMode(gin.ReleaseMode)

	[GIN-debug] POST   /api/v1/users/login       --> server/routers/v1.Login (6 handlers)
	[GIN-debug] POST   /api/v1/users/register    --> server/routers/v1.Register (6 handlers)
	[GIN-debug] GET    /api/v1/menu/list         --> server/routers/v1.GetMenus (6 handlers)
	[GIN-debug] GET    /api/v1/dashboard/list    --> server/routers/v1.GetDashboard (6 handlers)
    Listening port is 8000
    ```

### 2.2 web project

- Config
    ```
    You can config in `.env.development` or `.env.production`, for server api.

    NODE_ENV=development
    VITE_APP_BASE_URL = 'http://127.0.0.1:8000'
    ```

- Project setup

    ```
    cd react-ts
    npm install
    ```

- Compiles and hot-reloads for development

    ```
    npm run dev
    ```

- Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 3. Deployment in Production Environment

- up or down docker container

    ```
    docker-compose up
    ## to rebuild this image
    docker-compose up --build
    
    docker-compose down
    ```

# 4. Project Display
- [Web Address](http://101.200.132.209:18080/)
- [PG Admin Address](http://101.200.132.209:15050/)
