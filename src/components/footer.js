const footer = function(){
    return (`
        <footer class='text-gray-primary'>
            <div class='flex max-w-screen-xl mx-auto py-4 justify-between'>
                <div class='w-1/5 text-sm px-2'>
                    <h3 class='mb-3 text-black-primary text-base'>Hỗ trợ khách hàng</h3>
                    <p class='mb-2'>Hotline: <a href='#' class='text-black-primary'>1900-6035</a> <br> (1000 đ/phút, 8-21h kể cả T7, CN) </p>
                    <p class='mb-2'>Các câu hỏi thường gặp</p>
                    <p class='mb-2'>Gửi yêu cầu hỗ trợ</p>
                    <p class='mb-2'>Hướng dẫn đặt hàng</p>
                    <p class='mb-2'>Phương thức vận chuyển</p>
                    <p class='mb-2'>Chính sách đổi trả</p>
                    <p class='mb-2'>Hướng dẫn trả góp</p>
                    <p class='mb-2'>Chính sách hàng nhập khẩu</p>
                    <p class='mb-2'>Hỗ trợ khách hàng: <a href='#' class='text-black-primary'>hotro@tiki.vn</a></p>
                    <p>Báo lỗi bảo mật: <a href='#' class='text-black-primary'>security@tiki.vn</a></p>
                </div>
                <div class='w-1/5 text-sm px-2'>
                    <h3 class='mb-3 text-black-primary text-base'>Về Tiki</h3>
                    <p class='mb-2'>Giới thiệu Tiki</p>
                    <p class='mb-2'>Tuyển dụng</p>
                    <p class='mb-2'>Chính sách bảo mật thanh toán</p>
                    <p class='mb-2'>Chính sách bảo mật thông tin cá nhân</p>
                    <p class='mb-2'>Chính sách giải quyết khiếu nại</p>
                    <p class='mb-2'>Điều khoản sử dụng</p>
                    <p class='mb-2'>Giới thiệu Tiki Xu</p>
                    <p class='mb-2'>Tiếp thị liên kết cùng Tiki</p>
                    <p class='mb-2'>Bán hàng doanh nghiệp</p>
                    <p class='mb-2'>Điều kiện vận chuyển</p>
                </div>
                <div class='w-1/5 text-sm px-2'>
                    <h3 class='mb-3 text-black-primary text-base'>Hợp tác và liên kết</h3>
                    <p class='mb-2'>Quy chế hoạt động Sàn GDTMĐT</p>
                    <p class='mb-6'>Bán hàng cùng Tiki</p>
                    <h3 class='mb-3 text-black-primary text-base'>Chứng nhận bởi</h3>
                    <div class='flex'>
                        <img src='/assets/Rectangle.png' class='mr-3'/>
                        <img src='/assets/bocongthuong.png'/>
                    </div>
                </div>
                <div class='w-1/5 text-sm px-2'>
                    <h3 class='mb-3 text-black-primary text-base'>Phương thức thanh toán</h3>
                    <div class='grid grid-cols-5 gap-2 mb-6'>
                        ${
                            Array.from({length: 12}, (v, i) => {
                                return `<img src='/assets/icons/payment/Frame${i !== 0 ? ('-' + i) : ''}.svg'/>`
                            }).join('')
                        }
                    </div>
                    <h3 class='mb-3 text-black-primary text-base'>Dịch vụ giao hàng</h3>
                    <img src='/assets/icons/tikinow.svg'/>
                </div>
                <div class='w-1/5 text-sm px-2'>
                    <h3 class='mb-3 text-black-primary text-base'>r</h3>
                    <div class='mb-6'>
                        <img class='inline' src='/assets/icons/facebook.svg'/>
                        <img class='inline' src='/assets/icons/youtube.svg'/>
                        <img class='inline' src='/assets/icons/zalo.svg'/>
                    </div>
                    <h3 class='mb-3 text-black-primary text-base'>Tải ứng dụng trên điện thoại</h3>
                    <div class='flex'>
                        <img class='mr-2' src='/assets/icons/qr.png'/>
                        <div class='grid justify-between'>
                        <img src='/assets/icons/appstore.png'/>
                        <img src='/assets/icons/ggplay.png'/>
                        </div>
                    </div>
                </div>
            </div>
            <div class='max-w-screen-xl mx-auto py-4 border-t border-[#EBEBF0] text-sm px-2'>
                <p class='mb-2'>Trụ sở chính: Tòa nhà Viettel, Số 285, đường Cách Mạng Tháng 8, phường 12, quận 10, Thành phố Hồ Chí Minh</p>
                <p class='mb-2'>Tiki nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ mua và nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử lý đơn hàng</p>
                <p class='mb-2'>Giấy chứng nhận Đăng ký Kinh doanh số 0309532909 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp lần đầu ngày 06/01/2010 và sửa đổi lần thứ 23 ngày 14/02/2022</p>
                <p>© 2022 - Bản quyền của Công ty TNHH Ti Ki</p>
            </div>
        </footer>
    `);
}

export default footer()