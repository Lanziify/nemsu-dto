"use client";

import { DataTable } from "@/components/shared/data-table";
import { usersColumns } from "@/data/user-table-columns";
import { useDbCollection } from "@/hooks/use-firebase-hook";
import { CollectionMap, getCollection } from "@/lib/firestoreReference";
import { DtoUserRole } from "@/types/firebase";
import React from "react";

export default function Users() {
  const usersRef = React.useMemo(() => getCollection("users"), []);

  const { data, loading } = useDbCollection<CollectionMap["users"]>(usersRef);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full">
      {data && (
        <DataTable
          columns={usersColumns}
          data={data.filter((user) => user.role !== DtoUserRole.SuperAdmin)}
        />
      )}
    </div>
  );
}
