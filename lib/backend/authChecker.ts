import { AuthenticationError } from "apollo-server-errors";
import { AuthChecker } from "type-graphql";
import { Context } from "types/Context";

export const authChecker: AuthChecker<Context> = ({ context }, roles) => {
    if (context.user) {
        if (roles.length === 0) {
            return true;
        }
        return roles.some(e => e == context.user.role);
    }
    // return false;
    throw new AuthenticationError("Not authenticated");
};
