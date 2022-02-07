import React from 'react'
import styles from './styles.scss';
import withConnect from 'utils/withConnect';
import { withRouter } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useForm } from "react-hook-form";


function SearchOptionBar() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <FormControl className={styles.container}>
            <FormControl className={styles.option} variant="outlined" >
                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value='category'
                    // onChange={handleChange}
                    label="Category"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Category 1</MenuItem>
                    <MenuItem value={2}>Category 2</MenuItem>
                    <MenuItem value={3}>Category 3</MenuItem>
                    <MenuItem value={5}>Category 4</MenuItem>
                    <MenuItem value={5}>Category 5</MenuItem>
                    <MenuItem value={6}>Category 6</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={styles.option} variant="outlined" >
                <InputLabel id="demo-simple-select-outlined-label">Price</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value='price'
                    // onChange={handleChange}
                    label="Price"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>1-100</MenuItem>
                    <MenuItem value={20}>101-200</MenuItem>
                    <MenuItem value={30}>201-300</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={styles.option} variant="outlined" >
                <InputLabel id="demo-simple-select-outlined-label">Points</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value='points'
                    displayEmpty

                    // onChange={handleChange}
                    label="Points"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>1-100</MenuItem>
                    <MenuItem value={20}>101-200</MenuItem>
                    <MenuItem value={30}>201-300</MenuItem>
                </Select>
            </FormControl>

        </FormControl>
    )
}
export default withConnect()(withRouter(SearchOptionBar));