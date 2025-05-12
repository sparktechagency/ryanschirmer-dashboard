import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
import { Bell } from "lucide-react";

export default function NotificationCard({ notification }) {
  return (
    <div
      className={clsx(
        "flex-center-start gap-x-5 rounded-xl border border-primary bg-white p-4",
        !notification?.read && "bg-secondary",
      )}
    >
      <div
        className={clsx(
          "rounded-lg border border-primary p-4 text-primary-black",
          !notification?.read && "!bg-secondary",
        )}
      >
        <Bell size={20} className="text-primary" />
      </div>

      <div className="w-full">
        <div className="flex-center-between w-full gap-x-10">
          <h5 className="text-lg text-primary-black">
            {notification?.message}
          </h5>

          <p className="text-primary-black">
            {notification?.createdAt &&
              formatDistanceToNow(notification?.createdAt, { addSuffix: true })}
          </p>
        </div>

        <p className="mt-1 text-primary-black">{notification?.description}</p>
      </div>
    </div>
  );
}
