import checkAuthenticated from "@/server/api/routers/helpers/checkAuthenticated";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

export const roleRouter = createTRPCRouter({
	getAll: protectedProcedure.query(({ input, ctx }) => {
		const user = checkAuthenticated(ctx);
		return ctx.prisma.role.findMany();
	}),
});
