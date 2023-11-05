const getDB = () => new Promise((resolve, reject) => {
  const databaseName = 'flagle';
  const openRequest = window.indexedDB.open(databaseName);

  openRequest.onerror = (event) => {
    console.log('数据库打开报错');
    reject(event);
  };

  openRequest.onsuccess = (event) => {
    console.log('数据库打开成功');
    resolve(openRequest.result);
  };

  openRequest.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains('guess')) {
      const objectStore = db.createObjectStore('guess', { autoIncrement: true });
      objectStore.createIndex('time', 'time', { unique: true });
      objectStore.createIndex('code', 'code', { unique: false });
      objectStore.createIndex('answer', 'answer', { unique: false });
    }
    console.log('数据库更新成功');
    resolve(db);
  };
});

export const add = ({ time, code, answer }) => new Promise((resolve, reject) => {
  getDB().then((db) => {
    const request = db.transaction(['guess'], 'readwrite')
      .objectStore('guess')
      .add({
        time,
        code,
        answer,
      });
    request.onsuccess = (event) => {
      console.log('数据写入成功');
      resolve(event);
    };

    request.onerror = (event) => {
      console.log('数据写入失败');
      reject(event);
    };
  }).catch(reject);
});

export const readAll = () => new Promise((resolve, reject) => {
  getDB().then((db) => {
    const objectStore = db.transaction('guess').objectStore('guess');

    const result = [];
    objectStore.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;

      if (cursor) {
        console.log('cursor ->', cursor.key, cursor.value, cursor.value.time, cursor.value.code, cursor.value.answer);
        result.push(cursor.value);
        cursor.continue();
      } else {
        console.log('cursor -> done');
        resolve(result);
      }
    };
  }).catch(reject);
});

const remove = (id) => {
  getDB().then((db) => {

    const request = db.transaction(['guess'], 'readwrite')
      .objectStore('guess')
      .delete(id);

    request.onsuccess = function (event) {
      console.log(`数据${id}删除成功`);
    };
  });
};

export const removeAll = () => {
  getDB().then((db) => {
    const objectStore = db.transaction('guess').objectStore('guess');
    objectStore.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        remove(cursor.key);
      } else {
        console.log('数据全部删除')
      }
    }
  });
};
