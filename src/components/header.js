import breadcrumb from "./breadcrumb";

const header = function(){
    return (`
        <header class='bg-[#1A94FF] text-white'>
            <div class='flex max-w-screen-xl mx-auto py-4 items-start'>
                <a href='/'><img src='/assets/logo.png'/></a>
                <div class='flex ml-auto'>
                    <form method='get' action='' class='flex h-10 rounded overflow-hidden mr-4'>
                        <input name='s' class='w-[626px] focus:outline-none outline-none py-1 px-2 text-black'/>
                        <button class='bg-[#0D5CB6] px-4 py-1 flex items-center' type='submit'><img src='/assets/icons/search.png' class='mr-2'/>Tìm kiếm</button>
                    </form>
                    <div class='flex items-center mr-6'>
                        <img src='/assets/icons/account.png' class='mr-2'/>
                        <div class=''>
                            <a class='block text-xs' href='#'>Đăng Nhập / Đăng Ký</a>
                            <a class='flex text-sm' href='#'>Tài khoản<img src='/assets/icons/arrow-down.png'/></a>
                        </div>
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
        ${breadcrumb()}
    `);
}

export default header()