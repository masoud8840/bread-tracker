interface IStateShape {
  authorized: boolean;
  User: IUser;
}

interface ILoginResponse extends IResponse {
  user: IUser;
}
import type { IUser, IResponse } from "../types/types";
export const useAuthenticationStore = defineStore("authenticationStore", {
  state: (): IStateShape => ({
    authorized: false,
    User: {
      _id: "",
      username: "",
      email: "",
      role: "User",
      balance: 0,
      token: "",
      negativeToday: 0,
      negativeTotal: 0,
    },
  }),
  getters: {
    getUser(): IUser {
      return this.User;
    },
  },
  actions: {
    async signup(username: string, email: string, password: string) {
      const config = useRuntimeConfig();
      const response = await $fetch<Promise<IResponse>>(
        `${config.public.baseURL}/auth/signup`,
        {
          method: "POST",
          body: {
            username,
            email,
            password,
          },
        }
      );
      return response;
    },

    async login(email: string, password: string) {
      const config = useRuntimeConfig();
      const res = await $fetch<Promise<ILoginResponse>>(
        `${config.public.baseURL}/auth/login`,
        {
          method: "POST",
          body: {
            email,
            password,
          },
        }
      );

      if (res.statusCode === 200) {
        this.User = res.user;
        this.authorized = true;
        this._saveToken();
      }
      return res;
    },

    async checkLogin() {
      this._loadToken();
      this.authorized = false;
      if (this.User.token.length > 0) {
        const config = useRuntimeConfig();
        const res = await $fetch<Promise<ILoginResponse>>(
          `${config.public.baseURL}/auth/check`,
          {
            method: "POST",
            body: { token: this.User.token },
          }
        );

        if (res.statusCode === 200) {
          this.authorized = true;
          this.User = { ...res.user };
          this._loadToken();
        }
      }
    },

    _saveToken() {
      localStorage.setItem("token", this.User.token);
    },
    _loadToken() {
      this.User.token = localStorage.getItem("token") || "";
    },
  },
});
