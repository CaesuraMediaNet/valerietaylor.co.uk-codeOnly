
// https://mui.com/material-ui/react-select/
//
import { useState }  from 'react';
import InputLabel    from '@mui/material/InputLabel';
import MenuItem      from '@mui/material/MenuItem';
import FormControl   from '@mui/material/FormControl';
import Select        from '@mui/material/Select';

export default function SelectQuantity ({id, updateQuantity, initialQuantity}) {
   const [quantity, setQuantity] = useState(initialQuantity);
   const handleChange = (event) => {
      setQuantity(event.target.value);
      updateQuantity(id, event.target.value);
   }
   return (
      <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={quantity}
            label="Quantity"
            onChange={handleChange}
         >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
         </Select>
      </FormControl>
   );

}
