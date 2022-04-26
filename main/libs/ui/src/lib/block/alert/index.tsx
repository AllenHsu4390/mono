import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';
import { Box, DialogContentText, Grow, Zoom } from '@mui/material';

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

const AlertDialog: React.FC<Props> = ({
  title,
  trigger,
  content,
  actions,
  open,
  onClose,
}) => {
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
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>{actions}</DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlertDialog;
