import Card from './Cards';
import Paper from '@material-ui/core/Paper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apply, remove } from '../actions';

export default function CardBoard(props) {

    const priceSortLower = (a, b) => { // sorting for first sort filter
        if (parseFloat(a.price) < parseFloat(b.price)) {
            return -1;
        }
        if (parseFloat(a.price) > parseFloat(b.price)) {
            return 1;
        }
        return 0;
    }

    const priceSortHigher = (a, b) => {
        if (parseFloat(a.price) < parseFloat(b.price)) {
            return 1;
        }
        if (parseFloat(a.price) > parseFloat(b.price)) {
            return -1;
        }
        return 0;
    }

    const dateSortLower = (a, b) => {
        if (parseFloat(a.added) < parseFloat(b.added)) {
            return 1;
        }
        if (parseFloat(a.added) > parseFloat(b.added)) {
            return -1;
        }
        return 0;
    }

    const dateSortHigher = (a, b) => {
        if (parseFloat(a.added) < parseFloat(b.added)) {
            return -1;
        }
        if (parseFloat(a.added) > parseFloat(b.added)) {
            return 1;
        }
        return 0;
    }



    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const itemList = props.itemList.items; // items passed from main component
    const productList = props.productList; // product list to filter the products
    let remainingItems = itemList.length;
    let pages = parseInt(remainingItems / 16 + ""); // page count

    let render = [];
    let cards = [];
    const filters = useSelector(state => state.filters); // redux filter state

    if (filters == "" || filters == null || filters == undefined)
        for (let i = 0; i < itemList.length; i++) { // create all the cards
            cards.push(<Card
                item={itemList[i]}
                onChange={props.onChange}
            />)
        }
    else {
        let sortingType = filters.split("^"); // decide which sorting filter is currently applied
        let filteredItemList = [...itemList];
        if (sortingType.length > 1) {
            const type = sortingType[sortingType.length - 2];
            switch (type) {
                case "1":
                    filteredItemList.sort(priceSortLower);
                    break;
                case "2":
                    filteredItemList.sort(priceSortHigher);
                    break;
                case "3":
                    filteredItemList.sort(dateSortLower);
                    break;
                case "4":
                    filteredItemList.sort(dateSortHigher);
                    break;
                default:
                    break;
            }
        }


        let brands = (filters.split("~")); // decide which brand filters are applied
        for (let i = 0; i < brands.length; i++) {
            if (brands[i] == "" || brands[i].includes("/") || brands[i].includes("#") || brands[i].includes("^")) {
                brands.splice(i, 1);
            }
        }
        let tags = (filters.split("/")); // decide which tag filters are applied
        for (let i = 0; i < tags.length; i++) {
            if (tags[i] == "" || tags[i].includes("~") || tags[i].includes("#") || tags[i].includes("^")) {
                tags.splice(i, 1);
            }
        }
        let types = (filters.split("#")); // decide which type filters are applied
        for (let i = 0; i < types.length; i++) {
            if (types[i] == "" || types[i].includes("/") || types[i].includes("~") || types[i].includes("^")) {
                types.splice(i, 1);
            }
        }
        for (let i = 0; i < filteredItemList.length; i++) {
            let add1 = false;
            let add2 = false;
            let add3 = false;
            if (tags.length > 0) {
                for (let j = 0; j < tags.length; j++) {
                    if (filteredItemList[i].tags.includes(tags[j])) {
                        add1 = true; // if the current item includes any tag in the filter
                        break;
                    }
                }
            }
            else {
                add1 = true;
            }
            if (brands.length > 0) {
                if (brands.includes(filteredItemList[i].manufacturer))
                    add2 = true; // if the current item's manufacturer is filtered
            }
            else {
                add2 = true;
            }
            if (types.length > 0) {
                if (types.includes(filteredItemList[i].itemType))
                    add3 = true;   // if the current item's type is filtered 
            }
            else {
                add3 = true;
            }
            if (add1 && add2 && add3) { // if the item meets the filters
                cards.push(<Card
                    item={filteredItemList[i]}
                    onChange={props.onChange}
                />)
            }
            pages = parseInt(cards.length / 16 + "");

        }
    }
    if (page > pages) { // when the filter is changed, page count might drop, so if we are beyond the maximum page, we set page back to 0
        setPage(0)
    }
    for (let i = page * 16; i < cards.length && i < page * 16 + 16; i = i + 4) { // 16 pagination
        if (remainingItems == 1) {
            render.push(
                <div class="container" style={{ paddingTop: "1em", paddingBottom: "1em" }}>
                    <div class="row">
                        <div class="col">
                            {cards[i]}
                        </div>
                    </div>
                </div>
            )
        }
        else if (remainingItems == 2) {
            render.push(
                <div class="container" style={{ paddingTop: "1em", paddingBottom: "1em" }}>
                    <div class="row">
                        <div class="col">
                            {cards[i]}
                        </div>
                        <div class="col">
                            {cards[i + 1]}
                        </div>
                    </div>
                </div>
            )
        }
        else if (remainingItems == 3) {
            render.push(
                <div class="container" style={{ paddingTop: "1em", paddingBottom: "1em" }}>
                    <div class="row">
                        <div class="col">
                            {cards[i]}
                        </div>
                        <div class="col">
                            {cards[i + 1]}
                        </div>
                        <div class="col">
                            {cards[i + 2]}
                        </div>
                    </div>
                </div>

            )
        }
        else {
            render.push(
                <div class="container" style={{ paddingTop: "1em", paddingBottom: "1em" }}>
                    <div class="row">
                        <div class="col">
                            {cards[i]}
                        </div>
                        <div class="col">
                            {cards[i + 1]}
                        </div>
                        <div class="col">
                            {cards[i + 2]}
                        </div>
                        <div class="col">
                            {cards[i + 3]}
                        </div>
                    </div>
                </div>

            )
        }
        remainingItems--;

    }

    let pageRender = [];
    const prev = "<- Prev"
    const next = "Next ->"
    let cols = [];
    for (let i = 0; i < pages + 1; i++) { // page navigation creator
        if (pages < 10) {
            cols.push(<div class="col" style={page == i ? { fontWeight: "bold", cursor: "pointer" } : { cursor: "pointer" }} onClick={() => { setPage(i) }}>
                {i + 1}
            </div>)
        }
        else {
            if (page < 3) {
                if (i < 3 || i > pages - 2) {
                    cols.push(<div class="col" style={page == i ? { fontWeight: "bold", cursor: "pointer" } : { cursor: "pointer" }} onClick={() => { setPage(i) }}>
                        {i + 1}
                    </div>)
                }
                else if (i === 3) {
                    cols.push(<div class="col" style={page == i ? { fontWeight: "bold", cursor: "pointer" } : { cursor: "pointer" }} onClick={() => { setPage(i) }}>
                        ...
                    </div>)
                }
            }
            else {
                if (i < 2 || i > pages - 2) {
                    cols.push(<div class="col" style={page == i ? { fontWeight: "bold", cursor: "pointer" } : { cursor: "pointer" }} onClick={() => { setPage(i) }}>
                        {i + 1}
                    </div>)
                }
                else if (i === page) {
                    cols.push(<div class="col" style={page == i ? { fontWeight: "bold", cursor: "pointer" } : { cursor: "pointer" }} onClick={() => { setPage(i) }}>
                        {page + 1}
                    </div>)
                }
                else if (i === page + 1) {
                    cols.push(<div class="col" style={page == i ? { fontWeight: "bold", cursor: "pointer" } : { cursor: "pointer" }} onClick={() => { setPage(i) }}>
                        ...
                    </div>)
                }
                else if (i === 2) {
                    cols.push(<div class="col" style={page == i ? { fontWeight: "bold", cursor: "pointer" } : { cursor: "pointer" }} onClick={() => { setPage(i) }}>
                        ...
                    </div>)
                }
            }
        }
    }

    pageRender.push(
        <div class="container">
            <div class="row">
                <div class="col" style={{ cursor: "pointer" }} onClick={() => { if (page > 0) setPage(page - 1) }}>
                    {prev}
                </div>
                {cols}
                <div class="col" style={{ cursor: "pointer" }} onClick={() => { if (page < pages) setPage(page + 1) }}>
                    {next}
                </div>
            </div>
        </div>
    )


    let productFilter = [];

    for (let i = 0; i < productList.length; i++) { // product list creator
        productFilter.push(
            <button id={"button" + productList[i]} style={{ margin: "5px" }} onClick={
                () => {
                    if (document.getElementById("button" + productList[i]).style.backgroundColor === "rgb(30, 164, 206)") {
                        document.getElementById("button" + productList[i]).style.backgroundColor = "#FFFFFF";
                        const filter = "#" + productList[i] + "#";
                        dispatch(remove({ filter: filter }));
                    }
                    else {
                        document.getElementById("button" + productList[i]).style.backgroundColor = "#1EA4CE";
                        const filter = "#" + productList[i] + "#";
                        dispatch(apply({ filter: filter }));
                    }

                }
            }>{productList[i]}</button>

        )
    }




    return (

        <div className="sorting">
            Products
            <div>{productFilter}</div>
            <div style={{ paddingTop: "1em" }}>
                <Paper style={{ height: 630, overflow: "auto", width: 530 }}>
                    {render}
                </Paper>
            </div>
            <div style={{ textAlign: "center", paddingTop: "1em", color: "#1EA4CE" }}>
                {pageRender}
            </div>
        </div>

    )

}
