interface IStateShape {
  authorized: boolean;
  User: {
    username: string;
    email: string;
    role: "Admin" | "User";
    balance: number;
    token: string;
  };
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
      const res = await $fetch<Promise<User>>(
        `${config.public.baseURL}/auth/login`,
        {
          method: "POST",
          body: {
            email,
            password,
          },
        }
      );
      console.log(res);

      // if (res.statusCode === 200) {
      //   this.User = { ...res };
      //   this.authorized = true;
      // }
      return res;
    },
  },
});
