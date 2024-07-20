/**
 * Author: Keyur Pradipbhai Khant (B00935171), Riyaben Pareshkumar Patel (B00926204)
 */
import React, { useState } from 'react';
import SectionTitle from '../../components/Landing/SectionTitle';

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: 'How do I sign up for a user account?',
    answer: `Signing up is easy and only takes a few minutes! Navigate to our signup page via the top navigation bar and fill out the registration form. You'll need to provide a valid email address, create a password, and agree to our terms and conditions. Once submitted, you'll receive an email to confirm your account. Simply click the link in the email, and you're all set to explore our platform!`,
  },
  {
    question: 'What should I do if I forget my password?',
    answer: `Don't worry if you've forgotten your password; it happens to the best of us. Just click on the "Forgot Password" link on the login page, and enter the email address you used to sign up. We'll send you an email with a link to reset your password. For your security, the link will expire in 24 hours, so be sure to use it as soon as possible. If you encounter any issues, our support team is here to help.`,
  },
  {
    question: 'How can I update my profile information?',
    answer: `Updating your profile information is straightforward. Once logged in, navigate to the "My Profile" section accessible from your dashboard. Here, you can edit various details such as your name, profile picture, contact information, and more. Remember to save your changes before exiting. Keeping your profile up-to-date ensures a personalized and engaging experience on our platform.`,
  },
  {
    question: 'How do I create an event?',
    answer: `Creating an event is a breeze with our intuitive event management system. Simply head over to the "Create Event" section after logging in. You'll be prompted to fill out the event details, including the name, date, location, and description. You can also upload images and specify categories to help attendees find your event more easily. Once you've filled everything out, hit the "Submit" button, and your event will go live after a quick review!`,
  },
  {
    question: `Can I cancel an event I've created?`,
    answer: `Yes, you have the flexibility to cancel any event you've created. To do so, navigate to your event management dashboard, select the event you wish to cancel, and click on the "Cancel Event" option. Please be aware that canceling an event may affect your reputation score on our platform, and be sure to review our refund policy to understand the implications for your attendees.`,
  },
  {
    question: 'How do attendees register for events?',
    answer: `Attendees can easily register for events by visiting the event's page and clicking on the "Register" button. They'll be prompted to enter their details and choose their preferred payment method if the event requires a fee. Upon successful registration, attendees will receive a confirmation email with their ticket and any additional information about the event. We've streamlined the process to ensure a smooth and hassle-free registration experience.`,
  },
  {
    question: 'What payment methods are accepted for ticket purchases?',
    answer: `We aim to make transactions on our platform as convenient as possible. Therefore, we accept a wide range of payment methods, including major credit cards (Visa, MasterCard, American Express), PayPal, and other digital wallets. Our payment gateway is secured with the latest encryption technology to ensure that your financial information is protected.`,
  },
  {
    question: `How can I view events I'm interested in?`,
    answer: `Discovering events that match your interests is easy on our platform. Use our advanced search and filter options to narrow down your choices by category, location, date, and more. You can also set preferences in your profile to receive personalized event recommendations. Whether you're into music festivals, tech conferences, or cooking classes, finding events that excite you is just a few clicks away.`,
  },
  {
    question: `Is there a way to track the events I've attended?`,
    answer: `Absolutely! We understand the importance of keeping track of the events you've experienced. Your user profile includes a "My Events" section where you can view a history of all the events you've registered for and attended. This feature makes it easy to revisit past events, download any event materials, and provide feedback to event organizers.`,
  },
];


const FAQPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-5">
      <SectionTitle title="Frequently Asked Questions" />
      <div className="space-y-4 my-5">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} />
        ))}
      </div>
    </div>
  );
};

type FAQItemProps = {
  faq: FAQ;
};

const FAQItem: React.FC<FAQItemProps> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left p-4 rounded-md ${isOpen ? 'bg-button-primary text-white' : 'bg-blue-200 text-blue-900'} transition duration-300 ease-in-out shadow-md hover:bg-button-primary hover:text-white focus:outline-none`}
      >
        {faq.question}
      </button>

      {isOpen && (
        <div className="p-4 bg-blue-100 text-blue-900 rounded-md mt-2 shadow">
          {faq.answer}
        </div>
      )}
    </div>
  );
};

export default FAQPage;
