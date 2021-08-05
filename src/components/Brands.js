import 'bootstrap/dist/css/bootstrap.css';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { apply, remove } from '../actions';

function Brands(props) {
    const [brand, setBrand] = useState("");
    const dispatch = useDispatch();
    const brandList = props.brandList;
    const brandCount = props.brandCount;
    let render = []; // this array will be filled with divs and will be dynamically rendered

    for (let i = 0; i < brandList.length; i++) {
        render.push(<FormControlLabel hidden={!brandList[i].includes(brand)} // for each brand passed from props, create a line with selectbox and name
            control={<Checkbox color="primary" onChange={(e) => { brandFilterChanged(e.target.checked, i) }} />}
            label={brandList[i] + " (" + brandCount[i] + ")"}
        />);
    }

    const brandSearchChanged = (e) => {
        setBrand(e.target.value); // when a brand name is searched, we want to set visibility of other brands to false (19th line, hidden prop)
    }

    const brandFilterChanged = (checked, index) => { // when clicked to select box, then the filter will be applied
        const filter = "~" + brandList[index] + "~"; // ~ in redux state indicates that between two ~ there is a brand filter applied
        if (checked) {
            dispatch(apply({ filter: filter }));
        }
        else {
            dispatch(remove({ filter: filter }));
        }
    }

    return (

        <div className="sorting" style={{ paddingTop: "1em" }}>
            Brands
            <div style={{ paddingTop: "1em" }}>
                <Paper style={{ maxHeight: 200, overflow: "auto", minHeight: 200 }}>
                    <div class="container">
                        <TextField id="standard-basic" label="Search brand" onChange={brandSearchChanged} />
                    </div>
                    <FormGroup style={{ paddingLeft: "2em", paddingTop: "1em", paddingBottom: "1em" }}>
                        {render}
                    </FormGroup>
                </Paper>
            </div>
        </div>
    )
}



export default Brands;