export function getItemsByType(state) {
    return (elType) => state.packs.filter(i => i.products[0].category === elType);
}

export function getItemsById(state) {
    return (Id) => state.packs.find(item => {
        return item.id === Id
    });
}