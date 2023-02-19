import { useEffect } from "../../../lib"
import { Splide } from "@splidejs/splide";

const productGallery = (images) => {
    useEffect(() => {
        if(document.querySelector('#main-slider')){
            const main = new Splide('#main-slider', {
                type: 'fade',
                heightRatio: 1,
                pagination: false,
                arrows: false,
                cover: true,
            });
    
            const thumbnails = new Splide('#thumbnail-slider', {
                rewind: true,
                fixedWidth: 62,
                fixedHeight: 62,
                isNavigation: true,
                gap: 10,
                arrows: false,
                pagination: false,
                cover: true,
                dragMinThreshold: {
                    mouse: 4,
                    touch: 10,
                },
                breakpoints: {
                    640: {
                        fixedWidth: 66,
                        fixedHeight: 38,
                    },
                },
            });
    
            main.sync(thumbnails);
            main.mount();
            thumbnails.mount();
        }
    })

    return (images && `
    <div class='w-1/3 pr-3 border-r border-[#F2F2F2]'>
        <div id="main-slider" class="splide mb-4">
            <div class="splide__track">
            <ul class="splide__list">
                ${
                    images.map(image => {
                        return `<li class="splide__slide"><img src="${image.large_url}" alt=""></li>`
                    }).join('')
                }
            </ul>
            </div>
        </div>
        <div id="thumbnail-slider" class="splide">
            <div class="splide__track">
                <ul class="splide__list">
                    ${
                        images.map(image => {
                            return `<li class="splide__slide"><img src="${image.medium_url}" alt=""></li>`
                        }).join('')
                    }
                </ul>
            </div>
        </div>
    </div>`)
}

export default productGallery