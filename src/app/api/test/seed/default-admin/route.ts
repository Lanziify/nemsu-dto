import { seedDefaultAdmin } from "@/lib/init";
import { NextResponse } from "next/server";

export async function GET() {
    const result = seedDefaultAdmin();
    return NextResponse.json({ result });
}
