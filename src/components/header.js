import Cookies from "js-cookie";
import breadcrumb from "./breadcrumb";
import { useState, useEffect } from "../../lib";

const header = function(){
    const [isLogin, setLogin] = useState(JSON.parse(Cookies.get('user') || "false"))

    useEffect(() => {
        document.querySelector('a[data-button="logout"]')?.addEventListener('click', function(e){
            e.preventDefault()
            Cookies.remove('user')
            setLogin(false)
        })
    })

    return (`
        <header class='bg-[#1A94FF] text-white'>
            <div class='flex max-w-screen-xl mx-auto py-4 items-start'>
                <a href='/'><img src='/assets/logo.png'/></a>
                <div class='flex ml-auto'>
                    <form method='get' action='' class='flex h-10 rounded overflow-hidden mr-4'>
                        <input name='s' class='w-[626px] text-black-primary focus:outline-none outline-none py-1 px-2 '/>
                        <button class='bg-primary px-4 py-1 flex items-center' type='submit'><img src='/assets/icons/search.png' class='mr-2'/>Tìm kiếm</button>
                    </form>
                    <div class='flex items-center mr-6'>
                        <img src='/assets/icons/account.png' class='mr-2'/>
                        ${
                            isLogin ? 
                            /*html*/ `
                            <div class='relative group'>
                                <p class='block text-xs' href='#'>${isLogin.id}</p>
                                <p class='flex text-sm cursor-pointer' href='#'>Tài khoản<img src='/assets/icons/arrow-down.png'/></p>
                                <ul class='absolute top-[100%] text-black-primary -right-12 bg-white w-[200px] rounded shadow-lg py-2 duration-150 translate-y-10 invisible opacity-0 group-hover:translate-y-0 group-hover:visible group-hover:opacity-100'>
                                    ${isLogin.role ==='admin' ? `<li class='hover:bg-gray-100'><a class='px-4 py-2 block' href='/admin'>Dashboard</a></li>` : ''}
                                    <li class='hover:bg-gray-100'><a data-button='logout' class='px-4 py-2 block cursor-pointer'>Đăng xuất</a></li>
                                </ul>
                            </div>
                            ` :
                            /*html*/ `
                            <a href='/login' class='block'>
                                <p class='block text-xs' href='#'>Đăng Nhập / Đăng Ký</p>
                                <p class='flex text-sm' href='#'>Tài khoản<img src='/assets/icons/arrow-down.png'/></p>
                            </a>
                            `
                        }
                    </div>
                    <div class='flex items-center'>
                        <div class='relative'>
                            <img src='/assets/icons/cart.png' class='mr-2'/>
                            <span class='absolute top-0 right-0 rounded-full bg-[#FDD835] px-[6px] aspect-square text-black-primary text-xs'>0</span>
                        </div>
                        <p class='mt-auto'>Giỏ hàng</p>
                    </div> 
                </div>
            </div>
        </header>
    `);
}

export default header