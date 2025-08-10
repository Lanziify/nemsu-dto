"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/data-table";
import { usersColumns } from "@/data/user-table-columns";
import { useDbCollection } from "@/hooks/use-firebase-hook";
import { getCollection } from "@/lib/firestoreReference";
import { DtoUser, DtoUserRole } from "@/types/firebase";
import React from "react";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import {
  ColumnFiltersState,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import Link from "next/link";

export default function Users() {
  const usersRef = React.useMemo(() => getCollection("users"), []);
  const { data, loading } = useDbCollection<DtoUser>(usersRef);

  const [columnFilters, setColumnFilter] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data: data as DtoUser[],
    columns: usersColumns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilter,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full">
      {data && (
        <div>
          <div className="flex justify-between">
            <div className="mb-8 flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Input
                  className="w-60"
                  placeholder="Search"
                  value={
                    (table
                      .getColumn("displayName")
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(e) =>
                    table
                      .getColumn("displayName")
                      ?.setFilterValue(e.target.value)
                  }
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    <ListFilter size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button asChild>
              <Link href="./user-management/add/user">Add User</Link>
            </Button>
          </div>
          <DataTable
            columns={usersColumns}
            data={data.filter((user) => user.role !== DtoUserRole.SuperAdmin)}
            columnFilters={columnFilters}
            columnVisibility={columnVisibility}
          />
        </div>
      )}
    </div>
  );
}
