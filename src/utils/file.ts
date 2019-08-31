import { readFile } from 'fs';

export const readFilePromise = (path: string) => new Promise<string>((resolve, reject) => {
  readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});
