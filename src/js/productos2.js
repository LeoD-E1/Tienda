let productCount = 0;
function addProduct(){
  let product = document.createElement("div");
  if(productCount % 3 == 0){
    product.setAttribute("class", "productos2");
  }else{
    product.setAttribute("class", "productos");
  }
  product.innerHTML = productCount + 1;
  productCount++;
  document.getElementById('container').appendChild(product);
}
