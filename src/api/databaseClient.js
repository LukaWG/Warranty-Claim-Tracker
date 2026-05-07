import fs from 'fs';
import siteData from '/data/data.js';

const dataFolder = '/data';

function getJsonFilePath(fileName) {
    const path = `${dataFolder}/${fileName}.json`;
    alert(path);
    return path;
}

async function readJsonFile(fileName) {
  if (fileName === 'Site') {
    return siteData[0];
  }
  const filePath = getJsonFilePath(fileName);
  const fileContents = await fs.promises.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

async function writeJsonFile(fileName, data) {
  const filePath = getJsonFilePath(fileName);
  const jsonString = JSON.stringify(data, null, 2);
  await fs.promises.writeFile(filePath, jsonString, 'utf8');
}

/**
 * 
 * @param {string} fileName 
 * @param {string} select
 * @param {string} where - format: "key=value"
 */
export async function getData(fileName, select='*', where="") {
  let data = await readJsonFile(fileName);

  if (where) {
    const [key, value] = where.split('=');
    if (key && typeof value !== 'undefined') {
      const filterKey = key.trim();
      const filterValue = value.trim();
      data = data.filter((item) => {
        const itemValue = item[filterKey];
        if (itemValue === undefined || itemValue === null) {
          return false;
        }
        return String(itemValue) === filterValue;
      });
    }
  }
  if (select === '*') {
    return data;
  }
  return data.map((item) => {
    const selected = {};
    select.split(',').forEach((key) => {
      selected[key.trim()] = item[key.trim()];
    });
    return selected;
  });
}