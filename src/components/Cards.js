import Paper from '@material-ui/core/Paper';
import { increment } from '../actions';
import { useDispatch } from 'react-redux';

export default function Card(props) { // basic card component

    const item = props.item;
    const price = item.price;
    const name = item.name;
    const dispatch = useDispatch();

    return (

        <Paper variant={"outlined"} style={{ height: 120, }}>
            <div class="container">
                <div class="row">
                    <img src="https://icons.iconarchive.com/icons/archigraphs/oldies/512/Coffee-Cup-icon.png" width={33} height={33}></img>
                </div>
                <div class="row" style={{ color: "#1EA4CE", paddingTop: "0.2em" }}>
                    {price}
                </div>
                <div title={name} class="row" style={{ paddingTop: "0.2em", fontSize: "11px", height: "40px" }}>
                    {name.length < 40 ? name : name.substring(0, 40) + "..."}
                </div>
                <div class="row" style={{ marginTop: "10px" }}>
                    <button onClick={() => {
                        props.onChange({ name: name, price: price });
                        dispatch(increment(parseFloat(price)))
                    }}>
                        Add
                    </button>
                </div>
            </div>
        </Paper>

    )
}