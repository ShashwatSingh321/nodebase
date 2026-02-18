import {checkout,polar,portal} from "@polar-sh/better-auth"
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/db"
import { polarClient } from "./polar";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
        provider:  "postgresql",
    }),
    emailAndPassword: { 
    enabled: true, 
    autoSignIn: true,
  },
  socialProviders: {
  github: {
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  },
}, 
  plugins: [
  polar({
    client: polarClient,
    createCustomerOnSignUp: true,
    use: [
      checkout({
        products: [
          {
            productId: "bb296aab-8238-45b8-8e3c-6d6be9b8c86e",
            slug: "pro",
          }
        ],
        successUrl: process.env.POLAR_SUCCESS_URL,
        authenticatedUsersOnly: true,
      }),
      portal()
    ],
  })
],

});