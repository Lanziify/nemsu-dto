import { SideNavigationMenuItem } from "@/types/types";
import {
	Badge,
	Bell,
	File,
	HeartHandshake,
	History,
	LayoutDashboard,
	School,
	UserRoundCog,
	Users,
	Wrench,
} from "lucide-react";

export const sidebarItems: SideNavigationMenuItem[] = [
	{
		type: "normal",
		name: "Dashboard",
		path: "dashboard",
		icon: <LayoutDashboard size={16} />,
	},
	{
		name: "Notifications",
		path: "notifications",
		icon: <Bell size={16} />,
		type: "normal",
	},
	{
		name: "Users",
		path: "users",
		icon: <Users size={16} />,
		type: "normal",
	},
	{
		name: "Requests",
		path: "requests",
		icon: <File size={16} />,
		type: "accordion",
		children: [
			{
				name: "Repair",
				path: "requests/repair",
				icon: <Wrench size={16} />,
				type: "normal",
			},
			{
				name: "Assitance",
				path: "requests/assitance",
				icon: <HeartHandshake size={16} />,
				type: "normal",
			},
			{
				name: "History",
				path: "requests/history",
				icon: <History size={16} />,
				type: "normal",
			},
		],
	},
	{
		name: "Account Properties",
		path: "account-properties",
		icon: <UserRoundCog size={16} />,
		type: "accordion",
		children: [
			{
				name: "Positions",
				path: "account-properties/position",
				icon: <Badge size={16} />,
				type: "normal",
			},
			{
				name: "Office",
				path: "account-properties/office",
				icon: <School size={16} />,
				type: "normal",
			},
		],
	},
];
