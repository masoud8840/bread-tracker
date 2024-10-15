import type { User, IResponse } from "../../types/types";

interface IUsersResponse extends IResponse {
  users: User[];
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const res = await $fetch<IUsersResponse>(
    `${config.public.baseURL}/admin/users`
  );

  console.log(res.users);
});
