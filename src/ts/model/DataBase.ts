import Slides from "./SlidesSave";

export default class DataBase {
    db: IDBDatabase;
    items: any;
    hash: string;
    constructor(hash: string) {
        this.db;
        this.hash = hash;
    }

    init() {
        console.log('init')
        return new Promise((open, close) => {
            const createDb = () => {
                return new Promise( (resolve, reject) => {
                    const req = indexedDB.open('store', 1);
                    req.onupgradeneeded = (e) => {
                        console.log(e.oldVersion);
                        const db = req.result;
                        // console.log('update', this.hash);
                        if (!db.objectStoreNames.contains('slides')) {
                            db.createObjectStore('slides', {keyPath: 'id'});
                        }
                        resolve(db);
                    };
                    req.onsuccess = () => {
                        resolve(req.result);
                    };
                    req.onblocked = reject;
                })
            }
            const db = async() => {
                const some = await createDb() as IDBDatabase;
                this.db = some;
            }
            db();
            const req = createDb();
            
            open(req);
            
        });
    }

    // getOldVer() {
    //     return new Promise((res) => {
    //         const old = window.indexedDB.open('store');
    //         old.onsuccess = () => {
    //             res(this.db = old.result);
    //             this.db.close();
    //             console.log(this.db);
    //         }
    //     })
    // }

    // test () {
    //     console.log('start test');
    //     // console.log(window.indexedDB.open('store'));
    //     // if (this.db) this.db.close();
    //     // if (!this.db)
            
    //     return new Promise ((res) => {
    //         const req = indexedDB.open('store', this.db.version + 1);
    //         console.log(this.db.version);
    //         req.onupgradeneeded = (e) => {
    //             console.log(e.oldVersion);
    //             const db = req.result;
    //             // switch(e.oldVersion) { // existing db version
    //             //     case 0:
    //             //       indexedDB.open('store', 2);
    //             //     case 1:
    //             //       indexedDB.open('store', 2);
    //             // }
    //             console.log('update', this.hash);
    //             if (!db.objectStoreNames.contains(this.hash)) {
    //                 db.createObjectStore(this.hash, {keyPath: 'id'});
    //             }
    //         };
    //         req.onsuccess = (e) => {
    //             // this.db = req.result;
    //             res(this.db = req.result);
    //         }
    //         req.onblocked = (e) => {
    //             // console.log(e.er);
    //         }
    //     });
    
    //         // const db = async() => {
    //         //     const some = await this.getOldVer() as IDBDatabase;
    //         //     someelse();
    //         //     console.log('sfjskdjfsadjfjdaskfj');
    //         // }
    //         // db();

    //         // const req = createDb();
    //         // res(req);
        
    // }



    // CreateObjectStore(dbName: string, storeName: string) {
    //     const request = indexedDB.open(dbName);
    //     request.onsuccess = function (e){
    //         const database = e.target.result;
    //         const version =  parseInt(database.version);
    //         database.close();
    //         const secondRequest = indexedDB.open(dbName, version+1);
    //         secondRequest.onupgradeneeded = function (e) {
    //             const database = e.target.result;
    //             const objectStore = database.createObjectStore(storeName, {
    //                 keyPath: 'id'
    //             });
    //             console.log(database);
    //         };
    //         secondRequest.onsuccess = function (e) {
    //             e.target.result.close();
    //         }
    //     }
    // }

    addObject(item: unknown) {
        const transaction = this.db.transaction('slides', 'readwrite');
        const slides = transaction.objectStore('slides');
        console.log('slides');
        console.log(item);

        const add = () => {
            return new Promise((resolve, reject) => {
                const req = slides.put(item);
                req.onsuccess = () => {
                    resolve(req.result);
                };
                req.onerror = () => {
                    reject(req.error);
                };
            })
        }
        add().then((res) => {
            console.log(res);
        })
    }

    deleteItem(id: string) {
        const transaction = this.db.transaction('slides', 'readwrite');
        const columns = transaction.objectStore('slides');
        columns.delete(id);
    }

    readStorage(id: string) {
        return new Promise((open) => {
            const transaction = this.db.transaction('slides', 'readwrite');
            const slides = transaction.objectStore('slides');
            const req = slides.get(id);
            req.onsuccess = () => {
                open(this.items = req.result);
            }
        })
    }
}