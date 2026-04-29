import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  "https://guamgznhixndshmzlttt.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook error:", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  // ✅ PAGAMENTO COMPLETATO
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session.customer_email;

    if (email) {
      await supabase.from("memberships").upsert({
        email,
        active: true,
      });
    }
  }

  // ❌ ABBONAMENTO CANCELLATO
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;

    const customer = await stripe.customers.retrieve(
      subscription.customer as string
    );

    if (customer && !("deleted" in customer)) {
      const email = customer.email;

      if (email) {
        await supabase
          .from("memberships")
          .update({ active: false })
          .eq("email", email);
      }
    }
  }

  return NextResponse.json({ received: true });
}