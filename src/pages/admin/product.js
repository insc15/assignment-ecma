import axios from "axios";
import { useEffect, useState } from "../../../lib";
import footer from "../../components/footer";
import header from "../../components/header";
import { Jodit } from "jodit";
import '../../../node_modules/jodit/build/jodit.min.css'
import JustValidate from "just-validate";

function adminProduct(id) {
    const [product_data, setProduct_data] = useState(null)

    useEffect(async() => {
        const product = await (await axios.get(`http://localhost:3000/books/${id}`)).data
        setProduct_data(product)
    },[])

    useEffect(() => {
        const editor = Jodit.make('#description',{
            height: 500,
        })

        const validator = new JustValidate('main form')

        validator.addField('input[name="name"]', [
            {
                rule: 'required',
                errorMessage: 'Vui lòng nhập trường này'
            }
        ])
        .addField('input[name="original_price"]', [
            {
                rule: 'required',
                errorMessage: 'Vui lòng nhập trường này'
            },
            {
                rule: 'minNumber',
                value: 0,
            },
        ])
        .addField('input[name="current_price"]', [
            {
                rule: 'minNumber',
                value: 0,
            },
            {
                validator: (value) => {
                    const original_price = document.querySelector('input[name="original_price"]').value;
                    if(Number(value) > Number(original_price)){
                        return false;
                    }

                    return true;
                },
                errorMessage: 'Giá hiện tại không được nhỏ hơn giá gốc'
            }
        ])
        .onSuccess(async({target}) => {
            const form = new FormData(target);
            const formData = Object.fromEntries(form.entries());

            formData.description = editor.value;
            formData.current_seller = {price: formData.current_price}

            const newData = {
                ...product_data, 
                ...formData, 
                current_seller: {...product_data.current_seller,price: formData.current_price},
            }

            delete newData.current_price

            try {
                const res = await axios.put(`http://localhost:3000/books/${id}`, newData);
                if(res.status === 200){
                    alert('Sửa sản phẩm thành công')
                    window.location.href = '/admin'
                }
            } catch (error) {
                console.log(error)
            }
        })
        
    }, [product_data])

    return (`
        ${header()}
        ${`
            <main class='max-w-screen-xl mx-auto py-4'>
                <a href="/admin" class="hover:underline flex items-center mb-4"><img class='w-4 mr-2' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgOTYgOTYwIDk2MCIgd2lkdGg9IjQ4Ij48cGF0aCBkPSJNMzU5IDgxNCAxMjAgNTc1bDIzOS0yMzkgNDMgNDMtMTY2IDE2Nmg2MDR2NjBIMjM2bDE2NiAxNjYtNDMgNDNaIi8+PC9zdmc+'/>Quay về Dashboard</a>
                <h1 class="text-2xl font-medium">Sửa sản phẩm ${product_data?.name}</h1>
                <form class="mt-4">
                    <div class="flex flex-col mt-4">
                        <label for="name" class="text-sm font-medium text-gray-900 mb-2">Tên sản phẩm</label>
                        <input type="text" name="name" id="name" class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value="${product_data?.name}">
                    </div>
                    <div class="flex mt-4">
                        <div class="flex flex-col w-1/2 mr-2">
                            <label for="price" class="text-sm font-medium text-gray-900 mb-2">Giá gốc</label>
                            <input type="number" name="original_price" id="price" class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value="${product_data?.original_price}">
                        </div>
                        <div class="flex flex-col w-1/2 ml-2">
                            <label for="sale" class="text-sm font-medium text-gray-900 mb-2">Giá khuyến mãi</label>
                            <input type="number" name="current_price" id="sale" class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value="${product_data?.current_seller.price}">
                        </div>
                    </div>
                    <div class="flex flex-col mt-4">
                        <label for="description" class="text-sm font-medium text-gray-900 mb-2">Mô tả</label>
                        <textarea name="description" id="description" class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">${product_data?.description}</textarea>
                    </div>
                    <button type="submit" class="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Lưu</button>
                </form>
            </main>
        `}
        ${footer}
    `);
}

export default adminProduct;