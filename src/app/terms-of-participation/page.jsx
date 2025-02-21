import React from 'react';

const TermsPage = () => {
  return (
    <div className='md:px-60 px-10 py-20'>
      <h1 className='font-anton text-4xl'>Terms of Participation</h1>
      <p className='font-assistant mt-5 text-lg'>
        By entering and participating in this Promotional event as outlined hereunder (the “Event”, or “Promotion”), you (“You”) agree to be bound by these Terms of Participation consisting of (i) the Event Overview, (ii) the Participation Criteria and any other applicable rules of conduct, (the “Terms”). You represent that you satisfy all of the eligibility requirements below. This Event is subject to these Terms, Conditions and to all applicable rules and regulations.
      </p>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>(i) Event Overview</h2>
      <p className='font-assistant mt-5 text-lg'>
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
      
      <h2 className='font-assistant font-semibold mt-10 text-2xl'>(ii) Cancellations and Refund of Participation Fee</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>Participation fee cancellations and refund will only be entertained in case of any emergencies or sensible reasoning. To process any cancellations, you are required to email us at <a href="maito:streetjam@minu01.com">streetjam@minu01.com</a></li>
        <li>Refunds for cancellations will be processed in accordance with the organisers' terms.</li>
      </ul>
      <p className='mt-5'>To know more, please visit <a className=' underline' href="https://participate.minus01.com/cancellations-and-refund">Cancellations and Refund</a> page.</p>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>(iii) Rules of Conduct</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>Participants must adhere to fair play and sportsmanship at all times.</li>
        <li>Any form of misconduct, unsportsmanlike behaviour, or breach of the rules may result in penalties or disqualification.</li>
        <li>The use of prohibited substances within event accommodations is strictly forbidden.</li>
        <li>Participants must follow all instructions issued by event officials and organisers.</li>
        <li>The organisers reserve the right to modify the rules at their discretion. In case of any changes, the participants will be notified via email.</li>
      </ul>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>(iv) Health and Safety</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>Participants are strongly advised to wear appropriate safety gear.</li>
        <li>A physiotherapist and ambulance services will be available at the event.</li>
        <li>Participants are fully responsible for their own health and safety.</li>
        <li>The organisers will not be held liable for any injuries sustained during participation in the event.</li>
      </ul>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>(v) Equipment and Apparel</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>Participants must bring their own equipment and safety gear, as none will be provided by the organisers.</li>
        <li>To maintain the event’s branding as a promotional initiative for Minus01, all participants are required to adhere to specific apparel guidelines. Participants must either wear clothing that visibly features the Minus01 name or opt for attire that does not display any prominent brand logos (e.g., Adidas, Nike, Vans, etc). This ensures a cohesive visual identity for the event while maintaining focus on the Minus01 brand. Accessories, footwear, and equipment are exempt from this requirement, provided they do not prominently showcase competing brand logos.</li>
      </ul>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>(vi) Liability and Waiver</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>All participants must sign a waiver before performing/competing.</li>
        <li>The organisers will not be responsible for any injuries sustained during the event.</li>
        <li>The organisers are not liable for theft or loss of personal belongings.</li>
      </ul>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>(vii) Media and Intellectual Property</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>The event will be covered by media.</li>
        <li>By participating, individuals grant Minus01 the irrevocable right to capture, use, and distribute images, videos, and other media content featuring participants for promotional and marketing purposes.</li>
      </ul>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>(viii) Prizes and Awards</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>Outstanding performers and content creators will receive appropriate gratification as determined by the organisers during the event.</li>
      </ul>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>(ix) Dispute Resolution</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>Any disputes arising from participation in the event will be resolved by the organisers.</li>
        <li>The decision of the organisers will be final and binding in all matters.</li>
      </ul>

      <p className='font-assistant mt-10 text-xl'>
        For further enquiries, please contact <a href="mailto:streetjam@minus01.com" className='text-blue-500'>streetjam@minus01.com</a>.
      </p>
    </div>
  );
};

export default TermsPage;