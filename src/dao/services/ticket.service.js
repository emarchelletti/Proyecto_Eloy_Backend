import ticketModel from "../models/ticket.model.js";
import {generateUniqueCode} from "../../utils/utils.js";

export const generateTicket = async (purchaser, amount) => {
  try {
    const code = generateUniqueCode();

    const ticket = new ticketModel({
      code,
      amount,
      purchaser,
    });

    const savedTicket = await ticket.save();
    return savedTicket;
  } catch (error) {
    throw new Error(`Error al generar el ticket: ${error.message}`);
  }
};
