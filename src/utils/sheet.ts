import { google } from 'googleapis';

import { authorize } from './sheet.auth';

const getValues = (spreadsheetId: string, range: string) => {
  return new Promise<any>(async (resolve, reject) => {
    const auth = await authorize();
    const sheets = google.sheets({ auth, version: 'v4' });
    sheets.spreadsheets.values.get({ spreadsheetId, range }, (err: Error, value: any) => {
      if (err) {
        reject(err);
      }
      resolve(value.data.values);
    });
  });
};

export const getProducers = async () => {
  const sheetId = '13H3y7Q3wW3_mUE9JRI5nl7yMni9PZT3HvKj1j5yDsEY';
  const range = '1.노래자랑P DB!B3:B';
  const values = await getValues(sheetId, range);

  return values.map((value: any[]) => value[0]);
};
