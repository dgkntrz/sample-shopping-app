import 'bootstrap/dist/css/bootstrap.css';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { apply, remove } from '../actions';

function Sorting() { // sorting filter component

    const dispatch = useDispatch();

    const [checkbox1, setcheckbox1] = useState(false);
    const [checkbox2, setcheckbox2] = useState(false);
    const [checkbox3, setcheckbox3] = useState(false);
    const [checkbox4, setcheckbox4] = useState(false);

    const checkbox_changed_1 = (e) => { // first checkbox
        if (!checkbox1) {
            dispatch(apply({ filter: "^1^" }));
        }
        else {
            dispatch(remove({ filter: "^1^" }));
        }
        setcheckbox1(!checkbox1);
        setcheckbox2(false);
        setcheckbox3(false);
        setcheckbox4(false);
    }

    const checkbox_changed_2 = (e) => { // second checkbox
        if (!checkbox2) {
            dispatch(apply({ filter: "^2^" }));
        }
        else {
            dispatch(remove({ filter: "^2^" }));
        }
        setcheckbox1(false);
        setcheckbox2(!checkbox2);
        setcheckbox3(false);
        setcheckbox4(false);
    }

    const checkbox_changed_3 = (e) => { // third checkbox
        if (!checkbox3) {
            dispatch(apply({ filter: "^3^" }));
        }
        else {
            dispatch(remove({ filter: "^3^" }));
        }
        setcheckbox1(false);
        setcheckbox2(false);
        setcheckbox3(!checkbox3);
        setcheckbox4(false);
    }

    const checkbox_changed_4 = (e) => { // fourth checkbox
        if (!checkbox4) {
            dispatch(apply({ filter: "^4^" }));
        }
        else {
            dispatch(remove({ filter: "^4^" }));
        }
        setcheckbox1(false);
        setcheckbox2(false);
        setcheckbox3(false);
        setcheckbox4(!checkbox4);

    }

    return (

        <div className="sorting">
            Sorting
            <div style={{ paddingTop: "1em" }}>
                <Paper style={{ maxHeight: 200, overflow: "auto", minHeight: 200 }}>
                    <FormGroup style={{ paddingLeft: "2em", paddingTop: "1em", paddingBottom: "1em" }}>
                        <FormControlLabel
                            control={<Checkbox checked={checkbox1} name="lth" color="primary" onClick={checkbox_changed_1} />}
                            label="Price low to high"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={checkbox2} name="htl" color="primary" onClick={checkbox_changed_2} />}
                            label="Price high to low"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={checkbox3} name="nto" color="primary" onClick={checkbox_changed_3} />}
                            label="New to old"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={checkbox4} name="otn" color="primary" onClick={checkbox_changed_4} />}
                            label="Old to new"
                        />
                    </FormGroup>
                </Paper>
            </div>
        </div>
    )
}



export default Sorting;