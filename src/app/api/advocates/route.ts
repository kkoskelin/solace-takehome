import { Advocate } from "@/types/Advocate";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET() {
  const selectResults = await db.select({
    id: advocates.id,
    firstName: advocates.firstName,
    lastName: advocates.lastName,
    city: advocates.city,
    degree: advocates.degree,
    specialties: advocates.specialties,
    yearsOfExperience: advocates.yearsOfExperience,
    phoneNumber: advocates.phoneNumber,
  }).from(advocates);

  const data: Advocate[] = selectResults.map(row => ({
    ...row,
    specialties: row.specialties as string[],
  })) ?? [];

  return Response.json({ data });
}
