import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function BuyDext() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>

                            <button
                                id="basic-button"
                                className="buyDext"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                Buy DEXT
                                <i className="icon-arrow_right"></i>
                            </button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><a target="_blank" rel="noreferrer" href="https://app.uniswap.org/#/swap?inputCurrency=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&outputCurrency=0xfB7B4564402E5500dB5bB6d63Ae671302777C75a&chain=mainnet"><img src="/assets/images/uniswap.svg" alt="uniswap-icon" /> Buy on Uniswap</a></MenuItem>
        <MenuItem onClick={handleClose}><a target="_blank" rel="noreferrer" href="https://www.coinbase.com/price/dextools"><img src="/assets/images/coinbase.svg" alt="coinbase-icon" /> Buy on Coinbase</a></MenuItem>
        <MenuItem onClick={handleClose}><a target="_blank" rel="noreferrer" href="https://app.1inch.io/#/1/swap/ETH/DEXT"><img src="/assets/images/1inch.svg" alt="1inch-icon" /> Buy on 1inch</a></MenuItem>
        <MenuItem onClick={handleClose}><a target="_blank" rel="noreferrer" href="https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=0xe91a8D2c584Ca93C7405F15c22CdFE53C29896E3"><img src="/assets/images/pancakeswap.svg" alt="pancakeswap-icon" /> Buy on PancakeSwap</a></MenuItem>
      </Menu>
    </div>
  );
}