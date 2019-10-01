import { google, sheets_v4 } from 'googleapis';

import { authorize } from './sheet.auth';
import { isUndefined } from 'util';

type Sheets = sheets_v4.Sheets;
type Sheet = sheets_v4.Schema$Sheet;
type GridData = sheets_v4.Schema$GridData;
type RowData = sheets_v4.Schema$RowData;
type CellData = sheets_v4.Schema$CellData;
type CellFormat = sheets_v4.Schema$CellFormat;
type Color = sheets_v4.Schema$Color;
type Value = sheets_v4.Schema$ExtendedValue;

const getSheetRequest = () => new Promise<Sheets>(async (resolve) => {
  const auth = await authorize();
  const sheet = google.sheets({ auth, version: 'v4' });
  resolve(sheet);
});

const getValues = async (spreadsheetId: string, range: string) => {
  const req = await getSheetRequest();
  const res = await req.spreadsheets.values.get({ spreadsheetId, range });
  const result = res.data.values;

  if (isUndefined(result)) {
    return [[]];
  }
  return result;
};

const getSheet = async (spreadsheetId: string, range: string) => {
  const req = await getSheetRequest();
  const body = {
    spreadsheetId,
    ranges: [range],
    includeGridData: true,
  };
  const res = await req.spreadsheets.get(body);
  const sheet = (res.data.sheets as Sheet[])[0];
  return sheet;
};

const getCell = ({ data }: Sheet) => {
  if (isUndefined(data)) {
    return undefined;
  }
  const [{ rowData }] = data as GridData[];
  if (isUndefined(rowData)) {
    return undefined;
  }
  const [{ values }] = rowData as RowData[];
  if (isUndefined(values)) {
    return undefined;
  }
  const [cell] = values as CellData[];
  return cell;
};

const getValue = (cell: CellData) => {
  const value = cell.effectiveValue as Value;
  return value;
}

const getColor = (cell: CellData) => {
  const format = cell.effectiveFormat as CellFormat;
  const color = format.backgroundColor as Color;
  return color;
};

export const getProducers = async () => {
  const sheetId = '13H3y7Q3wW3_mUE9JRI5nl7yMni9PZT3HvKj1j5yDsEY';
  const range = '1.노래자랑P DB!B3:B';
  const values = await getValues(sheetId, range);

  return values.map((value: any[]) => value[0]);
};

export const getEpisodeData = async (episode: number, number: number) => {
  const sheetId = '1OTsbp25-2rpwf2nUY4JDMknDfEgw5ybrkvFyvDEdC38';
  const episodeChar = String.fromCharCode(65 + episode - 70);
  const range = `시즌 8!${episodeChar}${number + 1}`;
  const sheet = await getSheet(sheetId, range);
  const cell = getCell(sheet);
  if (isUndefined(cell)) {
    return undefined;
  }
  const red = getColor(cell).red as number;
  const rawValue = getValue(cell).stringValue as string;
  if (isUndefined(rawValue)) {
    return undefined;
  }

  const value = rawValue.slice(number > 9 ? 4 : 3).split(' : ');
  if (value[0].startsWith('[데뷔] ')) {
    value[0] = value[0].slice(5);
  }

  return {
    producer: value[0],
    song: value[1],
    votable: red < 0.9 || red === 1,
  };
};
