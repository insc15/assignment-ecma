import database from '../db.json' assert { type: 'json' }

const RemoveDuplicates = (array, key) => {
    return array.reduce((result, currentItem) => {
      const uniqueItem = result.filter(i => i[key] !== currentItem[key]);
      return [...uniqueItem, currentItem];
    }, []);
};

const getCategoriesFromDatabase = function(){
    return RemoveDuplicates(database.map(item => item.categories), 'id')
}

const getRelatedByCategory = function(product){
    return database.filter(item => item.categories.id === product.categories.id && item.isHidden !== false && item.id !== product.id)
}

const sortByKey = function(array, key, operator) {
    return array.sort(function(a, b) {
        switch (operator) {
            case "ASC":
                return a[key] - b[key]
                break;
            case "DESC":
                return b[key] - a[key]
                break;
            default:
                break;
        }
    });
}

export {
    getCategoriesFromDatabase,
    getRelatedByCategory
}