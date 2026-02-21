import { useReducer, useEffect, useCallback } from "react";
import { fetchUsers } from "../api/users";
import { usersReducer, initialState, ACTIONS } from "../store/usersReducer";

let nextId = 1000;

export function useUsers() {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  //  Load users from API on mount 
  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      try {
        const data = await fetchUsers();
        if (!cancelled) {
          dispatch({ type: ACTIONS.SET_USERS, payload: data });
        }
      } catch (err) {
        if (!cancelled) {
          dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
        }
      }
    }

    loadUsers();
    return () => { cancelled = true; };
  }, []);

  // Actions: add, update, delete 
  const addUser = useCallback((formData) => {
    const newUser = {
      id:       nextId++,
      name:     formData.name,
      email:    formData.email,
      phone:    formData.phone    || "—",
      website:  formData.website  || "—",
      username: formData.name.toLowerCase().replace(/\s+/g, "."),
      address:  {},
      company:  { name: formData.company || "—" },
      _isNew:   true,
    };
    dispatch({ type: ACTIONS.ADD_USER, payload: newUser });
    return newUser;
  }, []);

  const updateUser = useCallback((updatedUser) => {
    dispatch({ type: ACTIONS.UPDATE_USER, payload: updatedUser });
  }, []);

  const deleteUser = useCallback((userId) => {
    dispatch({ type: ACTIONS.DELETE_USER, payload: userId });
  }, []);

  return {
    users:   state.users,
    loading: state.loading,
    error:   state.error,
    addUser,
    updateUser,
    deleteUser,
  };
}
