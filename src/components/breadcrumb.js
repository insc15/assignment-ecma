const breadcrumb = function(){
    const pageTitle = document.title
    const baseUrl = window.location.origin

    return(`
        <div class='py-[10px] bg-[#F5F5FA]'>
            <div class='max-w-screen-xl mx-auto flex'>
                <a href='${baseUrl}' class='text-gray-primary'>Trang chủ</a>
                <img src='/assets/icons/right-arrow.svg' class='mx-2 text-[#808089]'/>
                <p>${pageTitle}</p>
            </div>
        </div>
    `)
}

export default breadcrumb