import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY mancante su Vercel" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);

    const origin =
      req.headers.get("origin") ||
      "https://italian-paris-club-x61o-mxlt3rmxr-mechecs-projects.vercel.app";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: "price_1T9N0AQfqMSPss50CsHDXPB9",
          quantity: 1,
        },
      ],
      success_url: `${origin}/card`,
      cancel_url: `${origin}/card`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Stripe checkout error" },
      { status: 500 }
    );
  }
}