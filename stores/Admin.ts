import type { IResponse, User } from "../types/types";

interface IGetUsersResponse extends IResponse {
  users: User[];
}
interface IStateShape {}
export const useAdminStore = defineStore("adminStore", {
  state: (): IStateShape => ({}),
  actions: {
    async getUsers() {
      const config = useRuntimeConfig();
      const authStore = useAuthenticationStore();

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
  },
});
