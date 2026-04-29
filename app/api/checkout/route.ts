import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { error: "Missing STRIPE_SECRET_KEY" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secretKey);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1T9N0AQfqMSPss50CsHDXPB9",
        quantity: 1,
      },
    ],
    success_url: "https://italian-paris-club-x61o.vercel.app/success",
    cancel_url: "https://italian-paris-club-x61o.vercel.app/cancel",
  });

  return NextResponse.json({ url: session.url });
}