"use client";

import userAvatar from "@/assets/images/user-avatar-lg.png";
import NotificationCard from "./NotificationCard";
import { Button } from "antd";
import { Divider } from "antd";
import { useEffect } from "react";
import { useSocket } from "@/context/SocketContextApi";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/authSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  useDeleteNotificationMutation,
  useGetMyNotificationQuery,
  useMarkAsReadMutation,
} from "@/redux/api/notificationApi";
import { errorToast, successToast } from "@/utils/customToast";
import EmptyContainer from "@/components/EmptyContainer/EmptyContainer";

export default function NotificationContainer() {
  const userId = useSelector(selectUser)?.userId;
  const { socket } = useSocket();
  const router = useRouter();

  // Get notifications
  const { data: notificationsRes } = useGetMyNotificationQuery(
    {},
    {
      skip: !userId,
    },
  );
  const notifications = notificationsRes?.data || [];

  const [markNotifications, { isLoading: isNotificationLoading }] =
    useMarkAsReadMutation();

  const [deleteNotification, { isLoading: isDeleteNotificationLoading }] =
    useDeleteNotificationMutation();

  const handleMarkNotificationsAsRead = async () => {
    try {
      await markNotifications().unwrap();
      successToast("Successful");
    } catch (error) {
      errorToast(error?.message || error?.data?.message);
    }
  };

  const handleDeleteNotification = async () => {
    try {
      await deleteNotification().unwrap();
      successToast("Notification deleted successfully!");
    } catch (error) {
      errorToast(error?.message || error?.data?.message);
    }
  };

  return (
    <div className="rounded-2xl bg-white shadow-2xl">
      <section className="flex-center-between p-6">
        <h3 className="text-2xl font-semibold text-primary-black">
          Notifications
        </h3>

        <div className="flex gap-2">
          <Button
            loading={isNotificationLoading}
            onClick={handleMarkNotificationsAsRead}
          >
            Mark as read
          </Button>
          <Button
            className="!bg-danger !text-white"
            loading={isDeleteNotificationLoading}
            onClick={handleDeleteNotification}
          >
            Delete all
          </Button>
        </div>
      </section>

      <Divider className="!my-0 !w-full bg-white" />

      <div className="mb-10 py-5">
        {notifications?.length > 0 ? (
          <section className="space-y-4 px-4">
            {notifications?.map((notification) => (
              <NotificationCard
                key={notification.key}
                notification={notification}
              />
            ))}
          </section>
        ) : (
          <EmptyContainer className="!my-10 pb-20" />
        )}
      </div>
    </div>
  );
}
