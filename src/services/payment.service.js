import {helper, http_status, ticket_status} from '~/common';
import {orm} from '~/config';
import {cancelJob} from '~/config/kue';
import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51Lg4xQETyoSpWwFkahh4Hu0g5eBuTkhFXvDa3GmaHORWZKDd03zGsUIYW5R4Y5C8mUOhfxTtHcijOYwJA7rM8Nwx00bsiF0wo7'
);
const prisma = orm.getInstance();
const PaymentService = {};

const COETORISE_WALLET = 1;
const STRIPE = 2;

PaymentService.pay = async (paymentMethod, ticketId, sessionId, userId) => {
  if (![COETORISE_WALLET].includes(paymentMethod))
    throw helper.http.createError(http_status.not_found, `Payment method not supported`);

  await prisma.$transaction(async pris => {
    // find ticket in database
    const ticket = await pris.ticket.findUnique({
      where: {id: ticketId}
    });

    if (!ticket) throw helper.http.createError(http_status.not_found, `ticket not found`);
    const {total} = ticket;

    // process payment
    let isPaymentSuccessful = false;
    if (COETORISE_WALLET === paymentMethod) {
      const wallet = await pris.coetoriseWallet.findUnique({
        where: {userId: userId}
      });
      if (!wallet)
        throw helper.http.createError(
          http_status.not_found,
          'Payment failure: wallet not found'
        );

      const {balance, systemPoint} = wallet;
      if (balance < total)
        throw helper.http.createError(
          http_status.not_found,
          'Payment failure: not enough money'
        );

      await pris.coetoriseWallet.update({
        where: {userId: userId},
        data: {balance: balance - total, systemPoint: systemPoint + 1}
      });

      isPaymentSuccessful = true;
    }

    if (STRIPE === paymentMethod) {
      const calculateOrderAmount = 1;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: () => calculateOrderAmount,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true
        }
      });
    }

    if (!isPaymentSuccessful)
      throw helper.http.createError(http_status.not_modified, `payment failure`);

    await pris.ticket.update({
      where: {id: ticketId},
      data: {
        status: ticket_status.paid
      }
    });

    // remove job
    cancelJob(Number(sessionId));
  });
};

export default PaymentService;
