import NextAuth, { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const providers = [
  Google({
    clientId: process.env.AUTH_GOOGLE_ID as string,
    clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
  }),
  CredentialsProvider({
    credentials: {
      username: { label: "Username" },
      password: { label: "Password", type: "password" },
    },
    async authorize(request: any) {
      if ((request.email ?? "").trim() !== "" && (request.name ?? "").trim() !== "") {
        return {
          id: "1",
          name: request.name,
          email: request.email,
        }
      }
      return null

    },
  }),
]


export const providerMap = providers?.map((provider: any) => {
  if (typeof provider === "function") {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})

const authOptions: AuthOptions = {
  pages: {
    signIn: "/signin",
  },
  session: {
    maxAge: 60 * 60 * 3
  },
  providers,
  secret: process.env.AUTH_SECRET as string,
  callbacks: {
    async jwt({ token, account }) {
      try {
        return token;
      } catch (error) {
        console.error("JWT Callback Error:", error);
        throw error;
      }
    },
    async session({ session, token }) {
      try {
        return session;
      } catch (error) {
        console.error("Session Callback Error:", error);
        throw error;
      }
    },
  },
};

export default NextAuth(authOptions);