import 'bootstrap/dist/css/bootstrap.css';
import './home.css';

import { useState } from 'react';
import Sorting from '../components/Sorting';
import Brands from '../components/Brands';
import Tags from '../components/Tags';
import Cart from '../components/Cart';
import CardBoard from '../components/CardBoard';
import { useSelector } from 'react-redux';
import items from '../items';
import { reset } from '../actions';
import { useDispatch } from 'react-redux';

function Home() { // main body of the screen
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState("");
    const filters = useSelector(state => state.filters);
    const [priority, setPriority] = useState(-1); // priority is used to determine which filter is applied first

    const handleChange = (e) => { // when an item is added to cart, this state is updated
        setCartItems(cartItems + "[" + e.name + "," + e.price + "]")
    }

    const handleDecrement = (e) => { // when an item is deduced from cart, this function is called
        let ci = cartItems;
        var n = ci.lastIndexOf("[" + e.name + "," + e.price + "]");
        ci = ci.slice(0, n) + ci.slice(n).replace("[" + e.name + "," + e.price + "]", "")

        // ci = ci.replace("["+e.name+","+e.price+"]","");
        setCartItems(ci);
    }

    let brandList = [];
    let brandCount = [];
    let tagList = [];
    let tagCount = [];

    if (priority == 2 && !filters.includes("~")) { // priority = 2 means brand filter is applied first
        setPriority(-1);
        dispatch(reset());
    }
    if (priority == 1 && !filters.includes("/")) { // priority = 1 means tag filter is applied first
        setPriority(-1);
        dispatch(reset());
    }

    if (filters == "" || filters == null || filters == undefined) { // if there are no filters on global state
        if (priority != -1) // if there was before, set priority to -1 to define that there are no more filters
            setPriority(-1);
        for (let i = 0; i < items.items.length; i++) { // add all the brands to the list
            if (brandList.includes(items.items[i].manufacturer)) {
                brandCount[brandList.indexOf(items.items[i].manufacturer)] += 1;
            }
            else {
                brandList.push(items.items[i].manufacturer);
                brandCount.push(1);
            }
        }
        for (let i = 0; i < items.items.length; i++) { // add all the tags to the list
            for (let j = 0; j < items.items[i].tags.length; j++) {
                if (tagList.includes(items.items[i].tags[j])) {
                    tagCount[tagList.indexOf(items.items[i].tags[j])] += 1;
                }
                else {
                    tagList.push(items.items[i].tags[j]);
                    tagCount.push(1);
                }
            }

        }
    }
    else { // if there are filters
        let brands = (filters.split("~")); // brands
        for (let i = 0; i < brands.length; i++) {
            if (brands[i] == "" || brands[i].includes("/") || brands[i].includes("#") || brands[i].includes("^")) {
                brands.splice(i, 1);
            }
        }
        let tags = (filters.split("/")); // tags
        for (let i = 0; i < tags.length; i++) {
            if (tags[i] == "" || tags[i].includes("~") || tags[i].includes("#") || tags[i].includes("^")) {
                tags.splice(i, 1);
            }
        }
        if (filters.indexOf("~") == filters.indexOf("/")) { // decide which filter is applied first
            setPriority(0);
        }
        else if (filters.indexOf("~") < filters.indexOf("/") && priority == -1) {
            setPriority(1);
        }
        else if (filters.indexOf("~") > filters.indexOf("/") && priority == -1) {
            setPriority(2);
        }
        if (priority == 0) { // if there is no brand or tag filter
            for (let i = 0; i < items.items.length; i++) {
                if (brandList.includes(items.items[i].manufacturer)) {
                    brandCount[brandList.indexOf(items.items[i].manufacturer)] += 1;
                }
                else {
                    brandList.push(items.items[i].manufacturer);
                    brandCount.push(1);
                }
            }
            for (let i = 0; i < items.items.length; i++) {
                for (let j = 0; j < items.items[i].tags.length; j++) {
                    if (tagList.includes(items.items[i].tags[j])) {
                        tagCount[tagList.indexOf(items.items[i].tags[j])] += 1;
                    }
                    else {
                        tagList.push(items.items[i].tags[j]);
                        tagCount.push(1);
                    }
                }

            }
        }
        else if (priority == 1) { // if tag filter is applied first
            for (let i = 0; i < items.items.length; i++) {
                for (let j = 0; j < tags.length; j++) {
                    if (brandList.includes(items.items[i].manufacturer) && items.items[i].tags.includes(tags[j])) { // while adding brand, check if the item has the required tags
                        brandCount[brandList.indexOf(items.items[i].manufacturer)] += 1;
                        break;
                    }
                    else if (items.items[i].tags.includes(tags[j])) {
                        brandList.push(items.items[i].manufacturer);
                        brandCount.push(1);
                        break;
                    }
                }

            }
            for (let i = 0; i < items.items.length; i++) {
                for (let j = 0; j < items.items[i].tags.length; j++) {
                    if (tagList.includes(items.items[i].tags[j])) {
                        tagCount[tagList.indexOf(items.items[i].tags[j])] += 1;
                    }
                    else {
                        tagList.push(items.items[i].tags[j]);
                        tagCount.push(1);
                    }
                }

            }
        }
        else if (priority == 2) { // if brand filter is applied first
            for (let i = 0; i < items.items.length; i++) {
                if (brandList.includes(items.items[i].manufacturer)) {
                    brandCount[brandList.indexOf(items.items[i].manufacturer)] += 1;
                }
                else {
                    brandList.push(items.items[i].manufacturer);
                    brandCount.push(1);
                }
            }
            for (let i = 0; i < items.items.length; i++) {
                for (let j = 0; j < items.items[i].tags.length; j++) {
                    if (tagList.includes(items.items[i].tags[j]) && brands.includes(items.items[i].manufacturer)) { // when adding tag, check if item is produced by the right brand
                        tagCount[tagList.indexOf(items.items[i].tags[j])] += 1;
                    }
                    else if (brands.includes(items.items[i].manufacturer)) {
                        tagList.push(items.items[i].tags[j]);
                        tagCount.push(1);
                    }
                }

            }
        }

    }


    let productList = [];

    for (let i = 0; i < items.items.length; i++) { // product types to pass to children
        if (!productList.includes(items.items[i].itemType)) {
            productList.push(items.items[i].itemType);
        }
    }

    return (
        <div class="container" style={{ paddingTop: "2em" }}>
            <div class="row">
                <div class="col-sm-3">
                    <div class="container">
                        <div class="row">
                            <Sorting />
                            <Brands
                                brandList={brandList}
                                brandCount={brandCount}
                            />
                            <Tags
                                tagList={tagList}
                                tagCount={tagCount}
                            />
                        </div>
                    </div>
                </div>
                <div class="col-sm-5">
                    <CardBoard
                        onChange={handleChange}
                        itemList={items}
                        productList={productList}
                    />
                </div>
                <div class="col-sm-4">
                    <Cart
                        cartList={cartItems}
                        cartCount={[1, 1]}
                        onChange={handleChange}
                        onDecrement={handleDecrement}
                    />
                </div>
            </div>
        </div>
    )
}



export default Home;