import { google } from 'googleapis';
import { createInterface } from 'readline';
import { writeFile } from 'fs';

import { readFilePromise } from './file';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

const getCredentials = async () => JSON.parse(await readFilePromise('credentials.json'));

// NOT MINE Please refactor this later
const getNewToken = (oAuth2Client) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);

      writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
    });
  });
};

const authorize = async () => {
  const { installed } = await getCredentials();
  const { client_secret, client_id, redirect_uris } = installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const token = await readFilePromise('token.json');

  oAuth2Client.setCredentials(JSON.parse(token));
  return oAuth2Client;
};

const getValues = (spreadsheetId: string, range: string) => {
  return new Promise<any>(async (resolve, reject) => {
    const auth = await authorize();
    const sheets = google.sheets({ auth, version: 'v4' });
    sheets.spreadsheets.values.get({ spreadsheetId, range }, (err: Error, value: any) => {
      if (err) {
        reject(err);
      }
      resolve(value);
    });
  });
};

export const getProducers = async () => {
  const sheetId = '13H3y7Q3wW3_mUE9JRI5nl7yMni9PZT3HvKj1j5yDsEY';
  const range = '1.노래자랑P DB!B3:B';
  const { data: { values } } = await getValues(sheetId, range);

  return values.map(value => value[0]);
};
