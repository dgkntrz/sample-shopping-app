import { useSelector } from 'react-redux';
import './Header.css';

function ShoppingCart() {
    const price = useSelector(state => state.price);
    var formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'TRY' }); // cart component in the header

    return (
        <div class="container">
            <div class="row">
                <button className="cartbutton">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <img src="https://icons.iconarchive.com/icons/fasticon/shop-cart/512/shop-cart-icon.png" width="60" height="60"></img>
                            </div>
                            <div class="col" style={{ fontSize: "12px", paddingTop: "0.7em", textAlign: "center" }}>
                                {formatter.format(price)}
                            </div>
                        </div>
                    </div>

                </button>

            </div>


        </div>
    )
}

export default ShoppingCart;