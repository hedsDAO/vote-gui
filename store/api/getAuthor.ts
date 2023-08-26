// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

// export const authorApi = createApi({
//   reducerPath: "authorApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://us-central1-heds-104d8.cloudfunctions.net/api/users" }),
//   tagTypes: ["displayName"],
//   endpoints: (builder) => ({
//     search: builder.query<string, unknown>({
//       query: (wallet) => `/${wallet}`,
//     }),
//   }),
// });