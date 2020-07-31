import App from './app';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import JiraController from './controllers/jira-controller';
import * as dotEnv from 'dotenv';

const result = dotEnv.config();
if(result.error) {
    throw result.error;
}

const app = new App({
    port : 3000,
    controllers : [
        new JiraController()
    ],
    middleWares : [
        bodyParser.json(),
        bodyParser.urlencoded({extended : true}),
        cors()
    ]
});

app.listen();