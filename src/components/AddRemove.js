import { useState } from 'react';
import { increment, decrement } from '../actions';
import { useDispatch } from 'react-redux';

export default function AddRemove(props) {
    const [count, setcount] = useState(props.count); // total count of current object in cart
    const [prevcount, setprevcount] = useState(0); // set to props.count if its not already, to distinct between 
    if (prevcount != props.count) {                 // if the new count is added by the + button, or if it is added by the add button in cardboard 
        setprevcount(props.count);
        setcount(props.count)
    }

    const price = props.price;
    const dispatch = useDispatch();

    return (
        <div class="row">
            <div class="col">
                <button class="button" onClick={() => { // - button
                    dispatch(decrement(parseFloat(price)));
                    if (count == 1) {
                        props.onChange(props.index); // if it is clicked while the count is 1, the line will be deleted
                        return;
                    }
                    props.decremented(props.name);
                    setcount(count - 1);
                }}>-</button>
            </div>
            <div class="col" style={{ textAlign: "center" }}>
                {count}
            </div>
            <div class="col">
                <button class="button" onClick={() => {
                    if (count < 99) { // + button
                        setcount(count + 1);
                        props.incremented(props.name);
                        dispatch(increment(parseFloat(price)));
                    }

                }}>+</button>
            </div>
        </div>
    )
}