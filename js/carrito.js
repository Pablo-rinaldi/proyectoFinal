const carrito = document.getElementById("cart");
const clear = document.getElementById("clear");
const confirm = document.getElementById("confirm");

function clearCart() {
  localStorage.clear();
  location.reload();
}

function addConfirmMsg() {
  const confirmMsg = document.createElement("p");
  confirmMsg.classList.add("cart-checkout");
  confirmMsg.append("Gracias por tu compra el total es de: $" + getTotal());
  carrito.appendChild(confirmMsg);
  localStorage.clear();
  confirm.setAttribute("disabled", true);
}

function getTotal() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart.reduce((acc, product) => (acc += product.precio), 0);
}

function deleteItem(selectedProduct) {
  console.log("acaa");
  const localStorageCart = JSON.parse(localStorage.getItem("cart"));

  const filteredArray = localStorageCart.filter(
    (product) => product.id != selectedProduct.id
  );

  localStorage.setItem("cart", JSON.stringify(filteredArray));

  location.reload();
}

function showCart() {
  const localStorageCart = localStorage.getItem("cart");
  if (localStorageCart && JSON.parse(localStorageCart).length > 0) {
    const cart = JSON.parse(localStorageCart);

    cart.map((product) => {
      const itemImg = document.createElement("img");
      itemImg.setAttribute("src", product.url);
      itemImg.classList.add("product-img");

      const itemText = document.createElement("p");
      itemText.classList.add("cart-text");
      itemText.append(
        `Marca: ${product.marca}.Color: ${product.color}.    Precio: $${product.precio} `
      );

      const itemBin = document.createElement("i");
      itemBin.classList.add("fa-solid", "fa-trash", "fa-sm", "bin");
      itemBin.setAttribute("id", product.id);

      itemBin.addEventListener("click", (event) => {
        const productId = event.target.getAttribute("id");
        const localStorageCart = JSON.parse(localStorage.getItem("cart"));

        const filteredArray = localStorageCart.filter(
          (product) => product.id != productId
        );

        localStorage.setItem("cart", JSON.stringify(filteredArray));

        location.reload();
      });

      const productDiv = document.createElement("div");
      productDiv.classList.add("cart-item");
      productDiv.appendChild(itemImg);
      productDiv.appendChild(itemText);
      productDiv.appendChild(itemBin);

      carrito.appendChild(productDiv);
    });
  } else {
    const emptyCartMsg = document.createElement("p");
    emptyCartMsg.classList.add("cart-checkout");
    emptyCartMsg.append("El carrito esta vacio!! Agregalos desde Productos!");
    carrito.appendChild(emptyCartMsg);
    confirm.setAttribute("disabled", true);
  }
}

clear.addEventListener("click", clearCart);
confirm.addEventListener("click", addConfirmMsg);

showCart();
