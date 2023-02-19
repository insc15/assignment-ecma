import { useEffect, useState } from "../../../lib";

function productAddToCart() {
    useEffect(() => {
        document.querySelectorAll('.cart-quantity button').forEach(button => {
            button.addEventListener('click', (e) => {
                const { classList } = e.target.closest('button');
                const input = e.target.closest('.cart-quantity').querySelector('input');
                const value = parseInt(input.value);
                if(classList.contains('plus')){
                    input.value = value + 1;
                }else{
                    if(value > 1){
                        input.value = value - 1;
                    }
                }
            })
        })
    })

    return (`
        <div class='pb-16 border-b border-[#F2F2F2] w-3/4'>
            <p class='text-lg'>Số Lượng</p>
            <div class='overflow-hidden flex my-3 cart-quantity'>
                <button class='border border-[#ECECEC] h-8 w-8 flex items-center justify-center rounded-l cursor-pointer minus'><img src='/assets/icons/minus.svg'/></button>
                <input type='number' min='1' value="1" class='border border-[#ECECEC] h-8 w-10 text-center outline-none focus:outline-none'/>
                <button class='border border-[#ECECEC] h-8 w-8 flex items-center justify-center rounded-r cursor-pointer plus'><img src='/assets/icons/plus.svg'/></button>
            </div>
            <button class='w-80 py-3 bg-red-primary rounded text-white'>Chọn mua</button>
        </div>
    `);
}

export default productAddToCart;