import { mainElems } from "./base";
import { delateBox } from "./editBox";

let item: SVGGElement;
export function showMenu(e: MouseEvent) :void {
    const target = e.target as HTMLElement;
    if (target.closest('.box-film-cont')) {
        e.preventDefault();
        const popMenu: HTMLDivElement = document.querySelector('.pop__menu');
        popMenu.classList.remove('dis-none');
        popMenu.style.left = `${e.clientX}px`;
        popMenu.style.top = `${e.clientY}px`;
        item = target.closest('.box-film-cont');
    }
}

export function closeMenu(e: MouseEvent) :void {
    const target = e.target as HTMLElement;
    if (target.closest('.box-film-cont')) {
        return;
    }
    document.querySelector('.pop__menu').classList.add('dis-none');
}

export function getDelateBox() :SVGGElement {
    return item;
}