import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import { generateToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const users = await query(
      "SELECT * FROM admins WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = users[0];

    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = generateToken(user);
    const res = NextResponse.json({ message: "Login successful" });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return res;

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}