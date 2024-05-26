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
        const DJ_URL = String(process.env.DJ_URL);
        // Fetch user from Django API
        const res = await fetch(DJ_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: credentials?.username,
            password: credentials?.password,
          }),
        });
        const data = await res.json();

        if (res.ok && data) {
          return data;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.user.id;
        token.role = user.user.role;
        token.access = user.access;
        token.username = user.user.username;
        token.customer_id = user.user.customer_id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.access = token.access;
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.customer_id = token.customer_id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
