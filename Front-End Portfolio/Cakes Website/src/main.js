let menu = document.querySelector('#men');
let navbar = document.querySelector('.navbar');
let nav = document.querySelectorAll('nav a')
//menu section for closing with responsive style for phones
menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

//nav section to put active for each one if it is clicked
nav.forEach(function(ele) {
  ele.onclick = function() {
    nav.forEach(function(ele) {
      ele.classList.remove('active');
    });
    this.classList.add('active');
  };
});
console.log(nav)

var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop: true,
  });


  var swiper = new Swiper(".slide-content2", {
    slidesPerView: 4,
    //centeredSlides: true,
    loop: true,
    centerSlide:'true',
    fade: 'true',
    grabCursor: 'true',
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
      clickable: true, 
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      400: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      638: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 0
      },
    },
  });
  

//Online Menu page
let shop = document.getElementById('shop');


let shopItemsData = [{
  id: '1',
  name: 'Strawberry Whipped Cream Cake',
  price: 40,
  img: "images/img-1.png"
}, 
{
id: '2',
name: 'Strawberry Kiwi Whipped Cream Cake',
price: 50,
img: "images/img-2.png"
}, 
{
  id: '3',
  name: 'Strawberry Peach Whipped Cream Cake',
  price: 50,
  img: "images/img-3.png"
}, 
{
  id: '4',
  name: 'Chocolate Ganache Cake',
  price: 40,
  img: "images/img-4.png"
},
{
  id: '5',
  name: 'Cheese Cake - Chocolate Chip',
  price: 30,
  img: "images/img-5.png"
},
{
  id: '6',
  name: 'Cheese Cake - Strawberry',
  price: 30,
  img: "images/img-6.png"
},
];

let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateShop = () => {
return (shop.innerHTML =  shopItemsData.map((x) => {
  let {id, name, price, img} = x;
  let search = basket.find((x) => x.id === id) || [];
  return `
  <div id=prod-${id} class="item">
      <img width="220" src="${img}" alt="Strawberry cake">
      <div class="details">
          <h3> ${name} </h3>
          <div class="price-quantity">
              <h2>$ ${price} </h2>
              <div class="buttons">
                  <i onclick="increment(${id})" class="bi bi-patch-plus"></i>
                  <div id=${id} class="quantity">
                  ${search.item === undefined? 0: search.item}
                  </div>
                  <i onclick="decrement(${id})" class="bi bi-patch-minus"></i>
              </div>
          </div>
      </div>
      </div>
  `
}).join(""))
};

generateShop();

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
  
  //console.log(basket);
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
 // console.log(basket);
  
  localStorage.setItem("data", JSON.stringify(basket));

};

//Update Function
let update = (id) => {
  let search = basket.find((x) => x.id === id)
  console.log(search.item);
  document.getElementById(id).innerHTML = search.item
  calculation();
};

//Calculation Function
let calculation =() => {
  let cartIcon = document.getElementById('cartAmount');
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  //console.log(basket.map((x) => x.item).reduce((x, y) => x + y, 0))

}

calculation();






