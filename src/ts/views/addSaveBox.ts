export const addSaveBox = (href: string) => {
    const html = `
        <div class="save__slides-box">
            <a href="./slides.html#${href}">
                <div class="box-background">

                </div>

                <div class="box-data">
                    <p>Untitled presention</p>
                    <div class="box-data-details">
                        <div class="data-icon">
                            <img src="https://img.icons8.com/color/48/000000/google-slides.png" alt="">
                        </div>
                    </div>
                    <div class="box-data-timeCont">
                        <span class="box-data-status">Opened</span>
                        <span class="box-data-time">7 Oct 2020</span>
                    </div>
                </div>
            </a>
        </div>
    `;
    const appendBox = document.querySelector('.save__slides-boxCont') as HTMLDivElement;
    appendBox.insertAdjacentHTML('beforeend', html);
}