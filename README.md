# Setting up 
Before you try to run anything you must start by configuring an .env file (not included in the repository) in the root directory of your application 
You .env file should contain the next variables: 

```bash
#The username that created the JIRA API_KEY
JIRA_USER_NAME = algo@alguien.com
#The JIRA API KEY
JIRA_API_KEY = 123456789
#The toggl API KEY
TOGGL_API_KEY = 123456789

```


You can configure a JIRA_API_KEY [here](https://id.atlassian.com/manage-profile/security/api-tokens) (You should be logged in on Jira)

To get your toggl API_KEY you should enter to your account settings and there you have.


# Installing dependences
Once you have created the .env file install the dependences by: 
```bash
npm install
```


# Running the server project (Node JS)
To run you server side and be ready to get your endpoints just use: 
Once you have created the .env file install the dependences by: 
```bash
npm run start-server
```

# To debug in VSCode
You can also debug using VSCode by installing nodemon as global dependency, [check the documentation of nodemon to install as global dependency](https://www.npmjs.com/package/nodemon)

Once you have installed nodemon add a launch.json file under .vscode folder and add this lines: 
```bash
    {
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "name": "nodemon",
            "program": "${workspaceFolder}/NodeServer/index.ts",
            "request": "launch",
            "restart": true,
            "runtimeExecutable": "nodemon",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "type": "pwa-node"
        }
```
Then move to the debug view in VSCode and start debugin as "nodemon"


## Start front-end application (Angular)

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

