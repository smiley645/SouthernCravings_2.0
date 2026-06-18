import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q || q.trim().length < 1) {
      return NextResponse.json([]);
    }

    await dbConnect();

    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { nameJa: { $regex: q, $options: 'i' } },
        { stateName: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { descriptionJa: { $regex: q, $options: 'i' } },
      ],
    }).limit(10);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
