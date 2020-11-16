export const elements = {
    humMenu: <HTMLElement>document.querySelector('.menu-hum')!,
    sideNav: <HTMLElement>document.querySelector('#mySidenav')!,
    header: <HTMLElement>document.querySelector('header')!,
    headerInput: document.querySelector('.header__search-input')! as HTMLElement,
    searchLogo: document.querySelector('.header__search-box')! as HTMLElement,
    searchDiv: document.querySelector('.header__search')! as HTMLElement,
    appsDiv: document.querySelector('.header__side-box')! as HTMLElement,
    dropMenu: document.querySelector('.drop__menu')! as HTMLElement,
    accDiv: document.querySelector('.header__side-box2')! as HTMLElement,
    dropMenuAc: document.querySelector('.drop__account')! as HTMLElement
}

export const mainElems = {
    slidesEdit: document.querySelector('.slides__edit') as HTMLDivElement,
    cutButton: document.querySelector('.pop__menu-cut') as HTMLDivElement,
    slidesFilm: document.querySelector('.slides__film') as HTMLDivElement,
    filmBigSvg: document.querySelector('.film-big-svg') as SVGSVGElement,
}

export const edit_boxElems = {
    bigSvg: document.querySelector('#svg963')! as SVGSVGElement ,
    editBox: document.querySelector('.box-edit')! as HTMLElement,
    textarea: document.querySelector('.para-edit')! as HTMLInputElement,
    bigBox: document.querySelector('#big-box')! as SVGRectElement,
    svg: document.querySelector('#edit_box')! as SVGSVGElement,
    rightBottomCircle:  document.querySelector('#circle1')! as SVGCircleElement,
    leftBottomCircle:  document.querySelector('#circle2')! as SVGCircleElement,
    leftTopCircle:  document.querySelector('#circle3')! as SVGCircleElement,
    rightTopCircle:  document.querySelector('#circle4')! as SVGCircleElement,
    leftCenterCircle:  document.querySelector('#circle5')! as SVGCircleElement,
    rightCenterCircle:  document.querySelector('#circle6')! as SVGCircleElement,
    topCenterCircle:  document.querySelector('#circle7')! as SVGCircleElement,
    bottomCenterCircle:  document.querySelector('#circle8')! as SVGCircleElement,
    focusLineLeft: document.querySelector('#left-line')! as SVGLineElement,
    focusLineTop: document.querySelector('#top-line')! as SVGLineElement,
    focusLineBottom: document.querySelector('#bottom-line')! as SVGLineElement,
    focusLineRight: document.querySelector('#right-line')! as SVGLineElement,
    leftLineStart: document.querySelector('#left-line-start')! as SVGLineElement,
    topLineStart: document.querySelector('#top-line-start')! as SVGLineElement,
    bottomLineStart: document.querySelector('#bottom-line-start')! as SVGLineElement,
    rightLineStart: document.querySelector('#right-line-start')! as SVGLineElement,
    foreginContent: document.querySelector('#fro')! as SVGForeignObjectElement,
    linesStartBox: document.querySelector('#lines-start-box')! as SVGGElement
}

export const edit_box2Elems = {
    svg: document.querySelector('#edit_box2')! as SVGSVGElement,
    rightBottomCircle:  document.querySelector('#edit_box2 #circle1')! as SVGCircleElement,
    leftBottomCircle:  document.querySelector('#edit_box2 #circle2')! as SVGCircleElement,
    leftTopCircle:  document.querySelector('#edit_box2 #circle3')! as SVGCircleElement,
    rightTopCircle:  document.querySelector('#edit_box2 #circle4')! as SVGCircleElement,
    leftCenterCircle:  document.querySelector('#edit_box2 #circle5')! as SVGCircleElement,
    rightCenterCircle:  document.querySelector('#edit_box2 #circle6')! as SVGCircleElement,
    topCenterCircle:  document.querySelector('#edit_box2 #circle7')! as SVGCircleElement,
    bottomCenterCircle:  document.querySelector('#edit_box2 #circle8')! as SVGCircleElement,
    focusLineleft: document.querySelector('#edit_box2 #left-line')! as SVGLineElement,
    focusLineTop: document.querySelector('#edit_box2 #top-line')! as SVGLineElement,
    focusLineBottom: document.querySelector('#edit_box2 #bottom-line')! as SVGLineElement,
    focusLineRight: document.querySelector('#edit_box2 #right-line')! as SVGLineElement,
    leftLineStart: document.querySelector('#edit_box2 #left-line-start')! as SVGLineElement,
    topLineStart: document.querySelector('#edit_box2 #top-line-start')! as SVGLineElement,
    bottomLineStart: document.querySelector('#edit_box2 #bottom-line-start')! as SVGLineElement,
    rightLineStart: document.querySelector('#edit_box2 #right-line-start')! as SVGLineElement,
    foreginContent: document.querySelector('#edit_box2 #fro')! as SVGForeignObjectElement,
    linesStartBox: document.querySelector('#edit_box2 #lines-start-box')! as SVGGElement
}



export function openingBox(){
    const id = Date.now().toString();
    const boxOpening: string = `
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
                            <line id="left-line-start" x1="0" y1="6" x2="0" y2="125" class="start-lines"></line>
                            <line id="top-line-start" x1="0" y1="6" x2="390" y2="6" class="start-lines"></line>
                            <line id="bottom-line-start" x1="0" y1="125" x2="390" y2="125" class="start-lines" ></line>
                            <line id="right-line-start" x1="390" y1="125" x2="390" y2="6" class="start-lines"></line>
                        </g>
                        
                    <g id="elem-onFocus" class="dis-none">
                        <line id="left-line" data-drag="true" style="cursor: move;" x1="0" y1="6" x2="0" y2="125" class="line-svg-r"></line>
                        <line id="top-line" data-drag="true" style="cursor: move;" x1="0" y1="6" x2="390" y2="6" class="line-svg-r" style="cursor: n-resize"></line>
                        <line id="bottom-line" data-drag="true" style="cursor: move;" x1="0" y1="125" x2="390" y2="125" class="line-svg-r" style="cursor: n-resize"></line>
                        <line id="right-line" data-drag="true" style="cursor: move;" x1="390" y1="125" x2="390" y2="6" class="line-svg-r"></line>

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
                    
                    <foreignobject id="fro" x="5" y="10" width="380" height="110">

                        <body xmlns="http://www.w3.org/1999/xhtml">
                            <div class="box-edit">
                                <textarea placeholder="Add your title" spellcheck="false" name="text"
                                    class="para-edit placeholder=" some text"></textarea>
                            </div>
                        </body>
                    </foreignobject>

                </svg>
                <svg class="box-cont" id="edit_box2" x="-75" y="60" viewBox="-150 -120 886 300" width="500px" height="80px" xmlns="http://www.w3.org/2000/svg">
                    
                        <g id="lines-start-box">
                            <line id="left-line-start" x1="0" y1="6" x2="0" y2="125" class="start-lines"></line>
                            <line id="top-line-start" x1="0" y1="6" x2="600" y2="6" class="start-lines"></line>
                            <line id="bottom-line-start" x1="0" y1="125" x2="600" y2="125" class="start-lines" ></line>
                            <line id="right-line-start" x1="600" y1="125" x2="600" y2="6" class="start-lines"></line>
                        </g>
                        
                    <g id="elem-onFocus" class="dis-none">
                        <line id="left-line" data-drag="true" style="cursor: move;" x1="0" y1="6" x2="0" y2="125" class="line-svg-r"></line>
                        <line id="top-line" data-drag="true" style="cursor: move;" x1="0" y1="6" x2="600" y2="6" class="line-svg-r" style="cursor: n-resize"></line>
                        <line id="bottom-line" data-drag="true" style="cursor: move;" x1="0" y1="125" x2="600" y2="125" class="line-svg-r" style="cursor: n-resize"></line>
                        <line id="right-line" data-drag="true" style="cursor: move;" x1="600" y1="125" x2="600" y2="6" class="line-svg-r"></line>

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
                    
                    <foreignobject id="fro" x="5" y="10" width="590" height="110">

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
`
    return {boxOpening, id};
}
