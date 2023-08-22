let products;
const images = document.getElementById("images");

fetch("../json/productos.json")
  .then((res) =>
    res
      .json()
      .then((data) => {
        products = data.productos;
        products.map((product) => {
          const item = document.createElement("img");
          item.setAttribute("src", product.url);
          item.classList.add("image");
          item.addEventListener("click", () => addToCart(product.id));

          images.appendChild(item);
        });
      })
      .catch((e) => console.log(e))
  )
  .catch((e) => console.log(e));

//funcion para agregar producto al carrito
function addToCart(productId) {
  try {
    const selectedProduct = products.find(
      (product) => product.id === productId
    );
    let cart = JSON.parse(localStorage.getItem("cart")) ?? [];
    if (selectedProduct) {
      const filteredArr = cart.filter(
        (product) => product.id === selectedProduct.id
      );
      if (filteredArr.length > 0) {
        Toastify({
          text: "Producto ya se encuentra en el carrito",
          duration: 1000,
          style: {
            background: "#cf3232",
          },
        }).showToast();
      } else {
        cart.push(selectedProduct);
        localStorage.setItem("cart", JSON.stringify(cart));
        Toastify({
          text: "Producto agregado al Carrito",
          duration: 1000,
          style: {
            background: "#5c80bc",
          },
        }).showToast();
      }
    }
  } catch (error) {
    console.log(error);
  }
}
