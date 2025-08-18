import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Branch, DtoUser, Position } from "@/types/firebase";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Timestamp } from "firebase-admin/firestore";
import { Office } from "@/types/firebase";
import { ArrowUpDown, Ellipsis } from "lucide-react";

export const usersColumns: ColumnDef<DtoUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 25,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "avatar",
    header: () => <div>Avatar</div>,
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.getValue("avatar")} />
        <AvatarFallback>
          {(row.getValue("displayName") as string).charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    ),
    size: 50,
  },
  {
    accessorKey: "displayName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0 hover:bg-transparent hover:opacity-50"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown size={16} />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.getValue("displayName")}</div>
    ),
    size: 100,
  },
  {
    accessorKey: "uid",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0 hover:bg-transparent hover:opacity-50"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Uid
        <ArrowUpDown size={16} />
      </Button>
    ),
    cell: ({ row }) => <div className="truncate">{row.getValue("uid")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0 hover:bg-transparent hover:opacity-50"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown size={16} />
      </Button>
    ),
    cell: ({ row }) => <div className="truncate">{row.getValue("email")}</div>,
  },
  {
    id: "branch",
    accessorFn: (row) => (row.branch as Branch).name,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0 hover:bg-transparent hover:opacity-50"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Branch
        <ArrowUpDown size={16} />
      </Button>
    ),
    cell: ({ row }) => <div className="truncate">{row.getValue("branch")}</div>,
    size: 100,
  },
  {
    id: "position",
    accessorFn: (row) => (row.position as Position).name,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0 hover:bg-transparent hover:opacity-50"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Position
        <ArrowUpDown size={16} />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.getValue("position")}</div>
    ),
  },
  {
    id: "office",
    accessorFn: (row) => (row.office as Office).name,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0 hover:bg-transparent hover:opacity-50"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Office
        <ArrowUpDown size={16} />
      </Button>
    ),
    cell: ({ row }) => <div className="truncate">{row.getValue("office")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0 hover:bg-transparent hover:opacity-50"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created Date
        <ArrowUpDown size={16} />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="truncate">
        {format(
          (row.getValue("createdAt") as Timestamp)
            .toDate()
            .toLocaleDateString(),
          "EEE | MMM d, yyyy",
        )}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => (
      <div className="flex justify-center">
        <Button variant="ghost" size="sm">
          <Ellipsis size={16} />
        </Button>
      </div>
    ),
    size: 40,
  },
];
