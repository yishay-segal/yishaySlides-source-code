import { mainElems } from "./base";
import { item } from "./interface&objs";

export default class AddNewBox {

    render(saveBox?: item) {
        let elems: string[];
        if (saveBox) {
            return newSideAndBox(saveBox);
        }
        return newSideAndBox();
        // const elems = newSideAndBox();
        // return elems;
    }
}   

function newSideAndBox(saveBox? : item) {
    const id = Date.now().toString();
    const elems = [...document.querySelectorAll('.box-film-cont')];
    const lastCont = elems[elems.length - 1] as SVGGElement;
    let translate: number = 1;
    let lastNumber: string = '0';
    if (lastCont) {
        translate = parseInt(lastCont.dataset.height) + 104;
        lastNumber = lastCont.querySelector('.film-num').textContent;
        mainElems.filmBigSvg.setAttribute('height', `${parseInt(mainElems.filmBigSvg.getAttribute('height')) + 105}`);
    }
    // const translate = parseInt(lastCont.dataset.height) + 104;
    // const lastNumber = lastCont.querySelector('.film-num').textContent;
    const newSideFilm = `
        <g id="${saveBox !== undefined ? saveBox.id : id}" class="box-film-cont" transform="translate(0 ${translate})">
        <rect class="film-side-cont-background" x="-4" y="0" width="205"
            height="100" rx="4" ry="4"></rect>
        <rect class="box-film" x="43" y="6" width="152" height="88" rx="4" ry="4"></rect>
        <text class="film-num" text-anchor="end" x="31" y="16">${parseInt(lastNumber) + 1}</text>
        <g transform="translate(45 8)">
            <title></title><svg xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" fill-rule="evenodd"
                fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10"
                overflow="hidden" preserveAspectRatio="none" width="148px" height="84px"
                style="line-height: normal;">
                <rect fill="#ffffff" fill-opacity="0" width="100%" height="100%"></rect>
                <g transform="translate(0 0) scale(1)">
                    <defs cursor="default"></defs>
                    <g id="filmstrip-slide-0-p">
                        
                        <g id="box-film">
                            
                        </g>
                        
                    </g>
                </g>
            </svg>
        </g>
        <rect stroke-width="2" class="punch-filmstrip-thumbnail-border-inner" x="44" y="7"
            width="150" height="86" rx="4" ry="4"></rect>
        <rect x="45" y="8" width="148" height="84" class=""></rect>
        <clipPath id="punch-filmstrip-thumbnail-collaborator-clip-path">
            <rect x="43" y="6" width="152" height="88"></rect>
        </clipPath>
        </g>
        `;

        if (saveBox) {
            // if (saveBox.text.editBoxText ) {
            //     saveBox.svg.replace
            // }
            return {sideFile: newSideFilm, box: saveBox.svg, id: saveBox.id};
        }

        const newBox = `
            <?xml version="1.0" encoding="UTF-8" standalone="no"?>
            <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#"
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg"
                xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
                xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="100%" height="100%"
                viewBox="0 0 333.37499 139.7" version="1.1" id="svg963" data-id="${id}"
                inkscape:version="1.0 (4035a4fb49, 2020-05-01)" sodipodi:docname="drawing-3.svg">
                <defs id="defs957" />
                <sodipodi:namedview inkscape:pagecheckerboard="false" id="base" pagecolor="#f1f3f4"
                    bordercolor="#666666" borderopacity="1.0" inkscape:pageopacity="0" inkscape:pageshadow="2"
                    inkscape:zoom="0.7" inkscape:cx="630" inkscape:cy="378.28571" inkscape:document-units="px"
                    inkscape:current-layer="layer1" inkscape:document-rotation="0" showgrid="false" units="px"
                    inkscape:window-width="1424" inkscape:window-height="1030" inkscape:window-x="385"
                    inkscape:window-y="97" inkscape:window-maximized="0" />
                <metadata id="metadata960">
                    <rdf:RDF>
                        <cc:Work rdf:about="">
                            <dc:format>image/svg+xml</dc:format>
                            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                            <dc:title></dc:title>
                        </cc:Work>
                    </rdf:RDF>
                </metadata>
                <g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1">
                    <rect
                        style="opacity:0.765;fill:#ffffff;fill-opacity:1;stroke:#dadce0;stroke-width:0.76681;stroke-miterlimit:2;stroke-dasharray:none"
                        id="rect965" width="100%" height="100%" />
            
                    <svg class="box-cont" id="edit_box" x="-25" y="-10" viewBox="-150 -40 886 300" width="500px" height="180px" xmlns="http://www.w3.org/2000/svg">
                    
                    
                        <g id="lines-start-box">
                            <line id="left-line-start" x1="-80.57830810546875" y1="-23.258653233808417" x2="-80.57830810546875" y2="20.599870681762695" class="start-lines"></line>
                            <line id="top-line-start" x1="-80.57830810546875" y1="-23.258653233808417" x2="465.1890869140625" y2="-23.258653233808417" class="start-lines"></line>
                            <line id="bottom-line-start" x1="-80.57830810546875" y1="20.599870681762695" x2="465.1890869140625" y2="20.599870681762695" class="start-lines"></line>
                            <line id="right-line-start" x1="465.1890869140625" y1="20.599870681762695" x2="465.1890869140625" y2="-23.258653233808417" class="start-lines"></line>
                        </g>
                            
                        <g id="elem-onFocus" class="dis-none">
                            <line id="left-line" data-drag="true" style="cursor: move;" x1="-80.57830810546875" y1="-23.258653233808417" x2="-80.57830810546875" y2="20.599870681762695" class="line-svg-r"></line>
                            <line id="top-line" data-drag="true" style="cursor: move;" x1="-80.57830810546875" y1="-23.258653233808417" x2="465.1890869140625" y2="-23.258653233808417" class="line-svg-r" style="cursor: n-resize"></line>
                            <line id="bottom-line" data-drag="true" style="cursor: move;" x1="-80.57830810546875" y1="20.599870681762695" x2="465.1890869140625" y2="20.599870681762695" class="line-svg-r" style="cursor: n-resize"></line>
                            <line id="right-line" data-drag="true" style="cursor: move;" x1="465.1890869140625" y1="20.599870681762695" x2="465.1890869140625" y2="-23.258653233808417" class="line-svg-r"></line>
            
                            <circle id="circle1" cx="390" cy="125" r="5" stroke="black" stroke-width="0"
                            fill="black" opacity="0.8" style="cursor: se-resize"></circle>
            
                            <circle id="circle2" cx="0" cy="125" r="5" stroke="black" stroke-width="0"
                                fill="black" opacity="0.8" style="cursor:ne-resize"></circle>
            
                            <circle id="circle3" cx="0" cy="6" r="5" stroke="black" stroke-width="0"
                                fill="black" opacity="0.8" style="cursor: nw-resize;"></circle>
            
                            <circle id="circle4" cx="390" cy="6" r="5" stroke="black" stroke-width="0"
                                fill="black" opacity="0.8" style="cursor:ne-resize"></circle>
            
                            <circle id="circle5" cx="0"  r="5" stroke="black" stroke-width="0"
                                fill="black" opacity="0.8" style="cursor: w-resize;"></circle>
            
                            <circle id="circle6" cx="390"  r="5" stroke="black" stroke-width="0"
                                fill="black" opacity="0.8" style="cursor: w-resize;"></circle>
            
                            <circle id="circle7" cy="6"  r="5" stroke="black" stroke-width="0"
                                fill="black" opacity="0.8" style="cursor: n-resize"></circle>
            
                            <circle id="circle8" cy="125"  r="5" stroke="black" stroke-width="0"
                                fill="black" opacity="0.8" style="cursor: n-resize"></circle>
            
                            
                        </g>
                        
                        <foreignobject id="fro" x="-66" y="-18" width="515" height="45">
            
                            <body xmlns="http://www.w3.org/1999/xhtml">
                                <div class="box-edit">
                                    <textarea placeholder="Add your title" spellcheck="false" name="text"
                                        class="para-edit placeholder=" some text"></textarea>
                                </div>
                            </body>
                        </foreignobject>
            
                    </svg>
                    <svg class="box-cont" id="edit_box2" x="-60" y="35" viewBox="-150 -120 886 363" width="500px" height="120px" xmlns="http://www.w3.org/2000/svg">
                        
                        <g id="lines-start-box">
                            <line id="left-line-start" x1="-231.86685180664062" y1="-114.48681419657112" x2="-231.86685180664062" y2="183.86367797851562" class="start-lines"></line>
                            <line id="top-line-start" x1="-231.86685180664062" y1="-114.48681419657112" x2="686.8228759765625" y2="-114.48681419657112" class="start-lines"></line>
                            <line id="bottom-line-start" x1="-231.86685180664062" y1="183.86367797851562" x2="686.8228759765625" y2="183.86367797851562" class="start-lines"></line>
                            <line id="right-line-start" x1="686.8228759765625" y1="183.86367797851562" x2="686.8228759765625" y2="-114.48681419657112" class="start-lines"></line>
                        </g>
                            
                        <g id="elem-onFocus" class="dis-none">
                            <line id="left-line" data-drag="true" style="cursor: move;" x1="-231.86685180664062" y1="-114.48681419657112" x2="-231.86685180664062" y2="183.86367797851562" class="line-svg-r"></line>
                            <line id="top-line" data-drag="true" style="cursor: move;"x1="-231.86685180664062" y1="-114.48681419657112" x2="686.8228759765625" y2="-114.48681419657112" class="line-svg-r" style="cursor: n-resize"></line>
                            <line id="bottom-line" data-drag="true" style="cursor: move;" x1="-231.86685180664062" y1="183.86367797851562" x2="686.8228759765625" y2="183.86367797851562" class="line-svg-r" style="cursor: n-resize"></line>
                            <line id="right-line" data-drag="true" style="cursor: move;" x1="686.8228759765625" y1="183.86367797851562" x2="686.8228759765625" y2="-114.48681419657112" class="line-svg-r"></line>
            
                            <circle id="circle1" cx="390" cy="125" r="5" stroke="black" stroke-width="0"
                            fill="black" opacity="0.8" style="cursor: se-resize"></circle>
            
                            <circle id="circle2" cx="0" cy="125" r="5" stroke="black" stroke-width="0"
                                fill="black" opacity="0.8" style="cursor:ne-resize"></circle>
            
                            <circle id="circle3" cx="0" cy="6" r="5" stroke="black" stroke-width="0"
                                fill="black" opacity="0.8" style="cursor: nw-resize;"></circle>
            
                            <circle id="circle4" cx="390" cy="6" r="5" stroke="black" stroke-width="0"
                                fill="black" opacity="0.8" style="cursor:ne-resize"></circle>
            
                            <circle id="circle5" cx="0"  r="5" stroke="black" stroke-width="0"
                                fill="black" opacity="0.8" style="cursor: w-resize;"></circle>
            
                            <circle id="circle6" cx="390"  r="5" stroke="black" stroke-width="0"
                                fill="black" opacity="0.8" style="cursor: w-resize;"></circle>
            
                            <circle id="circle7" cy="6"  r="5" stroke="black" stroke-width="0"
                                fill="black" opacity="0.8" style="cursor: n-resize"></circle>
            
                            <circle id="circle8" cy="125"  r="5" stroke="black" stroke-width="0"
                                fill="black" opacity="0.8" style="cursor: n-resize"></circle>
            
                        </g>
                        
                        <foreignobject id="fro" x="-211" y="-80" width="954" height="283">
            
                            <body xmlns="http://www.w3.org/1999/xhtml">
                                <div class="box-edit">
                                    <textarea placeholder="Add your description" spellcheck="false" name="text"
                                        class="para-edit"></textarea>
                                </div>
                            </body>
                        </foreignobject>
            
                    </svg>
                    
                </g>
            </svg>
    `;
    return {sideFile: newSideFilm, box: newBox, id: id}
}