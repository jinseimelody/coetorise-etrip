import {helper, http_status, ticket_status} from '~/common';
import {orm} from '~/config';
import {cancelJob} from '~/config/kue';

const prisma = orm.getInstace();
const PaymentService = {};

const COETORISE_WALLET = 1;

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
    if (paymentMethod) {
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
