import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { setRole, removeRole } from "../../../../../services/dashboardServices";
import { ButtonAdmin } from "@/components/Button";
import { redirect } from "next/navigation";

export default async function Admin() {
  const client = await clerkClient();
  const user = await currentUser();

  if(user?.publicMetadata?.role !== "admin" ) {
    redirect('/dashboard')
  }

  const users = (await client.users.getUserList()).data;

  return (
    <div className="w-full overflow-x-auto">
      {users.map((user) => {
        return (
          <div
            key={user.id}
            className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 ${
              users.indexOf(user) % 2 === 0
                ? "bg-neutral-50 dark:bg-neutral-800"
                : "bg-white dark:bg-neutral-900"
            }`}
          >
            {/* User Info Section */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-8 flex-1 min-w-0">
              <div className="dark:text-neutral-200 font-medium">
                {user.firstName} {user.lastName}
              </div>

              <div className="dark:text-neutral-200 text-sm sm:text-base truncate">
                {
                  user.emailAddresses.find(
                    (email) => email.id === user.primaryEmailAddressId
                  )?.emailAddress
                }
              </div>

              <div className="dark:text-neutral-200 text-sm sm:text-base">
                <span className="md:hidden font-medium">Role: </span>
                {user.publicMetadata.role as string}
              </div>
            </div>

            {/* Actions Section */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 md:gap-2 mt-2 md:mt-0 flex-shrink-0">
              <form action={setRole} className="inline">
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="admin" name="role" />
                <ButtonAdmin label="Make Admin" />
              </form>

              <form action={setRole} className="inline">
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="moderator" name="role" />
                <ButtonAdmin label="Make Moderator" />
              </form>

              <form action={removeRole} className="inline">
                <input type="hidden" value={user.id} name="id" />
                <ButtonAdmin label="Remove Role" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}