import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to add content to the database
export const putDb = async (content) => {
  // Accessing the database
  const jateDB = await openDB("jate", 1);
  // Initiating a transaction for write access
  const tx = jateDB.transaction("jate", "readwrite");
  // Accessing the object store
  const store = tx.objectStore("jate");
  // Adding content to the object store
  const request = store.put({ id: 1, value: content });
  // Confirming the operation
  const result = await request;
  console.log("Data saved to the database", result);
};

// Method to retrieve all content from the database
export const getDb = async () => {
  // Accessing the database
  const jateDB = await openDB("jate", 1);
  // Initiating a transaction for read-only access
  const tx = jateDB.transaction("jate", "readonly");
  // Accessing the object store
  const store = tx.objectStore("jate");
  // Getting all content from the object store
  const request = store.getAll();
  // Confirming the operation and returning the result
  const result = await request;
  console.log("Data read from database", result);
  return result.value;
};

initdb();
