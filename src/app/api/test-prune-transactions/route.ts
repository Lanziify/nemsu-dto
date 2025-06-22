import { pruneTransaction } from "@/lib/init";
import { NextResponse } from "next/server";

export async function GET() {
	const result = pruneTransaction();
	return NextResponse.json({ result });
}
