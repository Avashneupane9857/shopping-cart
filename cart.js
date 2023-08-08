let label = document.getElementById("label")
let shoppingcart = document.getElementById("shopping-cart")
let basket = JSON.parse(localStorage.getItem("data")) || []
let calculation = () => {
    let cartIcon = document.getElementById("cartamounts")
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}
calculation();
let generateCartItems = () => {
    if (basket.length !== 0) {

        return (shoppingcart.innerHTML = basket.map((x) => {
            let { id, item } = x
            let search = shopItemsData.find((y) => y.id === id) || []
            return `
        <div class="cart-item">
       <img width="70" src=${search.img} alt=""/>
    <div class="details"> 

    <div class="title-price-x">
    
    <h4 class="title-price">
   <p class="pname">  ${search.pname} </p> 
   <p class="pprice"> $ ${search.price}</p>
        </h4>
        
 <i onclick=" removeItem(${id})" class="fas -thin fa-circle-xmark"></i>

    </div>
     <div class="buttons">
                        <i onclick="decrement(${x.id})" class="fas -solid fa-minus"></i>
                        <div id=${x.id} class="quantity">${item}</div>
                        <i onclick="increment(${x.id})" class="fas -regular fa-plus"></i>

                    </div>
    <h3> $ ${item * search.price}</h3>
</div>
        </div>
            `
        }).join(''))
    }
    else {
        shoppingcart.innerHTML = ``
        label.innerHTML = `
  
    <h2>Cart is Empty</h2>
    <a  href="index.html"><button class="btn"> Back to Home</button></a>
 `
    }
}

generateCartItems()

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
    generateCartItems()
    update(selectedItem.id)
    localStorage.setItem("data", JSON.stringify(basket))

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
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) => {
    let search = basket.find((a) => a.id === id)
    document.getElementById(id).innerHTML = search.item
    calculation()
    totalAmount()
}
let removeItem = (id) => {
    let selectedItem = id
    basket = basket.filter((a) => a.id !== selectedItem.id)
    localStorage.setItem("data", JSON.stringify(basket))
    generateCartItems()
    totalAmount()
}
let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id } = x
            let search = shopItemsData.find((y) => y.id === id)
            return item * search.price
        })
            .reduce((x, y) => x + y, 0)

        label.innerHTML = `
            <h2> Total Bill: $ ${amount}</h2>
            `
    }

    else return
}
totalAmount()