import { NextResponse, NextRequest } from 'next/server'

export async function GET(request) {
    try {
        return NextResponse.json({ message: 'Hello World' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
