import { readFile, writeFile } from 'fs';

export const readFilePromise = (path: string) => new Promise<string>((resolve, reject) => {
  readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});

export const writeFilePromise = (path: string, data: string) => new Promise((resolve, reject) => {
  writeFile(path, JSON.stringify(data), (err) => {
    if (err) {
      reject(err);
    }
    resolve();
  });
});
