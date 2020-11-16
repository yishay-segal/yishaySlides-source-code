import "../sass/main.scss";
import { edit_boxElems, elements, mainElems,} from "./views/base";
import * as editView from "./views/editBox";
import * as headerView from "./views/headerView";
import { clickOnBar, closeFullScreen, openFullscreen, showPresentBar } from "./views/presentView";
import * as rightClickEvents from "./views/rightClickEvents";
import BoxEngine from "./views/boxEngine";
import DataBase from "./model/DataBase";
import Slides from "./model/SlidesSave";
import { item, State } from "./views/interface&objs";
import { addSaveBox } from "./views/addSaveBox";

const state: State = {};
// const dataBase = new DataBase();
// dataBase.init();

window.addEventListener('hashchange', () => {
    console.log(window.location.hash);
});

// header controller
if(elements.humMenu) {
    elements.humMenu.addEventListener('click', headerView.openNav);
    window.addEventListener('click', headerView.closeNav);
    elements.headerInput.addEventListener('focus', headerView.focus);
    elements.headerInput.addEventListener('blur', headerView.unfocus);
    elements.appsDiv.addEventListener('click', (e) => {headerView.dropMenu(elements.appsDiv, elements.dropMenu, e)});
    elements.accDiv.addEventListener('click', (e) => {headerView.dropMenu(elements.accDiv, elements.dropMenuAc, e)}); 
    (async() => {
        const getDataBase = () => {
            return new Promise((res) => {
                const req = indexedDB.open('store');
                req.onsuccess = () => {
                    res(req.result);
                }
            });
        }
        const db = await getDataBase() as IDBDatabase;
        const transaction = db.transaction('slides', 'readwrite');
        const slides = transaction.objectStore('slides');
        const getCount = () => {
            return new Promise(res => {
                const req = slides.count();
                req.onsuccess = () => {
                    res(req.result);
                }
            });
        };
        const count = await getCount();
        if (count) {
            const getObjects = () => {
                return new Promise(res =>{
                    const req = slides.getAll();
                    req.onsuccess = () => {
                        res(req.result);
                    }
                })
            }
            const objs = await getObjects() as [];
            objs.forEach(item => {
                addSaveBox(item['id']);
            });
        }
    })()
}

const checkForDataBase = (db: IDBDatabase) => {
    return new Promise((open) => {
        const transaction = db.transaction('slides', 'readwrite');
        const slides = transaction.objectStore('slides');
        const req = slides.getAll();
        req.onsuccess = () => {
            open();
        }
    })
}



// const db = () => {
//     return new Promise((r) => {
//         const db = window.indexedDB.open('store');
//         db.onsuccess = () => {
//             r(db.result);
//         };
//         // r(window.indexedDB.open('stroe'));
//     });
// }

// const getdb = async() => {
//     const storage = await db() as IDBDatabase;
//     console.log(storage);
//     // db().then((res) => {console.log(res)});
// }
// getdb();

export const boxEngine = new BoxEngine();
if (document.querySelector('.slides')) {
    let hash = (window.location.hash).replace('#', '');
    let newObj = false;
    if (!hash) {
        hash = Date.now().toString();
        window.location.hash = hash;
        newObj = true;
        console.log(hash);
    } 
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.closest('.box__start')) {
            console.log('work');
            // state.dataBase.test();
        }
    });
    (async() => {
        console.log(hash);
        state.dataBase = new DataBase(hash);
        await state.dataBase.init();
        await state.dataBase.readStorage(hash);
        console.log(state.dataBase.items);
        state.slides = new Slides(state.dataBase.items);
        const item = state.slides.addSlide(hash);
        if (!hash) state.dataBase.addObject(item);
        // await state.dataBase.getOldVer();
        // await state.dataBase.test();
        console.log('sdfjsdkfjsf');
        // if (state.dataBase.db) {
            // console.log('exict');
            //  state.dataBase.CreateObjectStore('store', 'yishay');
            // window.indexedDB.open('store', state.dataBase.db.version + 1);
        // }
        // console.log(window.indexedDB.open('store', 2));
        // await state.dataBase.createObjetStorage();
        console.log(state.dataBase.items);
        if (!newObj) {
            if (state.dataBase.items.children) {
                const firstBox = [...document.querySelectorAll('.box-film-cont')][0] as SVGGElement;
                const id = firstBox.id;
                firstBox.remove();
                mainElems.slidesEdit.querySelector(`[data-id="${id}"]`).remove();
                state.dataBase.items.children.forEach((elem: item) => {
                    boxEngine.addNewBox(elem);
                    boxEngine.setEvents();
                });
            }
        }
    }) ();

    boxEngine.render();
    boxEngine.setEvents();
    editView.createNewBoxSide(boxEngine.id);
    document.querySelector('.plus-icon').addEventListener('click', () => {
        boxEngine.addNewBox();
        boxEngine.setEvents();
        // state.dataBase.test();
    });

    let lastBox: SVGSVGElement;
    document.addEventListener('click', (e) => {
        if (editView.box) {
            const target = e.target as HTMLElement;
            if (!editView.box.contains(target)) {
                editView.unFocusBox();
                if (!state.slides) state.slides = new Slides();
                const item = state.slides.addItem(editView.box);
                state.dataBase.addObject(item);

            } else {
                if (lastBox) {
                    editView.changeFocusBetweenBox(lastBox);
                }
            }
            lastBox = editView.box;
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (editView.event) {
            editView.mouseUp(e);
            if (editView.event === 'mouseup') {
                if (!state.slides) state.slides = new Slides();
                const item = state.slides.addItem(editView.box);
                state.dataBase.addObject(item);
            }
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (editView.lastEvent) {
            console.log(editView.box);
        }
    });
    
    document.querySelector('.slides__film').addEventListener('click', (e) => {
        const target = e.target as HTMLDivElement;
        const box = target.closest('.box-film-cont');
        if (!box) {
            return;
        }
        // console.log(box);
        editView.clickOnFilmSide(box.id);
    });
    
    document.querySelector('.present__box').addEventListener('click', () => {
        openFullscreen();
    });
    
    mainElems.slidesEdit.addEventListener("fullscreenchange", (e) => {
        if (document.fullscreenElement) {
            showPresentBar();
        } else {
            closeFullScreen();
        }
    });
    
    [...document.querySelector('.overlay__cont').children].forEach(elem => {
        elem.addEventListener('click', clickOnBar);
    });
    mainElems.slidesFilm.addEventListener('contextmenu', (e) => {
        rightClickEvents.showMenu(e as MouseEvent);
    });
    document.addEventListener('click', rightClickEvents.closeMenu);
    mainElems.cutButton.addEventListener('click', () => {
        const item = boxEngine.delateBox();
        if (!state.slides) state.slides = new Slides();
        const anc = state.slides.deleteItem(item.id);
        state.dataBase.addObject(anc);
    });
}