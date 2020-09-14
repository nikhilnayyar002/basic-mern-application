# MERN Example

<br>

**Live URL:** <del>https://my-test-app-002.herokuapp.com/</del>
> The live url is disabled due the issue [#3](https://github.com/nikhilnayyar002/basic-mern-application/issues/3)
<br>

## Setup

* Define the configs for server and react-app in ```src/global.config.json``` and corresponding ```src/global.config.ts```.

    > A mongodb url is predefined in this example. You may specify your own if you want.

* for react-app do 
    ```
    npm install
    ```
* for server do 
    ```
    cd server && npm install
    ```

## Running
For consistency we will run **server** on ```port 3000``` *(value 3000 is defined in file **global.config.json**)* and **react-app** on  ```port 3001``` *(value 3001 is defined in file **.env.development**)*. The **react-app** will proxy requests to ```port 3000```. The proxy configeration is defined in ```src/setupProxy.js```.

* First lets run the server.
    ```
    cd server && npm run dev
    ```
* then react-app:
    ```
    cd .. && npm run start
    ```

## Building
Lets say we have to host aur MERN app to heroku. For that follow the steps:
* build the react-app and move the build files from **build** folder to **server/public** folder:
    ```
    npm run build-react
    ```
* copy ```src/global.config.json``` and ```src/global.config.ts``` to ```server/src/config``` so that the server always remain upto date with configeration files.

    >server uses same configeration file as react-app.

    ```
    npm run copy-config
    ```
* copy the contents inside ```server``` folder (i.e ```server/*.*```)  to the heroku project root directory (containing ```.git``` folder). 
    ```
    git add -A
    git commit -m "released app vX.X"
    git push heroku master
    ```
    >heroku will automatically install packages and then run ***build*** script defined inside ```package.json```.

