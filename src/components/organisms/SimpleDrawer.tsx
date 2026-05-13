import { Drawer } from '@mui/material';

export default function SimpleDrawer({ children, open = true, onClose }: any) {
  return (
    <Drawer open={open} onClose={onClose}>
      {children}
    </Drawer>
  );
}
