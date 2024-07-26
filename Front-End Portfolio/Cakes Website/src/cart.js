let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');


let basket = JSON.parse(localStorage.getItem("data")) || [];

//Calculation Function
let calculation =() => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
    //console.log(basket.map((x) => x.item).reduce((x, y) => x + y, 0))
  
  }
  
  calculation();

let generateCartItems = () => {
    if(basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x;
            let search = shopItemsData.find((y) => y.id == id) || [];
            let {img, name, price} = search;
            return `
            <div class="cart-item">
            <img width="100" src=${img} alt="">
            <div class="details">
            <div class="title-price-x">
            <h4 class="title-price">
            <p class="name">${name}</p>
            <p class="cart-item-price">$ ${price}</p>
            </h4>
            <i class="bi bi-x-circle" onclick="removeItem(${id})"></i>
            </div>

            <div class="buttons">
                  <i onclick="increment(${id})" class="bi bi-patch-plus"></i>
                  <div id=${id} class="quantity">${item}</div>
                  <i onclick="decrement(${id})" class="bi bi-patch-minus"></i>
              </div>

            <h3>${item * search.price}</h3>
    </div>
            </div>
            `
        }).join(''))
    }
    else {
       shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="menu.html">
          <button class="HomeBtn">Back to Menu</button>
        </a>
       `
    }
}

generateCartItems();


//Increment Function
let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
  
    if (search === undefined) {
      basket.push({
        id: selectedItem,
        item: 1,
      });
    } else {
      search.item += 1;
    }
    
    generateCartItems();
    update(selectedItem);
    localStorage.setItem("data", JSON.stringify(basket));
  
};

//Decrement Function
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
  
    if(search === undefined) return;
  
    else if (search.item === 0) {
      return;
    } else {
      search.item -= 1;
    }
    update(selectedItem);
    basket = basket.filter((x) => x.item !== 0)
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
  
};

//Update Function
let update = (id) => {
    let search = basket.find((x) => x.id === id)
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item
    calculation();
    TotalAmound();
};


//Remove Item
let removeItem = (id) => {
let selectedItem = id;
basket = basket.filter((x) => x.id !== selectedItem);
generateCartItems();
TotalAmound();
calculation();
localStorage.setItem("data", JSON.stringify(basket));
};

//Total Function
let TotalAmound = () => {
    if(basket.length !== 0) {
        let amount = basket.map((x) => {
            let {item, id} = x;
            let search = shopItemsData.find((y) => y.id == id) || [];
            return item * search.price;

        }).reduce((x, y) => x + y, 0 )
        //console.log(amount)
        label.innerHTML = `
        <h2>Total: $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button class="removeAll" onclick="clearCard()">Clear Card</button>
        `
    }
    else {
        return;
    }
}
TotalAmound();

//Clearing the card
let clearCard = () => {
basket = [];
generateCartItems();
calculation();
localStorage.setItem("data", JSON.stringify(basket));

};