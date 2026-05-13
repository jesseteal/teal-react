import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import { ListItemButton } from '@mui/material';

interface ListItemType {
  icon?: any;
  content?: any;
  label?: string;
  onClick?: () => void;
  right?: any;
  itemStyle?: any;
}
export default function SimpleList({
  header,
  items,
}: {
  header?: string;
  items: ListItemType[];
}) {
  // const [checked, setChecked] = React.useState(['wifi']);

  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={header ? <ListSubheader>{header}</ListSubheader> : undefined}>
      {items.map((item: ListItemType, index: number) => {
        return (
          <React.Fragment key={item.label}>
            {(index > 0 || header) && <Divider />}
            <ListItem disablePadding sx={item.itemStyle}>
              <ListItemButton onClick={item.onClick}>
                {item.content ? (
                  <>{item.content}</>
                ) : (
                  <>
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    <ListItemText primary={item.label} />
                  </>
                )}
              </ListItemButton>
              {item.right}
              {/* <Switch
              edge="end"
              onChange={handleToggle('wifi')}
              checked={checked.indexOf('wifi') !== -1}
              inputProps={{
                'aria-labelledby': 'switch-list-label-wifi',
              }}
            /> */}
            </ListItem>
          </React.Fragment>
        );
      })}
    </List>
  );
}
