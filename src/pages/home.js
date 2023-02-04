import { getCategoriesFromDatabase } from "../../lib"

const home = function() {
    const categories = getCategoriesFromDatabase().map(category => {
        return `<a class='/category/${category.id}'>${category.name}</a>`
    }).join('')

    return (`
        <div class='max-w-screen-xl mx-auto py-4 flex'>
            <div class='basis-3/12 text-black-primary'>
                <p class='text-lg uppercase'>Danh mục sản phẩm</p>
                <div class='flex flex-col'>
                    ${categories}
                </div>
            </div>
            <div class='basis-9/12'>
                <p>Danh mục sản phẩm</p>
            </div>
        </div>
    `)
}

export default home()