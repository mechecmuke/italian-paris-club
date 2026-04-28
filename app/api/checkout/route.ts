import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: "price_1T9N0AQfqMSPss50CsHDXPB9",
        quantity: 1,
      },
    ],
    success_url:
      "https://italian-paris-club-x61o-mxlt3rmxr-mechecs-projects.vercel.app/success",
    cancel_url:
      "https://italian-paris-club-x61o-mxlt3rmxr-mechecs-projects.vercel.app/cancel",
  });

  return NextResponse.json({ url: session.url });
}