import axios from "axios";
import { getCategoriesFromDatabase, useEffect,useState } from "../../../lib";
import footer from "../../components/footer";
import header from "../../components/header";

function adminDashboard() {
    const [books, setBooks] = useState([])

    useEffect(async()=>{
        const data = (await axios.get('http://localhost:3000/books')).data
        setBooks(data)
    },[])

    useEffect(()=>{
        document.querySelectorAll('button[data-button]').forEach((button) => {
            button.addEventListener('click', async(e) => {
                const { button } = e.target.dataset;

                if(confirm('Bạn có muốn xoá sản phẩm này không?')){
                    const res = await axios.delete(`http://localhost:3000/books/${button.split('-')[1]}`)

                    if(res.status === 200){
                        const data = (await axios.get('http://localhost:3000/books')).data
                        setBooks(data)
                    }
                }
            })
        })
    },[books])
    
    return (`
        ${header()}
        <div class='max-w-screen-xl mx-auto py-4'>
            <h1 class="text-3xl font-medium">Dashboard</h1>
            <table class="min-w-full">
                <thead class="bg-white border-b">
                    <tr>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            #
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Ảnh
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Tên sách
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Danh mục
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Giá
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody>
                    ${
                        books.map((book,index) => {
                            const discountPercent = Math.round((1 - book.current_seller.price / (book.original_price)) * 100)

                            return (`
                                <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                    <td class="px-2 py-1 w-14 whitespace-nowrap text-sm text-center font-medium text-gray-900">${index + 1}</td>
                                    <td class="text-sm text-gray-900 px-2 py-1 whitespace-nowrap w-14"><img class='aspect-square object-contain' src='${book.images[0].base_url}'/></td>
                                    <td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap w-1/3 truncate max-w-0"><a href='/product/${book.id}' class='hover:text-primary hover:underline' target="_blank">${book.name}</a></td>
                                    <td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap w-1/5 max-w-0 truncate">${book.categories.name}</td>
                                    <td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap truncate flex gap-2">
                                        <p class='text-red-primary font-medium'>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.current_seller.price)}</p>
                                        ${
                                            discountPercent > 0 ? `<p class='text-sm line-through text-gray-primary'>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.original_price || 1002000)}</p>
                                            <p class='text-sm text-red-primary px-1 border border-red-primary rounded bg-red-primary bg-opacity-10'>${discountPercent}%</p>` : ''
                                        }
                                    </td>
                                    <td class="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                        <a href='/admin/product/${book.id}' class='text-white py-1 px-2 bg-primary rounded'>Sửa</a>
                                        <button data-button='remove-${book.id}' class='text-red-primary py-1 px-2 hover:underline'>Xóa</button>
                                    </td>
                                </tr>
                            `)
                        }).join('')
                    }
                </tbody>
            </table>
        </div>
        ${footer}
    `);
}

export default adminDashboard;