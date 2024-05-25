import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "johndoe",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      authorize: async (credentials) => {
        const users = [
          {
            id: "U001",
            role: "user",
            username: "maulydotdev",
            password: "1234",
          },
          {
            id: "U002",
            role: "admin",
            username: "admin",
            password: "admin",
          },
          {
            id: "U003",
            role: "user",
            username: "testuser",
            password: "1234",
          },
        ];

        const user = users.find(
          (user) =>
            user.username === credentials?.username &&
            user.password === credentials?.password
        );

        if (user) {
          console.log(credentials);
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
        token.access =
          "eyJhbGciOiJIUzI1NiJ9";
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.username = token.username;
        session.access = token.access;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login"
  }
});
