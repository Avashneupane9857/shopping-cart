let shop = document.getElementById('shop')
let basket = JSON.parse(localStorage.getItem("data")) || []

let getShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let search = basket.find((w) => w.id === x.id) || []
        return `
       <div product-id-${x.id} class="item">
            <img src=${x.img} width="220px" alt="">
            <div class="details">
                <h3 class="product-name">${x.pname}</h3>

                <p class="about">${x.des}
                </p>
                <div class="price-and-quantity">
                    <h4 class="price">$ ${x.price}</h4>
                    <div class="buttons">
                        <i onclick="decrement(${x.id})" class="fas -solid fa-minus"></i>
                        <div id=${x.id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                        <i onclick="increment(${x.id})" class="fas -regular fa-plus"></i>

                    </div>
                </div>
            </div>
        </div>
   `

    })
        .join(""))
}
getShop();
let increment = (id) => {
    let selectedItem = id
    let search = basket.find((d) => d.id === selectedItem.id)
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        })
    }
    else {
        search.item += 1
    }
    localStorage.setItem("data", JSON.stringify(basket))
    update(selectedItem.id)
}

let decrement = (id) => {
    let selectedItem = id
    let search = basket.find((d) => d.id === selectedItem.id)
    // search.item = Math.max(0, search.item - 1)
    if (search === undefined) return
    else if (search.item === 0)
        return
    else {
        search.item -= 1
    }

    update(selectedItem.id)
    basket = basket.filter((a) => a.item !== 0)
    localStorage.setItem("data", JSON.stringify(basket))
}






let update = (id) => {
    let search = basket.find((a) => a.id === id)
    document.getElementById(id).innerHTML = search.item
    calculation()
}
let calculation = () => {
    let cartIcon = document.getElementById("cartamounts")
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}


calculation();