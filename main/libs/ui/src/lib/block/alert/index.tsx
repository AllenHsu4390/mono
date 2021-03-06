import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Grow } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

interface Props {
  trigger: React.ReactNode;
  title: React.ReactNode;
  content: React.ReactNode;
  actions: React.ReactNode;
  open: boolean;
  onClose(): void;
}

const AlertDialog = ({
  title,
  trigger,
  content,
  actions,
  open,
  onClose,
}: Props) => {
  return (
    <Box
      sx={{
        width: 'fit-content',
        position: 'relative',
      }}
    >
      {trigger}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>{actions}</DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlertDialog;
