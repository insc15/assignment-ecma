import { Splide } from '@splidejs/splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import vote from '../components/vote'
import { getRelatedByCategory } from '../../lib'
import database from '../../db.json' assert { type: 'json' }

const product = function(product){
    const positionInTop1000BestSeller = database.filter((book) => !book.isHidden && book.quantity_sold).sort((a, b) => b.quantity_sold.value - a.quantity_sold.value).findIndex(item => item.id === product.id) + 1

    console.log(positionInTop1000BestSeller)

    document.addEventListener('DOMContentLoaded', function () {
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

        const related = document.querySelector('#related-slider') &&  new Splide( '#related-slider', {
            perPage: 6,
            rewind : true,
            pagination: false,
          } );
          
        related?.mount();
    })

    const author = product.authors?.map(author => author.name).join(', ') || 'Chưa xác định'
    const discountPercent = Math.round((1 - product.current_seller.price / (product.original_price)) * 100)

    return (`
        <div class='max-w-screen-xl mx-auto py-4'>
            <div class='flex pb-12'>
                <div class='w-1/3 pr-3 border-r border-[#F2F2F2]'>
                    <div id="main-slider" class="splide mb-4">
                        <div class="splide__track">
                        <ul class="splide__list">
                            ${
                                product.images.map(image => {
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
                                    product.images.map(image => {
                                        return `<li class="splide__slide"><img src="${image.medium_url}" alt=""></li>`
                                    }).join('')
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div class='w-2/3 pl-3'>
                    <div class='flex'>
                        <p class='mr-4'>Tác giả: <span class='text-primary'>${author}</span></p>
                        ${
                            positionInTop1000BestSeller > 0 ? `<p>Đứng thứ 13 trong: <span class='text-primary mr-2'>Top 1000</span><span class='text-primary mr-2'>Sách tư duy - Kỹ năng sống</span><span class='text-primary'>bán chạy tháng này</span></p>` : ''
                        }
                    </div>
                    <h1 class='text-2xl mb-2 w-3/4'>${product.name}</h1>
                    <div class='flex items-center gap-2'>
                        ${
                            [vote(product.rating_average),product.quantity_sold?.text && `<p class='text-xs text-gray-primary'>${product.quantity_sold.text}</p>`].filter(item => item !== undefined || null).join(`<span class='mx-2 text-xs text-gray-primary leading-3'>|</span>`)
                        }
                    </div>
                    <div class='min-h-[103px] py-3 px-4 bg-[#FAFAFA] mb-8 mt-5 pb-4 w-3/4 after:content[""] after:-bottom-4 after:w-full after:h-px after:bg-[#F2F2F2] after:absolute relative after:left-0'>
                        <div class='flex items-end gap-2'>
                            <p class='text-3xl text-red-primary font-medium'>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.current_seller.price)}</p>
                            ${
                                discountPercent > 0 ? `<p class='text-sm text-gray-primary'>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.original_price || 1002000)}</p>
                                <p class='text-sm text-red-primary px-1 border border-red-primary rounded bg-red-primary bg-opacity-10'>${discountPercent}%</p>` : ''
                            }
                        </div>
                    </div>
                    <div class='pb-16 border-b border-[#F2F2F2] w-3/4'>
                        <p class='text-lg'>Số Lượng</p>
                        <div class='overflow-hidden flex my-3'>
                            <button class='border border-[#ECECEC] h-8 w-8 flex items-center justify-center rounded-l'><img src='/assets/icons/minus.svg'/></button>
                            <input type='text' class='border border-[#ECECEC] h-8 w-10 text-center outline-none focus:outline-none'/>
                            <button class='border border-[#ECECEC] h-8 w-8 flex items-center justify-center rounded-r'><img src='/assets/icons/plus.svg'/></button>
                        </div>
                        <button class='w-80 py-3 bg-red-primary rounded text-white'>Chọn mua</button>
                    </div>
                </div>
            </div>
            <div class='py-2'>
                <h4 class='text-xl text-black-primary mb-3'>Sản Phẩm Tương Tự</h4>
                ${
                    getRelatedByCategory(product).length > 0 ? `
                    <div id="related-slider" class="splide mb-4">
                        <div class="splide__track">
                            <ul class="splide__list">
                                ${
                                    getRelatedByCategory(product).map(book => {
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
                                                                [vote(product.rating_average),product.quantity_sold?.text && `<p class='text-xs text-gray-primary'>${product.quantity_sold.text}</p>`].filter(item => item !== undefined || null).join(`<span class='mx-2 text-xs text-gray-primary leading-3'>|</span>`) || ''
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
                    </div>` : ''
                }
            </div>
            <div class='py-3 w-3/4'>
                <h4 class='text-xl text-black-primary mb-3'>Thông tin chi tiết</h4>
                <div class='flex flex-wrap text-sm'>
                    ${
                        product.specifications[0].attributes.map((attr,index) => {
                            return (`
                                <div class='w-1/4 py-2 px-3 text-black-primary bg-[#EFEFEF]'>${attr.name}</div>
                                <div class='w-3/4 py-2 px-3 ${index % 2 !== 0 ? 'bg-[#FAFAFA]' : ''}'>${attr.value}</div>
                            `)
                        }).join('')
                    }
                </div>
            </div>
            <div class='py-3 w-3/4'>
                <h4 class='text-xl text-black-primary mb-3'>Mô Tả Sản Phẩm</h4>
                <div class='text-sm'>
                    ${product.description}
                </div>
                <div class='w-72 border border-[#189EFF] rounded py-3 my-8 mx-auto text-center text-[#189EFF]'>Xem Thêm Nội Dung</div>
            </div>
        </div>
    `)
}

export default product