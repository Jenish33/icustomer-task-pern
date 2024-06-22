// components/ModernTable.js
import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment,
  Select, MenuItem, FormControl, InputLabel, Box, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getToken, isLoggedIn } from '../../services/auth';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Toaster, toast } from 'react-hot-toast';

const ProductTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const router = useRouter()

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterCategory ? item.data_category === filterCategory : true) &&
      item.record_count >= filterRecordCount[0] &&
      item.record_count <= filterRecordCount[1]
    );
  });


  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/login');
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:8000/products', {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        if (response.status === 200) {
          setData(response.data);
          console.log(response);
        }
      } catch (error) {
        toast.error('Failed to fetch products:');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  return (
    <div className='min-h-[100vh]'>
    {loading && <CircularProgress/> }
    <h1 className='text-2xl mb-5'>B2B DataCatalog</h1>
    <Box sx={{ padding: 2 }}>
      <TextField
        label="Search by Name"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
        sx={{ marginBottom: 2, marginRight: 3 }}
      />
      <FormControl variant="outlined" sx={{ minWidth: 200, marginRight: 2 }}>
        <InputLabel>Filter by Category</InputLabel>
        <Select
          value={filterCategory}
          onChange={handleCategoryChange}
          label="Filter by Category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Firmographic">Firmographic</MenuItem>
          <MenuItem value="Demographic">Demographic</MenuItem>
        </Select>
      </FormControl>
      
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Data Category</TableCell>
              <TableCell>Fields</TableCell>
              <TableCell>Record Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.data_category}</TableCell>
                <TableCell>{row.fields.join(', ')}</TableCell>
                <TableCell>{row.record_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  );
};

export default ProductTable;
