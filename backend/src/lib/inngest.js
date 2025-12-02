import { Inngest } from "inngest";
import User from "../models/User";

export const inngest = new Inngest({
  id: "talent-meet",
});

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;
    const newUser = {
      clerkId: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      profilePicture: image_url,
    };
    await User.create(newUser);
    console.log(`User ${id} created in database`);
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });
    console.log(`User ${id} deleted from database`);
  }
);

export const functions = [syncUser, deleteUserFromDB];
