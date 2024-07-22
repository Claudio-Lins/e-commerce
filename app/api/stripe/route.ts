import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  if (!signature) {
    console.error("Stripe-Signature header is missing -- Line 12");
    return new Response("Missing Stripe-Signature", {
      status: 400,
    });
  } else {
    console.log(`Received a webhook event -- Line 17`);
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (error: unknown) {
    console.error("Error verifying webhook signature:", error);
    return new Response("Webhook Error", {
      status: 400,
    });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      await prisma.order.create({
        data: {
          amount: session.amount_total as number,
          status: session.status as string,
          userId: session.metadata?.userId,
        },
      });
      await redis.del(`cart-${session.metadata?.userId}`);
      break;
    }
    default: {
      console.log(`Unhandled event type: ${event.type}`);
    }
  }

  return new Response("Event Received", {
    status: 200,
  });
}
