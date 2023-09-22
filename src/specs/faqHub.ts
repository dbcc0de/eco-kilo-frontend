import Faq from "../models/Faq";

const allFaqs: Faq[] = [
  {
    question: "What is a watt?",
    answer:
      "A watt is a unit of power. It is the amount of energy an item needs to function; the rate at which energy is consumed. One watt is equivalent to electricity flowing at a rate of one joule (unit of energy) per second.",
  },
  {
    question: "What does kWh mean?",
    answer:
      "Residential electricity usage is measured in kilowatt-hours (kWh). One kilowatt-hour (1 kWh) is equal to the amount of energy you would use if you kept a single 1,000-watt appliance running for one hour.",
  },
  {
    question: "What is a utility rate?",
    answer:
      "Utility Rate means the total amount charged by the applicable utility provider for the utility and billing period in question, divided by the total quantity of such utility consumed during such billing period.",
  },
  {
    question: "What is peak rate?",
    answer:
      "Electricity costs significantly more to provide during peak demand times, typically business days from 2 p.m. to 6 p.m. in the summer, on hot, humid days when AC use is highest. Conversely, electricity costs drop during nights and weekends when demand is lower. Peak rate and off-peak rate reflect these varying costs and allow you the opportunity to significantly lower your costs by moving your energy use to times when costs are low.",
  },
  {
    question: "What is off-peak rate?",
    answer:
      " Off-peak hours are when electricity demand and consumption are at their lowest. With that, off-peak hours are also when electricity prices are the cheapest.Off-peak electricity hours typically happen around 10am to 5pm and 9pm to 6am, the times when people are out of the house or asleep. Saturdays and Sundays typically count as off-peak periods no matter the season.",
  },
  {
    question: "What is the difference in cost between peak and off-peak rates?",
    answer:
      "An average off-peak hourly rate is 15.45¢ per kWh. Conversely, an average peak hourly rate during the warmer summer months of June-September have an average of 20.98¢ per kWh while the cooler months of October-May have an average peak hourly rate of 16.75¢ per kWh.",
  },
];

export default allFaqs;
