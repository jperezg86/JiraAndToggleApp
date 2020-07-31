import App from './app';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import JiraController from './controllers/jira-controller';
import * as dotEnv from 'dotenv';
import ToggleController from './controllers/toggl-controller';

const result = dotEnv.config();
if(result.error) {
    throw result.error;
}

const app = new App({
    port : 3000,
    controllers : [
        JiraController.getInstance(),
        ToggleController.getInstance()
    ],
    middleWares : [
        bodyParser.json(),
        bodyParser.urlencoded({extended : true}),
        cors()
    ]
});

app.listen();