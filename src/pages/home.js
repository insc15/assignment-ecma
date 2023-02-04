import { getCategoriesFromDatabase } from "../../lib"

const home = function() {
    var categories = getCategoriesFromDatabase().map(category => {
        return `<a class='mb-2' href='/category/${category.id}'>${category.name}</a>`
    }).join('')

    const a = {test: (alo) => console.log(alo)}

    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.book-filter li').forEach(item => {
            item.addEventListener('click', function(){
                document.querySelectorAll('.book-filter li').forEach(item => {
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
                    ${categories}
                </div>
            </section>
            <section class='basis-9/12'>
                <h1 class='text-3xl capitalize text-black-primary px-3 pb-3'>Nhà sách Tiki</h1>
                <img class='w-3/4' src='/assets/banner.png' alt='banner'>
                <div class='py-3'>
                    <ul class='book-filter text-black-primary capitalize flex relative before:content-[""] before:border-b before:absolute before:bottom-[0.1rem] before:w-full before:-z-10'>
                        <li class='px-2 py-2 border-b-4 border-transparent mr-5 cursor-pointer active'>Phổ biến</li>
                        <li class='px-2 py-2 border-b-4 border-transparent mr-5 cursor-pointer'>Bán chạy</li>
                        <li class='px-2 py-2 border-b-4 border-transparent mr-5 cursor-pointer'>Hàng mới</li>
                        <li class='px-2 py-2 border-b-4 border-transparent mr-5 cursor-pointer'>Giá thấp</li>
                        <li class='px-2 py-2 border-b-4 border-transparent mr-5 cursor-pointer'>Giá cao</li>
                    </ul>
                </div>
            </section>
        </div>
    `)
}

export default home()