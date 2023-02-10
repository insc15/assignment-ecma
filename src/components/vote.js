const vote = function (count = 0) {
    if(count === 0) return (null)
    return (`
        <div class='leading-none'>
            ${
                Array.from({ length: Math.round(count) }, () => {
                    return `<img class='inline-block' src='/assets/icons/star.svg' alt='star' />`
                }).join('')
            }
        </div>
    `)
}

export default vote