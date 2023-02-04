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

export {
    getCategoriesFromDatabase
}