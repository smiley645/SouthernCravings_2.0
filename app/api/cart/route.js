import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Cart from '@/models/Cart';

// Helper to get userId from request headers
function getUserId(request) {
  return request.headers.get('x-user-id');
}

export async function GET(request) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = { userId, items: [] };
    }
    return NextResponse.json(cart);
  } catch (error) {
    console.error('Cart GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { productId, name, nameJa = '', price, image, weight = '250g', quantity = 1 } = body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, name, nameJa, price, image, weight, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId && item.weight === weight
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, name, nameJa, price, image, weight, quantity });
      }
    }

    cart.updatedAt = new Date();
    await cart.save();
    return NextResponse.json(cart);
  } catch (error) {
    console.error('Cart POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { productId, weight = '250g', quantity } = body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId && item.weight === weight
    );

    if (!item) {
      return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => !(item.productId.toString() === productId && item.weight === weight)
      );
    } else {
      item.quantity = quantity;
    }

    cart.updatedAt = new Date();
    await cart.save();
    return NextResponse.json(cart);
  } catch (error) {
    console.error('Cart PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const weight = searchParams.get('weight') || '250g';

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    if (productId) {
      cart.items = cart.items.filter(
        (item) => !(item.productId.toString() === productId && item.weight === weight)
      );
    } else {
      cart.items = [];
    }

    cart.updatedAt = new Date();
    await cart.save();
    return NextResponse.json(cart);
  } catch (error) {
    console.error('Cart DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
