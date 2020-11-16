
let oldElems: SVGSVGElement[];
let newElems: SVGSVGElement[];
let theLastEditBox: SVGSVGElement;
export function openFullscreen(): void {
    
    const bigbox: SVGSVGElement = document.querySelector('.slides__edit');
    console.log(bigbox);
    if (bigbox.requestFullscreen) {
      bigbox.requestFullscreen();
    } else if (bigbox.mozRequestFullScreen) { /* Firefox */
      bigbox.mozRequestFullScreen();
    } else if (bigbox.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      bigbox.webkitRequestFullscreen();
    } else if (bigbox.msRequestFullscreen) { /* IE/Edge */
      bigbox.msRequestFullscreen();
    }

    const oldSvgs = [...bigbox.querySelectorAll('#svg963')] as SVGSVGElement[];
    const showedElem = oldSvgs.find(elem => !elem.classList.contains('dis-none'));
    theLastEditBox = showedElem;
    const newSvgs: SVGSVGElement[] = [];
    oldSvgs.forEach(elem => {
        newSvgs.push(elem.cloneNode(true) as SVGSVGElement);
        elem.classList.add('dis-none');
    });
    newSvgs.reverse();
    newSvgs.forEach(elem => {
        delateOldProp(elem);
    });
    const firstSvg = newSvgs[0];
    firstSvg.setAttribute('data-show', 'true');
    bigbox.append(firstSvg);
    oldElems = oldSvgs;
    newElems = newSvgs;
}

function delateOldProp(svg: SVGSVGElement): void {
    svg.setAttribute('class', 'present-cont');
    svg.querySelector('#edit_box').setAttribute('id', 'present-box');
    svg.querySelector('#edit_box2').setAttribute('id', 'present-box2');
    [...svg.querySelectorAll('#elem-onFocus')].forEach(elem => {
        elem.remove();
    });
    [...svg.querySelectorAll('#lines-start-box')].forEach(elem => {
        elem.remove();
    });
    [...svg.querySelectorAll('.para-edit')].forEach(elem => {
        const text: string = elem.value;
        const p = document.createElement('p');
        p.textContent = text;
        p.classList.add('text-film');
        elem.replaceWith(p);
    });
    [...svg.querySelectorAll('.box-cont')].forEach(elem => {
        elem.classList.remove('box-cont');
    });
} 

export function closeFullScreen(): void {
    document.querySelector('.overlay').classList.add('dis-none');
    const bigBox = document.querySelector('.slides__edit');
    [...bigBox.querySelectorAll('.present-cont')].forEach(elem => {
        elem.remove();
    });
    theLastEditBox.classList.remove('dis-none');
    bigBox.append(theLastEditBox);

}

export function showPresentBar() :void {
    document.querySelector('.overlay').classList.remove('dis-none');
}

export function clickOnBar(e: Event): void {
    const bigBox = document.querySelector('.slides__edit');
    const target = e.target as HTMLSpanElement;
    const currentSvg: SVGSVGElement = document.querySelector(`[data-show="true"]`);
    const lastPlace = newElems.indexOf(currentSvg);
    console.log(target.parentElement);
    if (target.className === 'arrow-left') {
        let elem: SVGSVGElement;
        currentSvg.removeAttribute('data-show');
        currentSvg.classList.add('dis-none');
        elem = newElems[lastPlace - 1];
        if (!lastPlace) {
            elem = newElems[newElems.length - 1];
        }
        elem.classList.remove('dis-none');
        elem.setAttribute('data-show', 'true');
        bigBox.append(elem);

    } else if (target.className === 'arrow-right') {
        let elem: SVGSVGElement;
        currentSvg.removeAttribute('data-show');
        currentSvg.classList.add('dis-none');
        elem = newElems[lastPlace + 1];
        console.log(newElems.length);
        console.log(lastPlace);
        if (lastPlace === newElems.length - 1) {
            elem = newElems[0];
            console.log(elem);
        }
        elem.classList.remove('dis-none');
        elem.setAttribute('data-show', 'true');
        bigBox.append(elem);

    } else if (target.parentElement.className === 'color-icon') {
        newElems.forEach(elem => {
            elem.classList.toggle('dark-mode');
            elem.querySelector('#rect965').classList.toggle('fill-dark');
        });

    } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
          document.msExitFullscreen();
        }
    }
}