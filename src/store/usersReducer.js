// ─── Action Types ─────────────────────────────────────────────────────────────
export const ACTIONS = {
  SET_USERS:   "SET_USERS",
  SET_LOADING: "SET_LOADING",
  SET_ERROR:   "SET_ERROR",
  ADD_USER:    "ADD_USER",
  UPDATE_USER: "UPDATE_USER",
  DELETE_USER: "DELETE_USER",
};

// ─── Initial State ────────────────────────────────────────────────────────────
export const initialState = {
  users:   [],
  loading: false,
  error:   null,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
export function usersReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload, error: null };

    case ACTIONS.SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ACTIONS.SET_USERS:
      return { ...state, users: action.payload, loading: false, error: null };

    case ACTIONS.ADD_USER:
      // New users are inserted at the top of the list
      return { ...state, users: [action.payload, ...state.users] };

    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u
        ),
      };

    case ACTIONS.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };

    default:
      return state;
  }
}
