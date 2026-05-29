// TODO
// [x] Change implementation to be class based with create, update, delete, and get functions.
// [x] Instantiate for each json file and export instance. For example, export const siteClient = new DatabaseClient('Site');



import { siteData, alertData, alertResolutionData, brandData, claimAuditData, claimNoteData, pendingUserInviteData, userData, warrantyClaimData } from '../../data/data.js';
import { authClient } from '../lib/auth-client';

const ACTING_USER_STORAGE_KEY = 'actingUserId';

function loadActingUserId() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACTING_USER_STORAGE_KEY);
}

function saveActingUserId(userId) {
  if (typeof window === 'undefined') return;
  if (userId === null || typeof userId === 'undefined') {
    localStorage.removeItem(ACTING_USER_STORAGE_KEY);
  } else {
    localStorage.setItem(ACTING_USER_STORAGE_KEY, String(userId));
  }
  window.dispatchEvent(new Event('acting-user-changed'));
}

let actingUserId = loadActingUserId();

class DatabaseClient {
    constructor(fileName) {
        this.fileName = fileName;
        this.fetch();
    }

    async create(data) {
        // Create a new entry
        await this.fetch();
        this.data.push(data);
        await this.save();
        return data;
    }

    async fetch() {
        // Fetch data from the source
        this.data = readJsonFile(this.fileName);
    }

    async get() {
        // Get all entries or a specific entry by id
        // [ ] Rewrite this so that it fetches data here. Will be needed when data is changed to fetch new data from the soruce
        //     Means that the constructor should call this.get instead of readJsonFile directly
        await this.fetch();
        return this.data
    }

    async update(id, data) {
        // Implementation for updating data
        await this.fetch();
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error(`Item with id ${id} not found`);
        }
        this.data[index] = { ...this.data[index], ...data };
        await this.save();
    }

    async delete(id) {
        // Implementation for deleting data
        await this.fetch();
        this.data = this.data.filter(item => item.id !== id);
        await this.save();
    }

    async me() {
        if (this.fileName !== 'User') {
            throw new Error('me() is only available on the User client');
        }

        // Fetch Better Auth session client-side
        const session = await authClient.getSession();
        const loggedInEmail = session?.data?.user?.email;

        if (actingUserId) {
            const result = await this.query('*', `id=${actingUserId}`);
            const dbUser = Array.isArray(result) ? result[0] : result;
            if (dbUser) {
                // If acting as a user that corresponds to the current session, merge session details
                const isSessionUser = loggedInEmail && dbUser.email === loggedInEmail;
                return {
                    ...dbUser,
                    must_change_password: isSessionUser
                        ? (session?.data?.user?.mustChangePassword ?? session?.data?.user?.must_change_password ?? dbUser.must_change_password ?? false)
                        : (dbUser.must_change_password ?? false),
                    full_name: dbUser.full_name || `${dbUser.first_name || ''} ${dbUser.last_name || ''}`.trim() || 'User'
                };
            }
            return dbUser;
        }

        if (loggedInEmail) {
            const result = await this.query('*', `email=${loggedInEmail}`);
            if (result && (Array.isArray(result) ? result.length > 0 : true)) {
                const dbUser = Array.isArray(result) ? result[0] : result;
                return {
                    ...dbUser,
                    must_change_password: session?.data?.user?.mustChangePassword ?? session?.data?.user?.must_change_password ?? dbUser.must_change_password ?? false,
                    full_name: dbUser.full_name || `${dbUser.first_name || ''} ${dbUser.last_name || ''}`.trim() || 'User'
                };
            }
            // Fallback: Map the Better Auth user details to the schema expected by the frontend
            const authUser = session.data.user;
            return {
                id: authUser.id,
                email: authUser.email,
                first_name: authUser.firstName || authUser.name?.split(' ')[0] || 'User',
                last_name: authUser.lastName || authUser.name?.split(' ')[1] || '',
                full_name: authUser.name || `${authUser.firstName || ''} ${authUser.lastName || ''}`.trim() || 'User',
                custom_role: authUser.customRole || 'Processor',
                role: authUser.role || 'user',
                must_change_password: authUser.mustChangePassword ?? authUser.must_change_password ?? false
            };
        }

        return null;
    }

    setTestingUser(userId) {
        if (this.fileName !== 'User') {
            throw new Error('setTestingUser() is only available on the User client');
        }
        actingUserId = userId;
        saveActingUserId(userId);
    }

    clearTestingUser() {
        if (this.fileName !== 'User') {
            throw new Error('clearTestingUser() is only available on the User client');
        }
        actingUserId = null;
        saveActingUserId(null);
    }

    getActingUserId() {
        if (this.fileName !== 'User') {
            throw new Error('getActingUserId() is only available on the User client');
        }
        return actingUserId;
    }

    async save() {
        // Implementation for saving data back to the source
        // For now, replace the variable in this file. In the future, we can write to the JSON file or use a real database.
        if (this.fileName === 'Site') {
            siteData[0] = this.data;
        }
        else if (this.fileName === 'Alert') {
            alertData[0] = this.data;
        }
        else if (this.fileName === 'AlertResolution') {
            alertResolutionData[0] = this.data;
        }
        else if (this.fileName === 'Brand') {
            brandData[0] = this.data;
        }
        else if (this.fileName === 'ClaimAudit') {
            claimAuditData[0] = this.data;
        }
        else if (this.fileName === 'ClaimNote') {
            claimNoteData[0] = this.data;
        }
        else if (this.fileName === 'PendingUserInvite') {
            pendingUserInviteData[0] = this.data;
        }
        else if (this.fileName === 'User') {
            userData[0] = this.data;
        }
        else if (this.fileName === 'WarrantyClaim') {
            warrantyClaimData[0] = this.data;
        }
    }

    async query(select='*', where="") {
        // Implementation for querying data with select and where clauses
        await this.fetch();
        let data = this.data;
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

    async filter(filterBy, orderBy="") {
        // filterBy is an object with key as the field to filter by and value as the value to filter for. For example, { site_id: 1, brand: 'Brand A' }
        await this.fetch();
        let data = this.data;
        Object.entries(filterBy).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                data = data.filter((item) => {
                    const itemValue = item[key];
                    if (itemValue === undefined || itemValue === null) {
                        return false;
                    }
                    return String(itemValue) === String(value);
                });
            }
        });
        // Sort by orderBy field if provided. orderBy is a string in the format "field"
        if (orderBy) {
            data.sort((a, b) => {
                const aValue = a[orderBy];
                const bValue = b[orderBy];
                if (aValue === undefined || aValue === null) return 1;
                if (bValue === undefined || bValue === null) return -1;
                if (aValue < bValue) return -1;
                if (aValue > bValue) return 1;
                return 0;
            });
        }
        return data;
    }
        
}

class SiteClient extends DatabaseClient {
    constructor() {
        super('Site');
        // format data in brands and brand rates to be stored into an array
    }
  }


class DatabaseClients {
    constructor() {
        this.clients = {};
        const fileNames = ['Alert', 'AlertResolution', 'Brand', 'ClaimAudit', 'ClaimNote', 'PendingUserInvite', 'User', 'WarrantyClaim', 'Site'];

        fileNames.forEach((fileName) => {
            const client = fileName === 'Site' ? new SiteClient() : new DatabaseClient(fileName);
            this.clients[fileName] = client;
            this[fileName] = client;
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
  else if (fileName === 'User') {
    return userData[0];
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