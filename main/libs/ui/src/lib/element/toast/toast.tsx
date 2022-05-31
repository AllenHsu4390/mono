import { Box, SxProps, Theme } from '@mui/material';
import { useEffect, useReducer } from 'react';

interface Props {
  show: boolean;
  color: string;
  content: React.ReactNode;
  sx: SxProps<Theme>;
  onHide?(): void;
  timer?: number;
}

type StateType = 'showing' | 'hiding' | 'ready';

interface State {
  current: StateType;
}

interface Action {
  type: StateType;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'showing':
    case 'hiding':
    case 'ready':
      return {
        current: action.type,
      };
    default:
      return state;
  }
};

const Toast = ({ show, color, content, sx, timer = 3000, onHide }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    current: 'ready',
  });
  const isVisible = state.current === 'showing';

  useEffect(() => {
    if (state.current === 'ready') {
      if (show) {
        dispatch({ type: 'showing' });
      }
      return;
    }

    if (state.current === 'hiding') {
      onHide && onHide();
      dispatch({ type: 'ready' });
      return;
    }

    if (state.current === 'showing') {
      const timeoutId = setTimeout(() => {
        dispatch({ type: 'hiding' });
      }, timer * 2);

      return () => {
        clearTimeout(timeoutId);
      };
    }

    return;
  }, [state, timer, show, onHide]);

  return (
    <Box
      sx={{
        position: 'absolute',
        opacity: `${isVisible ? '1' : '0'}`,
        transition: isVisible
          ? `opacity ${timer / 1000}s linear`
          : `opacity ${timer / 1000}s ease-out`,
        color,
        ...sx,
      }}
    >
      {content}
    </Box>
  );
};

export default Toast;
