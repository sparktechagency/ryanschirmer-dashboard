"use client";
import "./Sidebar.css";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Users2, LogOut, House, Settings, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { successToast } from "@/utils/customToast";
import { LayoutDashboard } from "lucide-react";
import { BookImage } from "lucide-react";
import Image from "next/image";

const SidebarContainer = ({ collapsed }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const navbarTitle = pathname.split("/admin")[1].split("/")[1];
  // Logout handler
  const handleLogout = (e) => {
    if (e.key !== "logout") return;

    dispatch(logout());
    router.refresh();
    router.push("/login");
    successToast("Logout Successful!");
  };

  const sidebarLinks = [
    {
      key: "dashboard",
      icon: <LayoutDashboard size={21} strokeWidth={2} />,
      label: <Link href={"/admin/dashboard"}>Dashboard</Link>,
    },
    {
      key: "account-details",
      icon: <Users2 size={21} strokeWidth={2} />,
      label: <Link href={"/admin/account-details"}>Account Details</Link>,
    },
    {
      key: "banner",
      icon: <BookImage size={21} strokeWidth={2} />,
      label: <Link href={"/admin/banner"}>Banner Update</Link>,
    },
    {
      key: "settings",
      icon: <Settings size={21} strokeWidth={2} />,
      label: <Link href={"/admin/settings"}>Settings</Link>,
    },
    {
      key: "logout",
      icon: <LogOut size={21} strokeWidth={2} />,
      label: "Logout",
    },
  ];

  // Get current path for sidebar menu item `key`
  const currentPathname = usePathname()?.replace("/admin/", "")?.split(" ")[0];

  return (
    <Sider
      width={320}
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        paddingInline: `${!collapsed ? "10px" : "4px"}`,
        paddingBlock: "80px",
        backgroundColor: "var(--primary-white)",
        maxHeight: "100vh",
        overflow: "auto",
      }}
      className="scroll-hide !shadow-xl"
    >
      <div className="mb-6 flex flex-col items-center justify-center gap-y-5">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            className={collapsed ? "h-[60px] w-[60px]" : "h-[140px] w-[140px]"}
            alt="logo"
          />
        </Link>
      </div>

      <Menu
        onClick={handleLogout}
        defaultSelectedKeys={[currentPathname]}
        mode="inline"
        className="sidebar-menu space-y-2.5 !border-none !bg-transparent !pb-10"
        items={sidebarLinks}
      />
    </Sider>
  );
};

export default SidebarContainer;
