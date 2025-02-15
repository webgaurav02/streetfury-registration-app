import React from 'react';

const TermsPage = () => {
  return (
    <div className='md:px-60 px-10 py-20'>
      <h1 className='font-anton text-4xl'>Terms of Participation</h1>
      <p className='font-assistant mt-5 text-xl'>
        By entering and participating in this Promotional event as outlined hereunder (the “Event”, or “Promotion”), you (“You”) agree to be bound by these Terms of Participation consisting of (i) the Event Overview, (ii) the Participation Criteria and any other applicable rules of conduct, (the “Terms”). You represent that you satisfy all of the eligibility requirements below. This Event is subject to these Terms, Conditions and to all applicable rules and regulations.
      </p>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>(i) Event Overview</h2>
      <p className='font-assistant mt-5 text-xl'>
        MINUS01 STREETJAM at North-Eastern Hill University (NEHU), Shillong, Meghalaya, on 5th April, 2025 is a pioneering platform designed to elevate alternate sports through creativity and digital engagement. Moving beyond traditional competition, the event emphasises a Massive Content Pool, enabling MTB, BMX, and skateboarding enthusiasts from across India to showcase their skills through high-impact content. This approach maximises visibility and outreach by aligning with contemporary content consumption trends. Adding an intriguing twist, the Classroom Edition will be revealed in detail during the event, introducing an unexpected element to enhance the overall experience.
      </p>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>(ii) Participation Criteria</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>Participants must be between 16 and 30 years of age.</li>
        <li>Open to all genders.</li>
        <li>While no specific skill level is required, participants must have a basic proficiency in the sport.</li>
        <li>Social media presence will be considered in evaluation.</li>
        <li>Out of all entries submitted, only 150 participants will qualify for the final event.</li>
        <li>Once selected, a participation fee of ₹579 is required to complete the registration process for the event.</li>
        <li>If any of the 150 selected participants cancel their registration, individuals who are waitlisted will be invited to participate thereafter and will be notified accordingly via email.</li>
      </ul>

      <p className='font-assistant mt-10 text-xl'>
        For further enquiries, please contact <a href="mailto:streetjam@seven01.com" className='text-blue-500'>streetjam@seven01.com</a>.
      </p>
    </div>
  );
};

export default TermsPage;