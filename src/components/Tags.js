import 'bootstrap/dist/css/bootstrap.css';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { apply, remove } from '../actions';

function Tags(props) { // tag filter component
    const [tag, setTag] = useState("");
    const dispatch = useDispatch();
    const tagList = props.tagList;
    const tagCount = props.tagCount;
    let render = [];

    for (let i = 0; i < tagList.length; i++) {
        render.push(<FormControlLabel hidden={!tagList[i].includes(tag)}
            control={<Checkbox color="primary" onChange={(e) => { tagFilterChanged(e.target.checked, i) }} />}
            label={tagList[i] + " (" + tagCount[i] + ")"}
        />);
    }

    const tagSearchChanged = (e) => {
        setTag(e.target.value);

    }

    const tagFilterChanged = (checked, index) => {
        const filter = "/" + tagList[index] + "/";
        if (checked) {
            dispatch(apply({ filter: filter }));
        }
        else {
            dispatch(remove({ filter: filter }));
        }
    }

    return (

        <div className="sorting" style={{ paddingTop: "1em" }}>
            Tags
            <div style={{ paddingTop: "1em" }}>
                <Paper style={{ maxHeight: 200, overflow: "auto", minHeight: 200 }}>
                    <div class="container">
                        <TextField id="standard-basic" label="Search tag" onChange={tagSearchChanged} />
                    </div>
                    <FormGroup style={{ paddingLeft: "2em", paddingTop: "1em", paddingBottom: "1em" }}>
                        {render}
                    </FormGroup>
                </Paper>
            </div>
        </div>
    )
}



export default Tags;