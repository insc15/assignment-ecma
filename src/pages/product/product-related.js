import { useEffect } from "../../../lib"
import { Splide } from "@splidejs/splide";
import vote from '../../components/vote'

const productRelated = (products) => {
    useEffect(() => {
        if(document.querySelector('#related-slider')){
            const related = document.querySelector('#related-slider') &&  new Splide( '#related-slider', {
                perPage: 6,
                rewind : true,
                pagination: false,
            } );
            
            related.mount();
        }
    })

    return (products && products.length > 0 && `
        <div id="related-slider" class="splide mb-4">
            <div class="splide__track">
                <ul class="splide__list">
                    ${
                        products.map(book => {
                            const discountPercent = (Math.round((1 - book.current_seller.price / (book.original_price || 1002000)) * 100)) > 0 ? `<p class='text-sm text-red-primary px-1 border border-red-primary rounded bg-red-primary bg-opacity-10'>${Math.round((1 - book.current_seller.price / (book.original_price || 1002000)) * 100)}%</p>` : ''
                            return (`
                                <li class="splide__slide">
                                    <a href='/product/${book.id}' class='hover:shadow-xl block p-2 h-full'>
                                        <div class='relative pt-[100%]'>
                                            <img class='absolute top-0 left-0 right-0 bottom-0 h-full mx-auto' src='${book.images[0].medium_url}' alt='${book.name}' />
                                        </div>
                                        <div class='py-3'>
                                            <img class='w-14 mb-2' src='/assets/tikinow.png' alt='tikinow' />
                                            <p class='text-green-primary text-xs mb-2'>GIAO SIÊU TỐC 2H</p>
                                            <h4 class='text-sm mb-2'>${book.name}</h4>
                                            <div class='flex items-center mb-2'>
                                                ${
                                                    [vote(book.rating_average),book.quantity_sold?.text && `<p class='text-xs text-gray-primary'>${book.quantity_sold.text}</p>`].filter(item => item !== undefined || null).join(`<span class='mx-2 text-xs text-gray-primary leading-3'>|</span>`) || ''
                                                }
                                            </div>
                                            <div class='flex items-center'>
                                                <p class='text-lg mr-2 text-red-primary font-medium'>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.current_seller.price)}</p>
                                                ${discountPercent}
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            `)
                        }).join('')
                    }
                </ul>
            </div>
        </div>`)
}

export default productRelated