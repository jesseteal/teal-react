import Modal from '@mui/material/Modal';
/*
<SimpleModal
  open={open}
  onClose={}>
  content
</SimpleModal>
 */
interface SimpleModalProps {
  children: any;
  open?: boolean;
  onClose?: () => void;
  size?: 'sm' | 'md' | 'lg';
}
export default function SimpleModal({
  children,
  open = true,
  onClose,
  size = 'lg',
}: SimpleModalProps) {
  let flex = 0.15;
  if (size === 'sm') {
    flex = 0.75;
  } else if (size === 'md') {
    flex = 0.5;
  }
  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          display: 'flex',
          paddingTop: 32,
        }}>
        <div style={{ flex }} />
        <div style={{ flex: 1 }}>{children}</div>
        <div style={{ flex }} />
      </div>
    </Modal>
  );
}
