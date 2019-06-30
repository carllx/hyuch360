
const wix = (str,siz) => {
    const para = siz!=undefined?`/v1/fit/w_${siz},h_${siz}/${str}`:''
    return `https://static.wixstatic.com/media/${str}${para}`
}

module.export = wix;