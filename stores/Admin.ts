import type { IResponse, IUser, IBread } from "../types/types";

interface IGetUsersResponse extends IResponse {
  users: IUser[];
}
interface IPostBreadResponse extends IResponse {
  bread: IBread;
}
interface IGetBreadResponse extends IResponse {
  breads: IBread[];
}
interface IStateShape {}
export const useAdminStore = defineStore("adminStore", {
  state: (): IStateShape => ({}),
  actions: {
    async getUsers() {
      const authStore = useAuthenticationStore();
      const config = useRuntimeConfig();

      const { users, statusCode } = await $fetch<Promise<IGetUsersResponse>>(
        `${config.public.baseURL}/admin/users`,
        {
          method: "GET",
          headers: {
            authorization: authStore.User.token,
          },
        }
      );

      if (statusCode === 200) return users;
    },

    async postBread(newBread: IBread) {
      const config = useRuntimeConfig();
      const authStore = useAuthenticationStore();

      const { bread } = await $fetch<IPostBreadResponse>(
        `${config.public.baseURL}/admin/bread`,
        {
          method: "POST",
          headers: {
            authorization: authStore.User.token,
          },
          body: newBread,
        }
      );

      return bread;
    },

    async getBreads() {
      const config = useRuntimeConfig();
      const authStore = useAuthenticationStore();
      if (authStore.authorized) {
        const { breads } = await $fetch<IGetBreadResponse>(
          `${config.public.baseURL}/admin/bread`,
          {
            method: "GET",
            headers: {
              authorization: authStore.User.token,
            },
          }
        );
        return breads;
      }
    },
  },
});
