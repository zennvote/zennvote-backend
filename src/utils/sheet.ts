import { google, sheets_v4 } from 'googleapis';

import { authorize } from './sheet.auth';
import { isUndefined } from 'util';

const getSheet = () => new Promise<sheets_v4.Sheets>(async (resolve) => {
  const auth = await authorize();
  const sheet = google.sheets({ auth, version: 'v4' });
  resolve(sheet);
});

const getValues = async (spreadsheetId: string, range: string) => {
  const sheets = await getSheet();
  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  const result = response.data.values;

  if (isUndefined(result)) {
    return [[]];
  }
  return result;
};

export const getProducers = async () => {
  const sheetId = '13H3y7Q3wW3_mUE9JRI5nl7yMni9PZT3HvKj1j5yDsEY';
  const range = '1.노래자랑P DB!B3:B';
  const values = await getValues(sheetId, range);

  return values.map((value: any[]) => value[0]);
};
