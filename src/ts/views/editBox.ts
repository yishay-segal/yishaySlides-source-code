import {
    elements,
    edit_boxElems,
    edit_box2Elems, openingBox, mainElems
} from "./base";
import {
    EditBoxInterface,
    mouseMoveBigObj,
    moveLines,
} from "./interface&objs";

export class BoxEdit implements EditBoxInterface{
    id: string;
    
    on(eventType: string, func: (...rest: any) => void) {
        document.addEventListener(eventType, func);
    }

    render() : string {
        const openBox = openingBox();
        this.id = openBox.id;
        return openBox.boxOpening;
    }

}

let idSvg: string;

export function focusOnEdit(): void {
    [...document.querySelectorAll('.para-edit')].forEach((elem) => {
        elem.addEventListener('focus', focusOnElem)
    });
}
export let box: SVGSVGElement;
// let lastBox: SVGSVGElement;
export function focusOnElem(e: Event): void{
    const target = e.target as HTMLInputElement;
    const svg: SVGSVGElement = target.closest('svg');
    [...document.querySelectorAll('#elem-onFocus')].forEach(elem => {
        elem.classList.add('dis-none');
    });
    svg.querySelector('#elem-onFocus').classList.remove('dis-none');
    box = svg;
}

export function unFocusBox() :void {
    [...document.querySelectorAll('#elem-onFocus')].forEach(elem => {
        elem.classList.add('dis-none');
    });
    
    if (box.querySelector('textarea').value.length) {
        box.querySelector('#lines-start-box').classList.add('dis-none');
        box.querySelector('textarea').style.background = 'none';
    } else {
        box.querySelector('#lines-start-box').classList.remove('dis-none');
    }
    filmSideBox(idSvg);
}

export function changeFocusBetweenBox(lastBox: SVGSVGElement) :void {
    if (lastBox) {
        if (lastBox.querySelector('textarea').value) {
            lastBox.querySelector('#lines-start-box').classList.add('dis-none');
            box.querySelector('textarea').style.background = 'none';
        }
    }
}

export function placeCircles(box: SVGSVGElement): void {
    // left top
    box.querySelector('#circle3').setAttribute('cx', box.querySelector('#left-line').getAttribute('x1'));
    box.querySelector('#circle3').setAttribute('cy', box.querySelector('#left-line').getAttribute('y1'));
    // left center
    box.querySelector('#circle5').setAttribute('cx', box.querySelector('#left-line').getAttribute('x1'));
    const center: number = (parseFloat(box.querySelector('#left-line').getAttribute('y2')) - parseFloat(box.querySelector('#left-line').getAttribute('y1'))) / 2;
    box.querySelector('#circle5').setAttribute('cy', `${(parseFloat(box.querySelector('#left-line').getAttribute('y2')) - center) }`);
    // left bottom
    box.querySelector('#circle2').setAttribute('cx', box.querySelector('#left-line').getAttribute('x1'));
    box.querySelector('#circle2').setAttribute('cy', box.querySelector('#left-line').getAttribute('y2'));
    // top center
    const topCenter = (parseFloat(box.querySelector('#top-line').getAttribute('x2')) - parseFloat(box.querySelector('#top-line').getAttribute('x1'))) / 2;
    box.querySelector('#circle7').setAttribute('cx', `${(parseFloat(box.querySelector('#top-line').getAttribute('x2')) - topCenter) - 5}`);
    box.querySelector('#circle7').setAttribute('cy', box.querySelector('#top-line').getAttribute('y1'));
    // right top 
    box.querySelector('#circle4').setAttribute('cx', box.querySelector('#right-line').getAttribute('x1'));
    box.querySelector('#circle4').setAttribute('cy', box.querySelector('#right-line').getAttribute('y2'));
    // right center 
    const rightCenter: number = (parseFloat(box.querySelector('#right-line').getAttribute('y1')) - parseFloat(box.querySelector('#right-line').getAttribute('y2'))) / 2;
    box.querySelector('#circle6').setAttribute('cy', `${parseFloat(box.querySelector('#right-line').getAttribute('y1')) - rightCenter}`);
    box.querySelector('#circle6').setAttribute('cx', box.querySelector('#right-line').getAttribute('x1'));
    // right bottom 
    box.querySelector('#circle1').setAttribute('cx', box.querySelector('#right-line').getAttribute('x1'));
    box.querySelector('#circle1').setAttribute('cy', box.querySelector('#right-line').getAttribute('y1'));
    // center bottom 
    const bottomCenter: number = (parseFloat(box.querySelector('#bottom-line').getAttribute('x2')) - parseFloat(box.querySelector('#bottom-line').getAttribute('x1'))) / 2;
    box.querySelector('#circle8').setAttribute('cx', `${parseFloat(box.querySelector('#bottom-line').getAttribute('x2')) - bottomCenter - 5}`);
    box.querySelector('#circle8').setAttribute('cy', box.querySelector('#bottom-line').getAttribute('y1'));
}

let id: string;
export let event: string;
export function mouseDownEvent(e: MouseEvent): void {
    if (e.target) {
        const target = e.target as SVGElement;
        if (target.tagName === 'circle') {
            id = target.id;
            event = e.type;
            box = target.closest('svg');
            document.addEventListener('mousemove', resizeVirtulLines);
            box.querySelector('#virtul-lines').classList.remove('dis-none');
        }
    }
}

export function mouseUp(e: MouseEvent): void {
    if (event) {
        if (event === 'mousemove') {
            const g: SVGGElement = box.querySelector('#virtul-lines');
            resizeVirtulLines(e);
            placeCircles(box);
            box.querySelector('textarea').style.userSelect = 'auto';
            g.classList.add('dis-none');
            filmSideBox(idSvg);
        }
        event = e.type;
        document.removeEventListener('mousemove', resizeVirtulLines);
        drawVirtulLines(box);
        console.log('end event');
    }
}

export function resizeVirtulLines(e: MouseEvent): void {
    console.log('start testing');
    const target = e.target as SVGElement;
    const svg: SVGSVGElement = box;
    event = e.type;
    svg.querySelector('textarea').style.userSelect = 'none';
    const pt = svg.createSVGPoint();
    pt.x = e.pageX;
    pt.y = e.pageY;
    const globalPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
    if (e.type === 'mousemove') {
        svg.classList.remove('dis-none');
        const vrl = getVirtulLines(svg);
        resizeLines(globalPoint, vrl.bottomLine, vrl.topLine, vrl.leftLine, vrl.rightLine);

    } else if (e.type === 'mouseup') {
        console.log(box);
        svg.querySelector('textarea').style.userSelect = 'auto';
        const bottomLine = box.querySelector('#bottom-line') as SVGLineElement;
        const topLine = box.querySelector('#top-line') as SVGLineElement;
        const leftLine = box.querySelector('#left-line') as SVGLineElement;
        const rightLine = box.querySelector('#right-line') as SVGLineElement;
        resizeLines(globalPoint, bottomLine, topLine, leftLine, rightLine);
        const linesStart = getLinesStart(box);
        console.log('resize lines');
        resizeLines(globalPoint, linesStart.bottomLine, linesStart.topLine, linesStart.leftLine, linesStart.rightLine);
        resizeInnerBox(box);
        placeCircles(box);
    }
}

function resizeLines(globalPoint: DOMPoint, bottomLine: SVGLineElement, topLine: SVGLineElement, leftLine: SVGLineElement, rightLine: SVGLineElement): void {
    if (id === 'circle5') {
        // left resize
        bottomLine.setAttribute('x1', `${globalPoint.x}`);
        topLine.setAttribute('x1', `${globalPoint.x}`);
        leftLine.setAttribute('x1', `${globalPoint.x}`);
        leftLine.setAttribute('x2', `${globalPoint.x}`);

    } else if (id === 'circle6') {
        // right resize
        bottomLine.setAttribute('x2', `${globalPoint.x}`);
        topLine.setAttribute('x2', `${globalPoint.x}`);
        rightLine.setAttribute('x1', `${globalPoint.x}`);
        rightLine.setAttribute('x2', `${globalPoint.x}`);

    } else if (id === 'circle7') {
        // top resize
        leftLine.setAttribute('y1', `${globalPoint.y}`);
        rightLine.setAttribute('y2', `${globalPoint.y}`);
        topLine.setAttribute('y1', `${globalPoint.y}`);
        topLine.setAttribute('y2', `${globalPoint.y}`);
    } else if (id === 'circle8') {
        // bottom resize
        leftLine.setAttribute('y2', `${globalPoint.y}`);
        rightLine.setAttribute('y1', `${globalPoint.y}`);
        bottomLine.setAttribute('y1', `${globalPoint.y}`);
        bottomLine.setAttribute('y2', `${globalPoint.y}`);

    } else if (id === 'circle3') {
        // left top corner
        rightLine.setAttribute('y2', `${globalPoint.y}`);
        bottomLine.setAttribute('x1', `${globalPoint.x}`);
        leftLine.setAttribute('x1', `${globalPoint.x}`);
        leftLine.setAttribute('x2', `${globalPoint.x}`);
        leftLine.setAttribute('y1', `${globalPoint.y}`);
        topLine.setAttribute('y1', `${globalPoint.y}`);
        topLine.setAttribute('y2', `${globalPoint.y}`);
        topLine.setAttribute('x1', `${globalPoint.x}`);

    } else if (id === 'circle2') {
        // left bottom corner
        topLine.setAttribute('x1', `${globalPoint.x}`);
        rightLine.setAttribute('y1', `${globalPoint.y}`);
        leftLine.setAttribute('x1', `${globalPoint.x}`);
        leftLine.setAttribute('x2', `${globalPoint.x}`);
        leftLine.setAttribute('y2', `${globalPoint.y}`);
        bottomLine.setAttribute('y1', `${globalPoint.y}`);
        bottomLine.setAttribute('y2', `${globalPoint.y}`);
        bottomLine.setAttribute('x1', `${globalPoint.x}`);

    } else if (id === 'circle4') {
        // right top corner
        leftLine.setAttribute('y1', `${globalPoint.y}`);
        bottomLine.setAttribute('x2', `${globalPoint.x}`);
        rightLine.setAttribute('x1', `${globalPoint.x}`);
        rightLine.setAttribute('x2', `${globalPoint.x}`);
        rightLine.setAttribute('y2', `${globalPoint.y}`);
        topLine.setAttribute('y1', `${globalPoint.y}`);
        topLine.setAttribute('y2', `${globalPoint.y}`);
        topLine.setAttribute('x2', `${globalPoint.x}`);

    } else if (id === 'circle1') {
        // right bottom corner
        leftLine.setAttribute('y2', `${globalPoint.y}`);
        topLine.setAttribute('x2', `${globalPoint.x}`);
        rightLine.setAttribute('x1', `${globalPoint.x}`);
        rightLine.setAttribute('x2', `${globalPoint.x}`);
        rightLine.setAttribute('y1', `${globalPoint.y}`);
        bottomLine.setAttribute('y1', `${globalPoint.y}`);
        bottomLine.setAttribute('y2', `${globalPoint.y}`);
        bottomLine.setAttribute('x2', `${globalPoint.x}`);
    }
}

export function resizeInnerBox(svg: SVGSVGElement): void {
    const width = parseFloat(svg.querySelector('#top-line').getAttribute('x2')) - parseFloat(svg.querySelector('#top-line').getAttribute('x1'));
    svg.querySelector('#fro').setAttribute('width', `${width - 10}`);
    const height = parseFloat(svg.querySelector('#left-line').getAttribute('y2')) - parseFloat(svg.querySelector('#left-line').getAttribute('y1'));
    svg.querySelector('#fro').setAttribute('height', `${height - 10}`);
    svg.querySelector('#fro').setAttribute('x', `${parseFloat(svg.querySelector('#top-line').getAttribute('x1')) + 5}`);
    svg.querySelector('#fro').setAttribute('y', `${parseFloat(svg.querySelector('#top-line').getAttribute('y1')) + 5}`);
    // console.log('resize inner done');
}

export function dragBox(): void {
    const drag: SVGLineElement[] = Array.from(document.querySelectorAll('line[data-drag]'));
    drag.forEach((elem) => {
        elem.addEventListener('mousedown', startDrag);
        document.addEventListener('mouseup', endDrag);
    });
}
let selectedLine: SVGLineElement, offset: {
    x: number,
    y: number
};
export let lastEvent: string, newCord: {
    x: number,
    y: number
} = {
    x: 0,
    y: 0
}; 

function startDrag(e: MouseEvent): void {
    const target = e.target as SVGLineElement;
    if (target.dataset.drag) {
        console.log('start dragging');
        box = target.closest('svg');
        selectedLine = target;
        const g: SVGGElement = box.querySelector('#virtul-lines');
        g.classList.remove('dis-none');
        offset = getMousePosition(e);
        offset.x -= parseFloat(box.getAttribute('x'));
        offset.y -= parseFloat(box.getAttribute('y'));
        document.addEventListener('mousemove', draging);
        lastEvent = 'mousedown';
    }
}
let lines = {};
function draging(e: MouseEvent): void {

    if (selectedLine) {
        console.log('drag');
        e.preventDefault();
        const coord = getMousePosition(e);
        const x: number = coord.x - offset.x;
        const y: number = coord.y - offset.y;
        const vrLines: moveLines = getVirtulLines(box);
        const elems = mouseMoveBigObj;
        setVirtulLinesOnDrag(x, y, box ,vrLines);
        lastEvent = 'mousemove';
        newCord.x = x;
        newCord.y = y;
        lines = vrLines;
    }
}

function endDrag(e: MouseEvent): void {
    if (lastEvent === 'mousemove') {
        const g = box.querySelector('#virtul-lines') !as SVGGElement;
        g.classList.add('dis-none');
        document.removeEventListener('mousemove', draging);
        selectedLine = null;
        const foucusLinesObj = getLinesFocus(box);
        const startLinesObj = getLinesStart(box);
        lastEvent = 'mouseup';
        placeLinesAfterDrag(foucusLinesObj);
        placeLinesAfterDrag(startLinesObj);
        placeCircles(box);
        resizeInnerBox(box);
        drawVirtulLines(box);
        filmSideBox(idSvg);
        console.log('end drag');
    }
}

function placeLinesAfterDrag(elems: moveLines): void {    
    const {bottomLine, topLine, rightLine, leftLine} = elems;
    const lastPlaceLines = linesObj;
    bottomLine.setAttribute('x1', lastPlaceLines.bottomLine.getAttribute('x1'));
    bottomLine.setAttribute('x2', lastPlaceLines.bottomLine.getAttribute('x2'));
    bottomLine.setAttribute('y1', lastPlaceLines.bottomLine.getAttribute('y1'));
    bottomLine.setAttribute('y2', lastPlaceLines.bottomLine.getAttribute('y2'));

    topLine.setAttribute('x1', lastPlaceLines.topLine.getAttribute('x1'));
    topLine.setAttribute('x2', lastPlaceLines.topLine.getAttribute('x2'));
    topLine.setAttribute('y1', lastPlaceLines.topLine.getAttribute('y1'));
    topLine.setAttribute('y2', lastPlaceLines.topLine.getAttribute('y2'));

    rightLine.setAttribute('x1', lastPlaceLines.rightLine.getAttribute('x1'));
    rightLine.setAttribute('x2', lastPlaceLines.rightLine.getAttribute('x2'));
    rightLine.setAttribute('y2', lastPlaceLines.rightLine.getAttribute('y1'));
    rightLine.setAttribute('y1', lastPlaceLines.rightLine.getAttribute('y2'));

    leftLine.setAttribute('x1', lastPlaceLines.leftLine.getAttribute('x1'));
    leftLine.setAttribute('x2', lastPlaceLines.leftLine.getAttribute('x2'));
    leftLine.setAttribute('y1', lastPlaceLines.leftLine.getAttribute('y1'));
    leftLine.setAttribute('y2', lastPlaceLines.leftLine.getAttribute('y2'));
    // console.log(bottomLine,topLine,rightLine,leftLine);
}

function getVirtulLines(svg: SVGSVGElement): moveLines {
    return {bottomLine: svg.querySelector('#line-bottom-r') !as SVGLineElement,
    topLine: svg.querySelector('#line-top-r') !as SVGLineElement,
    leftLine: svg.querySelector('#line-left-r') !as SVGLineElement,
    rightLine: svg.querySelector('#line-right-r') !as SVGLineElement}
}

function getMousePosition(evt: MouseEvent) {
    const CTM = box.getScreenCTM();
    return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
    };
}

let linesObj = {bottomLine: edit_boxElems.bottomLineStart,topLine: edit_boxElems.topLineStart,leftLine: edit_boxElems.leftLineStart,rightLine: edit_boxElems.rightLineStart};
function setVirtulLinesOnDrag(x: number, y: number, svg: SVGSVGElement, vrl: moveLines) {
    
    const {bottomLine,rightLine,leftLine,topLine} = vrl;

    const xMove = x - parseFloat(svg.getAttribute('x'));
    const yMove = y - parseFloat(svg.getAttribute('y'));
    console.log(`move ${xMove} to x, and move ${yMove} to y`);

    rightLine.setAttribute('x1', `${xMove + parseFloat(svg.querySelector('#right-line').getAttribute('x1'))}`);
    rightLine.setAttribute('y1', `${parseFloat(svg.querySelector('#right-line').getAttribute('y2')) + yMove}`);
    rightLine.setAttribute('x2', `${xMove + parseFloat(svg.querySelector('#right-line').getAttribute('x1')) }`);
    rightLine.setAttribute('y2', `${parseFloat(svg.querySelector('#right-line').getAttribute('y1')) + yMove}`);

    leftLine.setAttribute('x1', `${xMove + parseFloat(svg.querySelector('#left-line').getAttribute('x1'))}`);
    leftLine.setAttribute('y1', `${parseFloat(svg.querySelector('#left-line').getAttribute('y1')) + yMove}`);
    leftLine.setAttribute('x2', `${xMove + parseFloat(svg.querySelector('#left-line').getAttribute('x1'))}`);
    leftLine.setAttribute('y2', `${parseFloat(svg.querySelector('#left-line').getAttribute('y2')) + yMove}`);

    topLine.setAttribute('x1', `${parseFloat(svg.querySelector('#top-line').getAttribute('x1')) + xMove}`);
    topLine.setAttribute('y1', `${parseFloat(svg.querySelector('#top-line').getAttribute('y1')) + yMove}`);
    topLine.setAttribute('x2', `${parseFloat(svg.querySelector('#top-line').getAttribute('x2')) + xMove}`);
    topLine.setAttribute('y2', `${parseFloat(svg.querySelector('#top-line').getAttribute('y1')) + yMove}`);

    bottomLine.setAttribute('x1', `${parseFloat(svg.querySelector('#bottom-line').getAttribute('x1')) + xMove}`);
    bottomLine.setAttribute('y1', `${parseFloat(svg.querySelector('#bottom-line').getAttribute('y1')) + yMove}`);
    bottomLine.setAttribute('x2', `${parseFloat(svg.querySelector('#bottom-line').getAttribute('x2')) + xMove}`);
    bottomLine.setAttribute('y2', `${parseFloat(svg.querySelector('#bottom-line').getAttribute('y1')) + yMove}`);
    // console.log(rightLine, leftLine, topLine, bottomLine);
    linesObj = {rightLine, leftLine, topLine, bottomLine};
}

export function drawVirtulLines(box: SVGSVGElement): void {
    if(box.querySelector('#virtul-lines')) box.querySelector('#virtul-lines').remove();
    const circle1 = box.querySelector('#circle1') as SVGCircleElement;
    const circle2 = box.querySelector('#circle2') as SVGCircleElement;
    const circle3 = box.querySelector('#circle3') as SVGCircleElement;
    const circle4 = box.querySelector('#circle4') as SVGCircleElement;

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const lineBottom = createLine(circle1, circle2, 'line-bottom-r')
    const lineLeft = createLine(circle2, circle3, 'line-left-r');
    const lineTop = createLine(circle3, circle4, 'line-top-r');
    const lineRight = createLine(circle4, circle1, 'line-right-r');

    g.setAttribute('id', 'virtul-lines');
    g.classList.add('dis-none');
    g.append(lineBottom);
    g.append(lineLeft);
    g.append(lineTop);
    g.append(lineRight);
    box.append(g);
}

function createLine(circle1: SVGCircleElement, circle2: SVGCircleElement, name: string): SVGLineElement {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    if (name === 'line-top-r') {
        line.setAttribute('x1', `${circle1.getAttribute('cx')}`);
        line.setAttribute('x2', `${circle2.getAttribute('cx')}`);
        line.setAttribute('y1', `${circle2.getAttribute('cy')}`);
        line.setAttribute('y2', `${circle1.getAttribute('cy')}`);
        line.setAttribute('id', name);
        line.classList.add('line-svg-n');
        return line;
    }
    line.setAttribute('x1', `${circle2.getAttribute('cx')}`);
    line.setAttribute('x2', `${circle1.getAttribute('cx')}`);
    line.setAttribute('y1', `${circle2.getAttribute('cy')}`);
    line.setAttribute('y2', `${circle1.getAttribute('cy')}`);
    line.classList.add('line-svg-n');
    line.setAttribute('id', name);
    return line;
}

function getLinesFocus(svg: SVGSVGElement) : moveLines {
    return {
        bottomLine: svg.querySelector('#bottom-line'),
        topLine: svg.querySelector('#top-line'),
        rightLine: svg.querySelector('#right-line'),
        leftLine: svg.querySelector('#left-line')
    }
}
function getLinesStart(svg: SVGSVGElement) : moveLines {
    return {
        bottomLine: svg.querySelector('#bottom-line-start'),
        topLine: svg.querySelector('#top-line-start'),
        rightLine: svg.querySelector('#right-line-start'),
        leftLine: svg.querySelector('#left-line-start')
    }
}

export function filmSideBox(id: string) :void {
    idSvg = id;
    if (boxSide.querySelector(`[data-id="${id}"]`)) boxSide.querySelector(`[data-id="${id}"]`).remove();
    const filmBox = boxSide.querySelector('#box-film');
    const svgBox = document.querySelector('.slides__edit').querySelector(`[data-id="${id}"]`);
    const miniBox = svgBox.cloneNode(true) as SVGSVGElement;
    miniBox.style.userSelect = 'none';
    miniBox.classList.remove('dis-none');
    const box1: SVGSVGElement = miniBox.querySelector('#edit_box');
    box1.setAttribute('id', 'side-box-show');
    const box2: SVGSVGElement = miniBox.querySelector('#edit_box2');
    box2.setAttribute('id', 'side-box-show2');
    miniBox.setAttribute('x', '-10');
    miniBox.setAttribute('width', '115%');
    filmBox.append(miniBox);
    [...miniBox.querySelectorAll('#elem-onFocus')].forEach(elem => {
        elem.remove();
    });
    [...miniBox.querySelectorAll('.para-edit')].forEach(elem => {
        const text: string = elem.value;
        const p = document.createElement('p');
        p.textContent = text;
        p.classList.add('text-film');
        elem.replaceWith(p);
    });
    [...miniBox.querySelectorAll('.box-cont')].forEach(elem => {
        elem.classList.remove('box-cont');
    });
    filmBox.append(miniBox);
}

export let boxSide: SVGGElement;
let lastHeight: number;
export function createNewBoxSide(idBox: string) :void {
    const elems = [...document.querySelectorAll('.box-film-cont')];
    const prevCont = elems[elems.length - 2] as SVGGElement;
    const lastCont = elems[elems.length - 1] as SVGGElement;
    const filmBox = lastCont.querySelector('#box-film');
    const bigSvg = document.querySelector('.slides__edit');
    const svgBox = bigSvg.querySelector(`[data-id="${idBox}"]`);
    const miniBox = svgBox.cloneNode(true) as SVGSVGElement;
    const rectsYello = [...document.querySelector('.slides__film').querySelectorAll('.film-side-cont-background')];
    rectsYello.forEach(elem => {
        elem.classList.remove('y-b');
    });
    lastCont.querySelector('.film-side-cont-background').classList.add('y-b');
    if (!prevCont) {
        lastCont.setAttribute('data-height', '2');
        lastCont.setAttribute('id', `${idBox}`);
        lastHeight = 2;
    } else {
        lastCont.setAttribute('data-height', `${lastHeight + 104}`);
        const lastSvg = prevCont.querySelector('#svg963');
        lastSvg.classList.remove('dis-none');
        lastHeight += 104;
    }
    const box1: SVGSVGElement = miniBox.querySelector('#edit_box');
    box1.setAttribute('id', 'side-box-show');
    const box2: SVGSVGElement = miniBox.querySelector('#edit_box2');
    box2.setAttribute('id', 'side-box-show2');
    miniBox.setAttribute('x', '-10');
    miniBox.setAttribute('width', '115%');
    miniBox.classList.remove('dis-none');
    filmBox.append(miniBox);
    [...miniBox.querySelectorAll('#elem-onFocus')].forEach(elem => {
        elem.remove();
    });
    [...miniBox.querySelectorAll('.para-edit')].forEach(elem => {
        const text: string = elem.value;
        const p = document.createElement('p');
        p.textContent = text;
        p.classList.add('text-film');
        elem.replaceWith(p);
    });
    [...miniBox.querySelectorAll('.box-cont')].forEach(elem => {
        elem.classList.remove('box-cont');
    });
    boxSide = lastCont;
    idSvg = idBox;
}

export function clickOnFilmSide(boxId: string): void {
    const bigBox: HTMLDivElement = document.querySelector('.slides__edit');
    const box = bigBox.querySelector(`[data-id="${boxId}"]`);
    [...bigBox.children].forEach(elem => {
        elem.classList.add('dis-none');
    });
    const rectsYello = [...document.querySelector('.slides__film').querySelectorAll('.film-side-cont-background')];
    rectsYello.forEach(elem => {
        elem.classList.remove('y-b');
    });
    const bigBoxSide: HTMLDivElement = document.querySelector('.slides__film');
    const boxSideElems = bigBoxSide.querySelectorAll('#svg963');
    const boxSideSvg = bigBoxSide.querySelector(`[data-id="${boxId}"]`);
    const currentBox:SVGGElement = boxSideSvg.closest('.box-film-cont');
    currentBox.querySelector('.film-side-cont-background').classList.add('y-b');
    [...boxSideElems].forEach(elem => {
        elem.classList.remove('dis-none');
    });
    box.classList.remove('dis-none');
    boxSide = currentBox;
    idSvg = boxId;
}

export function delateBox(delateBox: SVGGElement) :void {
    const boxsSide = [...document.querySelectorAll('.box-film-cont')] as SVGGElement[];
    const boxsMain = [...mainElems.slidesEdit.querySelectorAll('[data-id]')] as SVGSVGElement[];
    const place: number = boxsSide.indexOf(delateBox);
    if (delateBox === boxSide) {
        const newPlace = place - 1;
        const currentBoxSide = boxsSide[newPlace] as SVGGElement;
        const currentBoxEdit = boxsMain[newPlace] as SVGSVGElement;
        if (currentBoxSide) {
            currentBoxSide.querySelector('.film-side-cont-background').classList.add('y-b');
            boxSide = currentBoxSide;
            idSvg = currentBoxSide.id;
            currentBoxEdit.classList.remove('dis-none');
        }
    }
    if (boxsSide.length > place) {
        const boxsAfterDelate = boxsSide.slice(place + 1);
        mainElems.filmBigSvg.setAttribute('height', `${parseInt(mainElems.filmBigSvg.getAttribute('height')) - 105}`);
        lastHeight -= 104;
        boxsAfterDelate.forEach(elem => {
            const newHeight = parseInt(elem.dataset.height) - 104;
            elem.setAttribute('transform', `translate(0 ${newHeight})`);
            elem.setAttribute('data-height', `${newHeight}`);
            elem.querySelector('.film-num').textContent = `${parseInt(elem.querySelector('.film-num').textContent) - 1}`;
        });
    }
    mainElems.slidesEdit.querySelector(`[data-id="${delateBox.id}"]`).remove();
    delateBox.remove();
}