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
import { getCollection, getCollectionData } from "@/lib/firestoreReference";
import {
  DefaultProperty,
  DefaultPropertyWithId,
  DtoUser,
  DtoUserRole,
} from "@/types/firebase";
import React from "react";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import {
  ColumnFiltersState,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import OneTimeFormDialog, {
  OneTimeFormDialogField,
} from "@/components/shared/otf-dialog";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { safeCatch } from "@/lib/utils";
import { roles as dtoRoles } from "@/lib/constants";

interface RolePropertyWithId extends RoleType {
  refId: string;
}

type RoleType = DefaultProperty<(typeof dtoRoles)[number]>;

export default function Users() {
  const usersRef = React.useMemo(() => getCollection("users"), []);
  const rolesRef = React.useMemo(() => getCollection("roles"), []);

  const [roles, setRoles] = React.useState<RolePropertyWithId[] | null>(null);

  const { data, loading } = useDbCollection<DtoUser>(usersRef);

  const [columnFilters, setColumnFilter] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const schema = z.object({
    role: z.string().min(1, { message: "Please select a role." }),
    email: z
      .string()
      .min(1, { message: "Please enter your email." })
      .email("This is not a valid email."),
  });

  const defaultValues: z.infer<typeof schema> = {
    role: "",
    email: "",
  };

  const oneTimeDialogFields: OneTimeFormDialogField<typeof schema>[] = [
    {
      name: "email",
      label: "Email  ",
      type: "text",
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      items: roles as DefaultPropertyWithId[],
    },
  ];

  const handleOneTimeFormDialogSubmit: SubmitHandler<z.infer<typeof schema>> = (
    values,
  ) => {
    console.log(values);
  };

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

  React.useEffect(() => {
    const getter = async () => {
      const { data } = await safeCatch(() =>
        getCollectionData<RoleType>(rolesRef),
      );

      if (data) {
        setRoles(data.filter((d) => d.name !== "Super Admin"));
      }
    };

    getter();
  }, [rolesRef]);

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
            <OneTimeFormDialog
              title="Setting user defaults"
              description="Complete filling out this form to generate exipiring registration link. You can download the QR Code or send them email link to complete the registration process."
              triggerButtonText="Add User"
              fields={oneTimeDialogFields}
              defaultValues={defaultValues}
              submitHandler={handleOneTimeFormDialogSubmit}
              schema={schema}
              closeButton={<Button variant="secondary">Cancel</Button>}
              submitButton={<Button type="submit">Submit</Button>}
            />
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
