const express = require('express');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Replace with your secret key
const {verifyToken} = require("../middleware/authToken");
const { sendVerificationEmail, sendReciptEmail } = require('../utils/verifyemail');
const courseDetails = require('../models/course.model');
const userDetails = require('../models/UserDetails..model');
const payment = require('../models/Payments.model');
const router = express.Router();
router.post('/create-checkout-session', verifyToken, async (req, res) => {
  try {
    const { price,course } = req.body;
    console.log(course);
    
    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name:"course",  // Use course details here
            },
            unit_amount: price * 100,  // Stripe requires the amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}&courseId=${course}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    // Send session ID to the client
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});


router.get('/checkout-session/:sessionId', async (req, res) => {
    try {
      const userId = req.userId
      const {courseId} = req.query
      console.log("hi da")
      const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
      res.json(session);
      // console.log(session);
      const data = await courseDetails.findOne({_id:courseId})
      const data1 = await userDetails.findOne({userId})
      if(data.boughtBy.includes(userId)){
        return
      }else{
        data.boughtBy.push(userId)
        data1.myCourses.push(courseId)
        await data.save()
        await data1.save()
      }
      const PaymentData = {
          userId,
          courseId,
          sessionId: session.id,
          paymentIntentId: session.payment_intent,
          amount: session.amount_total / 100, 
          currency: session.currency,
          paymentStatus: session.payment_status,
        
      }
      
      await payment.create(PaymentData)
      await sendReciptEmail(session.customer_details.name,session.customer_details.email,session.id,session.amount_total)
      
    } catch (error) {
      console.error("Error retrieving session:", error);
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports=router