import { getCategoriesFromDatabase } from "../../lib"
import db from "../../db.json"
import vote from "../components/vote"
import slugify from "slugify"

const home = function() {
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.book-sort li').forEach(item => {
            item.addEventListener('click', function(){
                document.querySelectorAll('.book-sort li').forEach(item => {
                    item.classList.remove('active')
                })
                this.classList.add('active')
            })
        })
    }, false)

    return (`
        <div class='max-w-screen-xl mx-auto py-4 flex'>
            <section class='basis-3/12 text-black-primary'>
                <p class='text-lg uppercase mb-4'>Danh mục sản phẩm</p>
                <div class='flex flex-col'>
                    ${
                        getCategoriesFromDatabase().map(category => {
                            return `<a class='mb-2' href='/category/${category.id}'>${category.name}</a>`
                        }).join('')
                    }
                </div>
            </section>
            <section class='basis-9/12'>
                <h1 class='text-3xl capitalize text-black-primary px-3 pb-3'>Nhà sách Tiki</h1>
                <img class='w-3/4' src='/assets/banner.png' alt='banner'>
                <div class='py-3'>
                    <ul class='book-sort text-black-primary capitalize flex relative before:content-[""] before:border-b before:absolute before:bottom-[0.1rem] before:w-full before:-z-10'>
                        <li class='px-2 py-2 border-b-4 border-transparent mr-5 cursor-pointer active'>Phổ biến</li>
                        <li class='px-2 py-2 border-b-4 border-transparent mr-5 cursor-pointer'>Bán chạy</li>
                        <li class='px-2 py-2 border-b-4 border-transparent mr-5 cursor-pointer'>Hàng mới</li>
                        <li class='px-2 py-2 border-b-4 border-transparent mr-5 cursor-pointer'>Giá thấp</li>
                        <li class='px-2 py-2 border-b-4 border-transparent mr-5 cursor-pointer'>Giá cao</li>
                    </ul>
                    <div class='book-filter flex py-4'>
                        <div class='px-3 cursor-pointer bg-gray-secondary rounded-full mr-2'>
                            <img src='/assets/tikinow.png' alt='tikinow' />
                        </div>
                        <div class='px-3 cursor-pointer bg-gray-secondary rounded-full'>
                            <img src='/assets/freeship.png' alt='freeship' />
                        </div>
                    </div>
                </div>
                <div class='flex flex-wrap -mx-4'>
                    ${
                        db.map(book => {
                            if(book.isHidden){return null}
                            const discountPercent = (Math.round((1 - book.current_seller.price / (book.original_price || 1002000)) * 100)) > 0 ? `<p class='text-sm text-red-primary px-1 border border-red-primary rounded bg-red-primary bg-opacity-10'>${Math.round((1 - book.current_seller.price / (book.original_price || 1002000)) * 100)}%</p>` : ''
                            return (`
                                <div class='w-1/4 px-3'>
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
                                                    [vote(book.rating_average),book.quantity_sold?.text && `<p class='text-xs text-gray-primary'>${book.quantity_sold.text}</p>`].filter(item => item !== undefined || null).join(`<span class='mx-2 text-xs text-gray-primary leading-3'>|</span>`)
                                                }
                                            </div>
                                            <div class='flex items-center'>
                                                <p class='text-lg mr-2 text-red-primary font-medium'>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.current_seller.price)}</p>
                                                ${discountPercent}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            `)
                        }).join('')
                    }
                </div>
            </section>
        </div>
    `)
}

export default home()