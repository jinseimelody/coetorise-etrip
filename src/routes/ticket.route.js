import express from 'express';
import TicketController from '~/controllers/ticket.controller';
import {use} from '~/middleware';

const router = express.Router();

router.get('/', use(TicketController.search));

router.get('/:ticketId', use(TicketController.getOne));

export default router;
