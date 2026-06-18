import Login from "@/app/login/page";
import { createSlice } from "@reduxjs/toolkit";

type perfil = "cliente" | "funcionario";

type Usuario = {
    nome: string;
    email: string;
    perfil: perfil;
}

type UserState = {
  usuario: Usuario | null;
  logado: boolean;
};

const initialState: UserState = {
  usuario: null,
  logado: false,
};

const userSlice = createSlice({
    name: "user",
    initialState, 
    reducers: {
        login: (state, action) => {
            state.usuario = action.payload;
            state.logado = true;
        },

        logout: (state) => {
            state.usuario = null;
            state.logado = false;
        },
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;