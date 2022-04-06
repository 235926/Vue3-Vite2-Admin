// // 获取所有 SymbolId
// import Icons from 'virtual:svg-icons-names'

// const svgIcons = Icons.map(item=>{
//     return item.slice(5)
// })

// export default svgIcons

let svgIcons = []
const svgFiles = import.meta.globEager('../../../assets/svg/*.svg')
for (const path in svgFiles) {
    const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
    svgIcons = [
        ...svgIcons,
        moduleName
    ]
}

export default svgIcons