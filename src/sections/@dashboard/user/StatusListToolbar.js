import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, FormControl, Box, InputLabel, Select, MenuItem } from '@mui/material';
// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 1300,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 1300,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

StatusListToolbar.propTypes = {
  numSelected: PropTypes.number,
  keyword: PropTypes.string,
  setKeyword: PropTypes.func,
  setPage: PropTypes.func,
  onKeyword: PropTypes.func,
  fieldFromToolbar: PropTypes.func,
};

export default function StatusListToolbar({ numSelected, keyword, setKeyword, onKeyword, fieldFromToolbar, setPage }) {
  const [filter, setFilter] = useState('image');

  const handleChange = (event) => {
    setFilter(event.target.value);
    fieldFromToolbar(event.target.value);
  };

  const handleClearSearch = () => {
    setKeyword('')
    setFilter('image')
    setPage(0)
  }

  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Field</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Field"
              onChange={handleChange}
            >
              <MenuItem value="image">Image</MenuItem>
              <MenuItem value="oldtag">Old Tag</MenuItem>
              <MenuItem value="newtag">New Tag</MenuItem>
              <MenuItem value="cluster">Cluster</MenuItem>
              <MenuItem value="blob">Blob Name</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <StyledSearch
          value={keyword}
          onChange={onKeyword}
          placeholder="Search..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
        </>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Retry">
          <IconButton>
            <Iconify icon="pajamas:retry" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Clear search">
          <IconButton onClick={handleClearSearch}>
            <Iconify icon="mdi:clear-outline" />
          </IconButton>
        </Tooltip>
      )}
    </StyledRoot>
  );
}
