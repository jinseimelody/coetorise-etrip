import {http_status, validationSchema} from '~/common';
import PaymentService from '~/services/payment.service';

const schema = validationSchema.payment;
const PaymentController = {};

PaymentController.pay = async (req, res) => {
  const {paymentMethod, ticketId, sessionId} = req.body;
  const validation = schema.pay.validate(req.body);
  if (validation.error) throw validation.error;

  const userId = 1;
  await PaymentService.pay(paymentMethod, ticketId, sessionId, userId);

  return res.json({status: http_status.ok});
};

export default PaymentController;
