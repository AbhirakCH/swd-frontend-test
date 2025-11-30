import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  title: string;
  firstname: string;
  lastname: string;
  birthday: string;
  nationality: string;
  citizenId: {
    part1: string;
    part2: string;
    part3: string;
    part4: string;
    part5: string;
  };
  gender: string;
  mobilePhonePrefix: string;
  mobilePhoneNumber: string;
  passportNo: string;
  expectedSalary: number;
}

interface UserState {
  users: User[];
  selectedUser: User | null;
}

const loadUsersFromStorage = (): User[] => {
  if (typeof window !== "undefined") {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
  }
  return [];
};

const initialState: UserState = {
  users: loadUsersFromStorage(),
  selectedUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
        if (typeof window !== "undefined") {
          localStorage.setItem("users", JSON.stringify(state.users));
        }
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
    deleteUsers: (state, action: PayloadAction<string[]>) => {
      state.users = state.users.filter(
        (user) => !action.payload.includes(user.id)
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { addUser, updateUser, deleteUser, deleteUsers, setSelectedUser } =
  userSlice.actions;
export default userSlice.reducer;
