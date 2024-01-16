
import Link from 'next/link'

const Selector = ( {product} ) => {
    if (product.clothing_size_id == 1) {
        return (
            <div>
                <label>Please Select a Size:</label>
                <select >
                    <option value="XS">X-Small</option>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                    <option value="XL">X-Large</option>
                    <option value="2XL">2X-Large</option>
                </select>
                <br></br>
            </div>
            
        )
    }
    else {
        return (
            <br></br>
        )
    }
}
// need to style
const ProductDetails = ( {product, category} ) => {
    function increase() {
        const qtyField = document.getElementById('qtyinput');
        let num = qtyField.value;
        num++;
        qtyField.value = num;
     }
  
     function decrease() {
        const qtyField = document.getElementById('qtyinput');
        let num = qtyField.value;
        num--;
        if (num < 0) {
          num = 0;
        }
        qtyField.value = num;
     }
     console.log(product.quantity_left);
  return (
    <div>
        {/*when image table is done call it to get it working */}
        <h2>img</h2>
        <h2>Product Name: {product.product_name}</h2>
        <h2>Category: {category.category}</h2>
        {/* will be what is under this but need to make column first*/}
        <h2>{product.in_stock}</h2>
        <form>
            <Selector product= {product} />
            <label>Qty: </label>
            <input type='button' value='-' id='qtyminus'onClick={decrease} />
            <input type='text' name='quantity' class='rounded-sm' value='0' id='qtyinput' />
            <input type='button' value='+' id= 'qtyplus' onClick={increase}/>
        </form>
    </div>
    
  )
}

export default ProductDetails
