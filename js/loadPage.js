const fetchHtmlFile = async (pageName) => {
    let result = await  fetch(`../pages/${pageName}.html`).then(res => {
        if (res.ok) {
            return res.text()
        }
    })
    return result
}

const loadPage = async () => {
    const pageName = getQueryParameter()
    if (pageName == null) {
        return
    }
    const result = await fetchHtmlFile(pageName)
    if (result == null) {
        return
    }
    const contentDiv = document.getElementById("content")
    contentDiv.innerHTML = result
}

const getQueryParameter = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      return params.page;
}

document.onreadystatechange = async () => {
    if (document.readyState === 'complete') {
        await loadPage()
    }
}