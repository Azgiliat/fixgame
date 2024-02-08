export function loadPacks({commit}) {
    commit('setLoadingStatus', true)
    let api = this;
    return this.$shopapi.getItems()
        .then(res => {
            res.map(function (item) {
                item["meta"].split(';').forEach(function (it) {
                    if (it !== "") {
                        let metaData = it.split(':');
                        item[metaData[0]] = metaData.slice(1).join(':').trim();
                    }
                });
                return item;
            });
            commit('setPacks', res)
            api.$caseapi.getAllCases().then(function (data) {
                commit("addCases", data, {root: true});

                commit("addAllItems", api.$shopapi.getAllItems(res), {root: true});
                setTimeout(() => {
                    commit('setLoadingStatus', false)
                }, 2000)
            })

        })
}
