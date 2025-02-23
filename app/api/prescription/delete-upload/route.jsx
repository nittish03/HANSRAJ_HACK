import { prismaDB } from "@/lib/prismaDB";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { id } = await req.json(); // Parse request body correctly
    const file = await prismaDB.pdfDetails.findUnique({ where: { id } });

    if (!file) {
      return NextResponse.json({ success: false, message: "File not found", status: 404 });
    }

    // Extract Cloudinary public_id from the stored URL
    const publicId = file.pdf.split("/").pop().split(".")[0]; // Extracts file ID from Cloudinary URL

    // Delete file from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Remove file entry from database
    await prismaDB.pdfDetails.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "File deleted", status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ success: false, message: "Error deleting file", status: 500 });
  }
}
