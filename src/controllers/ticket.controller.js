import {validationSchema} from '~/common';
import TicketService from '~/services/ticket.service';

const schema = validationSchema.booking;
const TicketController = {};

TicketController.search = async (req, res) => {
  const userId = 1;
  const history = await TicketService.search({userId: userId});
  return res.json(history);
};

TicketController.getOne = async (req, res) => {
  const userId = 1;
  const {ticketId} = req.params;
  const validation = schema.getOne.validate(req.params);
  if (validation.error) throw validation.error;

  const ticket = await TicketService.search({userId: userId, ticketId: ticketId});
  return res.json(ticket.length > 0 ? ticket[0] : null);
};

export default TicketController;
