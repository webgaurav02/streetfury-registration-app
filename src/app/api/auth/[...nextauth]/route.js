// import NextAuth from "next-auth";
// import { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

// const authOptions: AuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email and password are required");
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !(await bcrypt.compare(credentials.password, user.password!))) {
//           throw new Error("Invalid email or password");
//         }

//         return user;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/signin",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// // Next.js API Route Handlers
// export const GET = handler;
// export const POST = handler;



import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectMongo from "../../../../lib/mongodb";
import Participant from "../../../../models/Participant";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        await connectMongo(); // Ensure MongoDB is connected

        const user = await Participant.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // When using Google, check if user exists in database, create if not
      console.log(user)
      if (account.provider === 'google') {
        await connectMongo(); // Ensure MongoDB is connected
        
        let existingUser = await Participant.findOne({ email: user.email });

        if (!existingUser) {
          // Create new user in the database if not exists
          const newUser = new Participant({
            email: user.email,
            name: user.name,
            image: user.image,
            password: '', 
          });
          
          await newUser.save();
        }
      }
      return true; // Return true to indicate successful sign-in
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

// Next.js API Route Handlers
export const GET = handler;
export const POST = handler;
