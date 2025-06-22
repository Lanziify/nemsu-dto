import { seedFakeRequest } from "@/lib/init";
import { NextResponse } from "next/server";

export async function GET() {
	const result = seedFakeRequest();
	return NextResponse.json({ result });
}
