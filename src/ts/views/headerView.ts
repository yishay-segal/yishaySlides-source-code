import {elements} from "./base"; 


export function openNav(): void {
    elements.sideNav.classList.add('display');
}

export function closeNav (e: MouseEvent): void{
    if(e.target) {
        const target = (e.target as HTMLElement);
        if(!(target.closest('#mySidenav') || target.closest('.menu-hum'))) {
            elements.sideNav.classList.remove('display');

        }if(!(target.closest('.header__side-box') || target.closest('.drop__menu'))) {
            elements.appsDiv.classList.remove('click');
            elements.dropMenu.classList.remove('dis-menu');

        }if(!(target.closest('.header__side-box2') || target.closest('.drop__account'))) {
            elements.accDiv.classList.remove('click');
            elements.dropMenuAc.classList.remove('dis-menu');
        }
    }
}   
 
export function focus(): void {
    elements.searchDiv.classList.add('focus');
}

export function unfocus(): void {
    elements.searchDiv.classList.remove('focus');
}

export function dropMenu(clickDiv: HTMLElement, menuTog: HTMLElement, e: MouseEvent): void{
    const target = e.target as HTMLElement;
    if ( !menuTog.contains(target)) { 
        clickDiv.classList.toggle('click');
        menuTog.classList.toggle('dis-menu');
    }
}



