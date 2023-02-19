import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import vote from '../../components/vote'
import { getRelatedByCategory, useEffect, useState } from '../../../lib'
import axios from 'axios'
import productGallery from './product-gallery'
import productRelated from './product-related'
import header from '../../components/header'
import footer from '../../components/footer'
import productAddToCart from './product-add-to-cart'

const product = function(id){
    const [product_data, setProduct_data] = useState(null)

    useEffect(async() => {
        const products = await (await axios.get(`http://localhost:3000/books/`)).data
        const currentProduct = products.find(item => item.id === Number(id))
        setProduct_data({
            ...currentProduct,
            positionInTop1000BestSeller: products.filter((book) => !book.isHidden && book.quantity_sold).sort((a, b) => b.quantity_sold.value - a.quantity_sold.value).findIndex(item => item.id === currentProduct.id) + 1,
            author: currentProduct.authors?.map(author => author.name).join(', ') || 'Chưa xác định',
            discountPercent: Math.round((1 - currentProduct.current_seller.price / (currentProduct.original_price)) * 100),
            related: await getRelatedByCategory(currentProduct)
        })
    },[])

    // useEffect(() => {
    //     console.log(product_data)
    // })

    //     document.querySelector('.cart-quantity .minus')?.addEventListener('click', function(){
    //         const quantity = document.querySelector('.cart-quantity input')
    //         if(parseInt(quantity.value) - 1 > 0){
    //             quantity.value = parseInt(quantity.value) - 1
    //         }
    //     })

    //     document.querySelector('.cart-quantity .plus')?.addEventListener('click', function(){
    //         const quantity = document.querySelector('.cart-quantity input')
    //         quantity.value = parseInt(quantity.value) + 1
    //     })
    // })

    return (`
        ${header()}
        <div class='max-w-screen-xl mx-auto py-4'>
            <div class='flex pb-12'>
                ${productGallery(product_data?.images)}
                <div class='w-2/3 pl-3'>
                    <div class='flex'>
                        <p class='mr-4'>Tác giả: <span class='text-primary'>${product_data?.author}</span></p>
                        ${
                            product_data?.positionInTop1000BestSeller > 0 ? `<p>Đứng thứ ${product_data?.positionInTop1000BestSeller} trong: <span class='text-primary mr-2'>Top 1000</span><span class='text-primary mr-2'>${product_data.categories.name}</span><span class='text-primary'>bán chạy tháng này</span></p>` : ''
                        }
                    </div>
                    <h1 class='text-2xl mb-2 w-3/4'>${product_data?.name}</h1>
                    <div class='flex items-center gap-2'>
                        ${
                            [vote(product_data?.rating_average),product_data?.quantity_sold?.text && `<p class='text-xs text-gray-primary'>${product_data?.quantity_sold.text}</p>`].filter(item => item !== undefined || null).join(`<span class='mx-2 text-xs text-gray-primary leading-3'>|</span>`)
                        }
                    </div>
                    <div class='min-h-[103px] py-3 px-4 bg-[#FAFAFA] mb-8 mt-5 pb-4 w-3/4 after:content[""] after:-bottom-4 after:w-full after:h-px after:bg-[#F2F2F2] after:absolute relative after:left-0'>
                        <div class='flex items-end gap-2'>
                            <p class='text-3xl text-red-primary font-medium'>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product_data?.current_seller.price)}</p>
                            ${
                                product_data?.discountPercent > 0 ? `<p class='text-sm text-gray-primary'>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product_data.original_price || 1002000)}</p>
                                <p class='text-sm text-red-primary px-1 border border-red-primary rounded bg-red-primary bg-opacity-10'>${product_data.discountPercent}%</p>` : ''
                            }
                        </div>
                    </div>
                    ${productAddToCart()}
                </div>
            </div>
            <div class='py-2'>
                <h4 class='text-xl text-black-primary mb-3'>Sản Phẩm Tương Tự</h4>
                ${productRelated(product_data?.related)}
            </div>
            <div class='py-3 w-3/4'>
                <h4 class='text-xl text-black-primary mb-3'>Thông tin chi tiết</h4>
                <div class='flex flex-wrap text-sm'>
                    ${
                        product_data?.specifications.find(x=>x!==undefined).attributes.map((attr,index) => {
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
                <div class='text-sm product_data-description'>
                    <p>${product_data?.description}</p>
                </div>
            </div>
        </div>
        ${footer}
    `)
}

// <div class='w-72 border border-[#189EFF] rounded py-3 my-8 mx-auto text-center text-[#189EFF]'>Xem Thêm Nội Dung</div>

export default product