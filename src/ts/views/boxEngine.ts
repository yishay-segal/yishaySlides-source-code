import AddNewBox from "./addBox";
import { mainElems } from "./base";
import * as editView from "./editBox";
import { BoxEngineInterface, item } from "./interface&objs";
import { getDelateBox } from "./rightClickEvents";

export default class BoxEngine implements BoxEngineInterface {
    newBox: editView.BoxEdit;
    addbox: AddNewBox;
    id: string;

    constructor() {
        this.newBox = new editView.BoxEdit();
        this.addbox = new AddNewBox();
    }

    setEvents() :void {
        editView.focusOnEdit();
        editView.dragBox();
        [...document.querySelectorAll('.box-cont')].forEach(elem => {
            editView.placeCircles(elem as SVGSVGElement);
            editView.drawVirtulLines(elem as SVGSVGElement);
            editView.resizeInnerBox(elem as SVGSVGElement);
        });
        [...document.querySelectorAll('circle')].forEach((elem) => {
            elem.addEventListener('mouseup', editView.mouseUp);
        });
        // this.newBox.on('click', editView.unfocusEdit);
        this.newBox.on('mousedown', editView.mouseDownEvent);
        // this.newBox.on('mouseup', editView.mouseUp);
    }

    addNewBox(saveBox?: item): void {
        const oldBox = document.querySelector(`[data-id="${this.id}"]`);
        if (oldBox) {
            oldBox.classList.add('dis-none');
        }
        const elems = this.addbox.render(saveBox);
        const appendBoxFilm = document.querySelector('.film-big-svg');
        mainElems.slidesEdit.insertAdjacentHTML('afterbegin', elems.box);
        appendBoxFilm.insertAdjacentHTML('beforeend', elems.sideFile);
        this.id = elems.id;
        if (saveBox) {
            const currentElem = mainElems.slidesEdit.querySelector(`[data-id="${this.id}"]`);
            currentElem.querySelector('#edit_box textarea').value = saveBox.text.editBoxText;
            currentElem.querySelector('#edit_box2 textarea').value = saveBox.text.editBoxText2;
        }
        editView.createNewBoxSide(this.id)
    }

    delateBox() :SVGGElement {
        const delateBox: SVGGElement = getDelateBox();
        editView.delateBox(delateBox);
        return delateBox;
    }
 
    render() :void {
        const svg = this.newBox.render();
        mainElems.slidesEdit.insertAdjacentHTML('afterbegin', svg);
        this.id = this.newBox.id;
    }
}