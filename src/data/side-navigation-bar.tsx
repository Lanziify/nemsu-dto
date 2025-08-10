import { SidebarItem } from "@/types/types";
import {
  Badge,
  Bell,
  ChartLine,
  DoorOpen,
  HeartHandshake,
  History,
  MessageCircleMore,
  School,
  Table,
  UserRoundCog,
  Users,
  Wrench,
} from "lucide-react";

export const sidebarItems: SidebarItem[] = [
  {
    type: "normal",
    name: "Dashboard",
    path: "dashboard",
    icon: ChartLine,
  },
  {
    name: "Notifications",
    path: "notifications",
    icon: Bell,
    type: "normal",
  },
  {
    name: "Chat",
    path: "chat",
    icon: MessageCircleMore,
    type: "normal",
  },
  {
    name: "User Management",
    path: "/admin/user-management",
    icon: Users,
    type: "normal",
  },
  {
    name: "Requests",
    path: "requests",
    icon: Table,
    type: "collapsible",
    children: [
      {
        name: "Repair",
        path: "requests/repair",
        icon: Wrench,
        type: "normal",
      },
      {
        name: "Assitance",
        path: "requests/assitance",
        icon: HeartHandshake,
        type: "normal",
      },
      {
        name: "History",
        path: "requests/history",
        icon: History,
        type: "normal",
      },
    ],
  },
  {
    name: "Account Properties",
    path: "account-properties",
    icon: UserRoundCog,
    type: "collapsible",
    children: [
      {
        name: "Positions",
        path: "account-properties/position",
        icon: Badge,
        type: "normal",
      },
      {
        name: "Office",
        path: "account-properties/office",
        icon: DoorOpen,
        type: "normal",
      },
      {
        name: "Campus",
        path: "account-properties/campus",
        icon: School,
        type: "normal",
      },
    ],
  },
];
