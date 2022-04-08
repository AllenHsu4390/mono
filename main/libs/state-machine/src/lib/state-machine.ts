type StateNode = StateMachine | null;

interface StateMachine {
  [key: string]: StateNode;
}

export const stateMachine: StateMachine = {
  'GET:/api/users/me': {
    'POST:/api/users/me': {
      'GET:/api/users/me': null,
    },
    'POST:/api/users': {
      'GET:/api/users/me': null,
    },
    'GET:/api/me/creators': {
      'GET:/api/assets/{creatorId}': {
        'GET:/api/users/me': null,
      },
    },
  },
};

export interface State {
  method: string;
  path: string;
  links: string[];
}

const keyToState = (key: string, next: StateMachine) => {
  const [method, path] = key.split(':');
  return {
    method,
    path,
    links: Object.keys(next),
  };
};

const collect = (map: Map<string, State>, states: StateMachine) => {
  return Object.keys(states).reduce(
    (accum: Map<string, State>, key: string): Map<string, State> => {
      if (states[key]) {
        accum.set(key, keyToState(key, states[key]));
        return collect(map, states[key]);
      }
      return accum;
    },
    map
  );
};

export const allLinks: Map<string, State> = collect(new Map(), stateMachine);

export const isValidEdge = (state: State, nextPath: string) => {
  return state.links.includes(nextPath);
};
