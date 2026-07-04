import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router';
import image1 from '../src/assets/Group 61.png'

export default function BasicMenu() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (path = "/catalog") => {
    setAnchorEl(null);
    navigate(path);
  };

  return (
    <div>
      <Button
        color='black'
        id={buttonId}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleClick}
        sx={{ p: 0, minWidth: 0, textTransform: 'none' }}
      >
        <Box sx={{display: "flex", gap : "15px", alignItems : "center" ,fontSize : "15px" , backgroundColor :"#167FFE" , padding : "10px 20px" , borderRadius : "5px" , color : "white", '&:hover': { backgroundColor: '#1b6fd1' }, transition: 'background-color 0.2s' }}>
          <img src={image1} alt="" />
          {t("catalog.menuButton")}
        </Box>
      </Button>

      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': buttonId,
          },
        }}
      >
        {t("catalog.categoriesFull", { returnObjects: true }).map((category) => (
          <MenuItem key={category} onClick={() => handleItemClick("/catalog")}>{category}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}
