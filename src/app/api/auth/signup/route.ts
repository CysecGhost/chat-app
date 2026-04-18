import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }

  // connect to db
  await connectDB();

  // check if user already exists
  const exists = await User.findOne({ email });

  if (exists)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  // hash password
  const hash = await bcrypt.hash(password, 10);

  // create new user
  const user = await User.create({
    name,
    email,
    password: hash,
  });

  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 },
  );
};
