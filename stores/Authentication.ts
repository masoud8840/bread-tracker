interface IStateShape {
  authorized: boolean;
  User: User;
}

interface ILoginResponse extends IResponse {
  user: User;
}
import type { User, IResponse } from "../types/types";
export const useAuthenticationStore = defineStore("authenticationStore", {
  state: (): IStateShape => ({
    authorized: false,
    User: {
      username: "",
      email: "",
      role: "User",
      balance: 0,
      token: "",
    },
  }),
  getters: {
    getUser(): User {
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
        this.authorized = true;
        const config = useRuntimeConfig();
        const res = await $fetch<Promise<ILoginResponse>>(
          `${config.public.baseURL}/auth/check`,
          {
            method: "POST",
            body: { token: this.User.token },
          }
        );

        if (res.statusCode === 200) {
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
