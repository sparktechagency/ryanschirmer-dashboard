"use client";

import { Button } from "antd";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Layout } from "antd";
import { AlignJustify } from "lucide-react";
import { useGetProfileQuery } from "@/redux/api/userApi";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContextApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagtypes";
const { Header } = Layout;

export default function HeaderContainer({ collapsed, setCollapsed }) {
  const pathname = usePathname();
  const navbarTitle = pathname.split("/admin")[1];
  const userId = useSelector((state) => state.auth.user)?.userId;
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const [showNotificationDot, setShowNotificationDot] = useState(false);
  const router = useRouter();

  const { data: myProfileRes } = useGetProfileQuery({}, { skip: !userId });
  const myProfile = myProfileRes?.data || {};
  const currentPath = usePathname();

  const handleNotifications = async (data) => {
    toast.info(data?.message, {
      action: {
        label: "View",
        onClick: () => {
          router.push("/admin/notification");
        },
      },
    });

    // Invalidate notifications cache
    dispatch(baseApi.util.invalidateTags([tagTypes.notification]));

    if (!currentPath?.includes("notification")) {
      setShowNotificationDot(true);
    }
  };

  // Listen to notifications
  useEffect(() => {
    if (socket && userId) {
      socket.on(`notification::${userId}`, handleNotifications);
    }

    return () => {
      socket?.off(`notification::${userId}`, handleNotifications);
    };
  }, [socket, userId, handleNotifications]);

  useEffect(() => {
    if (currentPath?.includes("notification")) {
      setShowNotificationDot(false);
    }
  }, [pathname, currentPath]);

  const handleAppLaunchNotification = async (data) => {
    toast.info(`${data?.name} has registered for the app launch 🎉🎉`, {
      action: {
        label: "View",
        onClick: () => {
          router.push("/admin/app-launch");
        },
      },
    });

    // Invalidate app launch registered users api
    dispatch(baseApi.util.invalidateTags([tagTypes.appLaunchRegisteredUsers]));
  };

  // Listen to app launch registrations
  useEffect(() => {
    if (socket && userId) {
      socket.on("schedule-emit", handleAppLaunchNotification);
    }

    return () => {
      socket?.off("schedule-emit", handleAppLaunchNotification);
    };
  }, [socket, userId]);

  return (
    <Header
      className="border-[rgb(0 0 0 / 0.25)] z-[1] border-b !shadow-lg"
      style={{
        backgroundColor: "var(--primary-white)",
        color: "var(--primary-black)",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 0,
        paddingRight: "40px",
      }}
    >
      {/* Collapse Icon */}
      <div className="flex items-center gap-x-2">
        <Button
          type="text"
          icon={<AlignJustify strokeWidth={3} size={25} />}
          onClick={() => setCollapsed(!collapsed)}
          className="!text-[var(--primary-black)]"
        />

        <h1 className="text-3xl font-medium capitalize">
          {navbarTitle.length > 1
            ? navbarTitle.split("/")[1].replaceAll(/-/g, " ")
            : "dashboard"}
        </h1>
      </div>

      {/* Right --- notification, user profile */}
      <div className="flex items-center gap-x-6">
        <Link href="/admin/notification" className="relative !leading-none">
          {/* Notification dot indicator */}
          {showNotificationDot && (
            <div className="absolute right-2 top-1 size-3 rounded-full bg-[#f48b2f]" />
          )}

          <button className="rounded-full bg-primary-black p-2">
            <Bell stroke="var(--primary-white)" size={22} />
          </button>
        </Link>

        {/* User */}
        <Link
          href={"/admin/profile"}
          className="hover:text-primary-blue group flex items-center gap-x-2 text-primary-black"
        >
          {myProfile?.image ? (
            <Image
              src={myProfile?.image}
              alt={`Avatar image of admin: ${myProfile?.name}`}
              width={52}
              height={52}
              className="aspect-square rounded-full border-2 border-primary-black p-0.5 group-hover:border"
            />
          ) : (
            <Avatar
              style={{
                backgroundColor: "var(--primary)",
                verticalAlign: "middle",
              }}
              size="large"
            >
              {myProfile?.name && myProfile?.name[0]}
            </Avatar>
          )}

          <h4 className="text-lg font-semibold text-black">
            {myProfile?.name}
          </h4>
        </Link>
      </div>
    </Header>
  );
}
