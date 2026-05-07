// TODO
// [ ] Change implementation to be class based with create, update, delete, and get functions.
// [ ] Instantiate for each json file and export instance. For example, export const siteClient = new DatabaseClient('Site');



import { siteData, alertData, alertResolutionData, brandData, claimAuditData, claimNoteData, pendingUserInviteData, warrantyClaimData } from '/data/data.js';


class DatabaseClient {
    constructor(fileName) {
        this.fileName = fileName;
        this.data = readJsonFile(this.fileName);
    }

    async create(data) {
        // Create a new entry
    }

    async get() {
        // Get all entries or a specific entry by id
        return this.data
    }

    async update(id, data) {
        // Implementation for updating data
    }

    async delete(id) {
        // Implementation for deleting data
    }
}


class DatabaseClients {
    constructor() {
        this.clients = {};
        const fileNames = ['Site', 'Alert', 'AlertResolution', 'Brand', 'ClaimAudit', 'ClaimNote', 'PendingUserInvite', 'WarrantyClaim'];
        fileNames.forEach(fileName => {
            this.clients[fileName] = new DatabaseClient(fileName);
        });
    }
}

export const databaseClients = new DatabaseClients();

const dataFolder = '/data';

function getJsonFilePath(fileName) {
    const path = `${dataFolder}/${fileName}.json`;
    alert(path);
    return path;
}

function readJsonFile(fileName) {
  if (fileName === 'Site') {
    return siteData[0];
  }
  else if (fileName === 'Alert') {
    return alertData[0];
  }
  else if (fileName === 'AlertResolution') {
    return alertResolutionData[0];
  }
  else if (fileName === 'Brand') {
    return brandData[0];
  }
  else if (fileName === 'ClaimAudit') {
    return claimAuditData[0];
  }
  else if (fileName === 'ClaimNote') {
    return claimNoteData[0];
  }
  else if (fileName === 'PendingUserInvite') {
    return pendingUserInviteData[0];
  }
  else if (fileName === 'WarrantyClaim') {
    return warrantyClaimData[0];
  }
  else if (fileName === 'PendingApprovals') {
    return warrantyClaimData[0].filter(claim => claim.approval_status === 'pending_approval');
  }
  else {
    throw new Error(`Unknown file name: ${fileName}`);
  }
}

async function addData(fileName, data) {
    // Get current data
    const currentData = await readJsonFile(fileName);
    // Append new data
    const updatedData = [...currentData, ...data];
}

/**
 * 
 * @param {string} fileName 
 * @param {string} where - format: "key=value"
 * @param {Array<string>} data - format: [{key: value}, ...]
 */
async function updateData(fileName, where, data) {
    const currentData = await readJsonFile(fileName);
    // split where clause
    const [key, value] = where.split('=');
    if (!key || typeof value === 'undefined') {
        throw new Error(`Invalid where clause: ${where}`);
    }
    // Get data that matches where clause but do not update yet
    const matchingData = currentData.filter((item) => {
        const itemValue = item[key.trim()];
        if (itemValue === undefined || itemValue === null) {
            return false;
        }
        return String(itemValue) === value.trim();
    });
    // Update data in matching data with data in fomat [{key: value}, ...]
    const updatedData = matchingData.map((item) => {
        const updatedItem = { ...item };
        data.forEach((field) => {
            updatedItem[field.key] = field.value;
        });
        return updatedItem;
    });

}

export async function updateSite(siteId, data) {
    // For now, just update the variable in this file. In the future, we can write to the JSON file or use a real database.
    const siteIndex = siteData[0].findIndex(site => site.id === siteId);
    if (siteIndex === -1) {
        throw new Error(`Site with id ${siteId} not found`);
    }
    siteData[0][siteIndex] = { ...siteData[0][siteIndex], ...data };
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