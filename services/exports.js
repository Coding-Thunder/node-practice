import authRouter from "./auth/index";
import chatRootRouter from "./chatrooms/index";

const _routers = {
  auth: authRouter,
  chatroom: chatRootRouter,
};

export default _routers;
