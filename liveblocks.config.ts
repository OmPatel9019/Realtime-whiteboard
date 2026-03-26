// Define Liveblocks types for your application
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
const client = createClient({
    publicApiKey: "pk_dev_DKQojcVXOO1-HgceLEULUSS_dl9GjixYFaLIoLJayKS3HK8En-YMf4c7Skrodp-B",
});
const { RoomProvider } = createRoomContext(client);
declare global {
  interface Liveblocks {
    Presence: {
      presence: any;
    };

    Storage: {
      // records: LiveMap<string, any>;
    };

    UserMeta: {
      id: string;
      info: {
        name: string;
        color: string;
        avatar: string;
      };
    };
  }
}