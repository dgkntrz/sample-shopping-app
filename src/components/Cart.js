import 'bootstrap/dist/css/bootstrap.css';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useSelector } from 'react-redux';
import './Cart.css';
import AddRemove from './AddRemove';



function Cart(props) {
    const totalprice = useSelector(state => state.price);
    let cartArray = [];
    let nameList = [];
    var formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'TRY' }); // formatter to format total price into TRY money format

    if (props.cartList != undefined && props.cartList != null && props.cartList != "") {
        let objstr = props.cartList;
        while (objstr != "") { // cartlist is passed from parent component and we retrieve which items are passed
            try {
                const between = objstr.substring(objstr.indexOf("[") + 1, objstr.indexOf("]"));
                const name = between.split(",")[0];
                const price = between.split(",")[1];
                objstr = objstr.substring(objstr.indexOf("]") + 1);
                if (nameList.includes(name)) {
                    for (let i = 0; i < cartArray.length; i++) {
                        if (cartArray[i].name === name) {
                            cartArray[i].count = cartArray[i].count + 1;
                            break;
                        }
                    }
                }
                else {
                    nameList.push(name);
                    cartArray.push({ name: name, price: price, count: 1 });
                }



            }
            catch {
                break;
            }
        }
    }
    const cartList = cartArray;

    let render = [];

    const handleChange = e => {
        cartList.splice(e,1);
    }


    // there have been problems with incrementing the count of an element in the cart 
    // since there are two ways, one is by pressing + and the other one is by pressing "Add" button
    // I had to add controls to merge their count together
    const handleChangeDecrement = e => {

        for (let i = 0; i < cartArray.length; i++) {
            if (cartArray[i].name === e) {
                props.onDecrement(cartArray[i]);
                break;
            }
        }

    }

    const handleChangeIncrement = e => {
        for (let i = 0; i < cartArray.length; i++) {
            if (cartArray[i].name === e) {
                props.onChange(cartArray[i]);
                break;
            }
        }
    }

    for (let i = 0; i < cartList.length; i++) { // create cart elements
        render.push(<FormControlLabel id={"fcl" + i}
            control={
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <div class="row">
                                {cartList[i].name}
                            </div>
                            <div class="row">
                                ₺ {cartList[i].price}
                            </div>
                        </div>
                        <div class="col">
                            <AddRemove
                                count={cartList[i].count}
                                price={cartList[i].price}
                                onChange={handleChange}
                                decremented={handleChangeDecrement}
                                incremented={handleChangeIncrement}
                                name={cartList[i].name}
                                index={i}
                            />
                        </div>
                    </div>


                </div>
            }

        />);
    }

    return (

        <div className="sorting" style={{ paddingTop: "1em" }} hidden={totalprice < 0.1}>
            <div style={{ paddingTop: "1em" }}>
                <Paper style={{ maxHeight: 270, overflow: "auto" }} variant={"outlined"}>
                    <FormGroup id="parent-form" style={{ paddingLeft: "1em", paddingTop: "1em", paddingBottom: "1em" }}>
                        {render}
                    </FormGroup>
                    <div style={{ float: "right", paddingBottom: "0.5em", paddingRight: "0.5em" }} >
                        <button>{formatter.format(totalprice)}</button>
                    </div>
                </Paper>
            </div>
        </div>
    )
}



export default Cart;