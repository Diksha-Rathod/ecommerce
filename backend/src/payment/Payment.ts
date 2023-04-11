import { getRepository } from "typeorm";
import HttpConstant from "../constant/httpConstant";
import { User } from "../entity/user";
import userService from "../service/userService";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
class Card {
  async createCard(req, res) {
    const userdata = await getRepository(User).findOne({
      where: { id: req.user.id },
    });

    if (userdata.stripeCustomerId) {
      const token = await stripe.tokens.create({
        card: {
          number: req.body.number,
          exp_month: req.body.month,
          exp_year: req.body.year,
          cvc: req.body.cvv,
        },
      });

      const card = await stripe.customers.createSource(
        userdata.stripeCustomerId,
        { source: token.id }
      );
    } else {
      const customer = await stripe.customers.create({
        name: userdata.fullName,
        email: userdata.email,
      });

      const token = await stripe.tokens.create({
        card: {
          number: req.body.number,
          exp_month: req.body.month,
          exp_year: req.body.year,
          cvc: req.body.cvv,
        },
      });

      const card = await stripe.customers.createSource(customer.id, {
        source: token.id,
      });

      const data = await userService.updateUser(userdata.id, customer);
      return res.status(HttpConstant.HTTP_CREATED).json({
        data,
        status: true,
        message: "user payment details added ...!",
      });
    }
  }

  async getcard(req, res) {
    const userdata = await getRepository(User).findOne({
      where: { id: req.user.id },
    });

    const cards = await stripe.customers.listSources(
      userdata.stripeCustomerId,
      { object: "card", limit: 3 }
    );

    return res.json({ cards, message: "In  card" });
  }

  async makePayment(req, res) {
    const userdata = await getRepository(User).findOne({
      where: { id: req.user.id },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: req.body.cardId,
      amount: req.body.amount * 100,
      currency: "inr",
      customer: userdata.stripeCustomerId,
      confirm: true,
      payment_method_types: ["card"],
      statement_descriptor: "Custom descriptor",
    });

    return res.json(paymentIntent);
  }
}

let card = new Card();
export default card;
