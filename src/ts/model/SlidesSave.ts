import { item, Slide } from "../views/interface&objs";

export default class Slides {
    items: any[];
    id: string;

    constructor(saveItems?: any) {
        this.items = [];
        if (saveItems) {
            this.items.push(saveItems);
        }
    }

    addSlide(id: string) {
        const slide: Slide = {
            id,
            children: [],
        }
        this.items.push(slide);
        this.id = id;
        return slide;
    }

    addItem(svg: SVGSVGElement) :Slide{
        
        const bigBox: SVGSVGElement = svg.closest('[data-id]');
        const editBoxText: string = bigBox.querySelector('#edit_box textarea').value;
        const editBoxText2: string = bigBox.querySelector('#edit_box2 textarea').value;
        const child = {
            svg: bigBox.outerHTML, 
            id: bigBox.dataset.id,
            text: {
                editBoxText,
                editBoxText2
            }
        }
        const anc: Slide = this.items.find(elem => elem.id == this.id);
        anc.children.forEach((item, index) => {
            console.log(item);
            if(item.id === child.id) {
                console.log(anc.children);
                console.log('match');
                anc.children.splice(index, 1);
                console.log(index);
            }
        })
        anc.children.push(child);
        return anc;
    }

    deleteItem(id: string){
        const anc: Slide = this.items.find(elem => elem.id == this.id);
        const index = anc.children.findIndex(elem => elem.id == id);
        anc.children.splice(index, 1);
        return anc;
    }

    /* 
    addColumn (header) {
        const box = {
            id: Date.now(),
            header,
            children: []
        }
        this.items.push(box);
        this.currentID = box.id;
        return box;
    }

    addNote(text, ancestor) {
        const note = {
            id: `${ancestor}/${Date.now()}`,
            text
        }
        const anc = this.items.find(elem => elem.id == ancestor);
        anc.children.push(note);
        return {note, anc};
    }
    */
    
}