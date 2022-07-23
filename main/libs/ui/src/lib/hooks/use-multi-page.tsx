import { useReducer } from 'react';

interface State {
  isLoading: boolean;
  pages: string[];
  currentPage: string;
  pageNum: number;
  errorMsg?: string;
}

type Action = {
  type: 'loading' | 'error' | 'page';
  isLoading?: boolean;
  errorMsg?: string;
  pageNum?: number;
};

const clampPageNum = (pages: string[], pageNum?: number) => {
  if (!pageNum) {
    return 0;
  }

  return Math.min(Math.max(pageNum, 0), pages.length - 1);
};

const reducer = (state: State, action: Action): State => {
  const pageNum = clampPageNum(state.pages, action.pageNum);
  const currentPage = state.pages[pageNum];
  switch (action.type) {
    case 'page':
      return {
        ...state,
        isLoading: false,
        pageNum,
        currentPage,
      };
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'error':
      return {
        ...state,
        isLoading: false,
        errorMsg: action.errorMsg || '',
      };
    default:
      return state;
  }
};

export const useMultiPage = ({ pages }: { pages: string[] }) => {
  const [state, dispatch] = useReducer(reducer, {
    pages,
    pageNum: 0,
    currentPage: pages[0],
    isLoading: false,
  });

  return {
    state,
    reset: () => dispatch({ type: 'page', pageNum: 0 }),
    done: () => dispatch({ type: 'page', pageNum: state.pages.length - 1 }),
    next: () => dispatch({ type: 'page', pageNum: state.pageNum + 1 }),
    prev: () => dispatch({ type: 'page', pageNum: state.pageNum - 1 }),
    page: (page: string) =>
      dispatch({
        type: 'page',
        pageNum: state.pages.findIndex((p) => p === page),
      }),
    error: () => dispatch({ type: 'error' }),
    loading: () => dispatch({ type: 'loading' }),
  };
};
