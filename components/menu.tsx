import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function BasicMenu({ onClick, category }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: { currentTarget: any; }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (content: boolean | React.ReactChild | React.ReactFragment) => {
    console.log(content);
    onClick(content);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        絞り込み
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={(content) => handleClose('すべて')}>すべて</MenuItem>
        {category.map((item: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; id: React.Key; }) => (
          <MenuItem onClick={(content) => handleClose(item.name)} key={item.id}>{item.name}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}