const vote = function (count = 0) {
    return (`
        <div class='leading-none'>
            ${
                Array.from({ length: count }, () => {
                    return `<img class='inline-block' src='/assets/icons/star.svg' alt='star' />`
                }).join('')
            }
        </div>
    `)
}

export default vote