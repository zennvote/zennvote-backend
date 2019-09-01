import { readFilePromise, writeFilePromise } from './file';
import { createInterface } from 'readline';
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

export const authorize = async () => {
  const { installed } = await getCredentials();
  const { client_secret, client_id, redirect_uris } = installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const token = await getToken(oAuth2Client);

  oAuth2Client.setCredentials(JSON.parse(token));
  return oAuth2Client;
};

const getCredentials = async () => JSON.parse(await readFilePromise('credentials.json'));

const getToken = async (client) => {
  try {
    return await readFilePromise('token.json');
  } catch {
    await getNewToken(client);
  } finally {
    return await readFilePromise('token.json');
  }
};

const getNewToken = async (client) => {
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const code = await inputGoogleAuthCode();
  await getTokenWithGoogleAuthCode(client, code);
};

const inputGoogleAuthCode = () => new Promise<string>((resolve) => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter code: ', (code) => {
    rl.close();
    resolve(code);
  });
});

const getTokenWithGoogleAuthCode = (client: any, code: string) => new Promise((resolve, reject) => {
  client.getToken(code, async (err: any, token: any) => {
    if (err) {
      reject(err);
    }
    client.setCredentials(token);
    try {
      await writeFilePromise(TOKEN_PATH, JSON.stringify(token));
    } catch (err) {
      reject(err);
    }
  });
});
