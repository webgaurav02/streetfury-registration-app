import React from 'react';

const CancellationsRefundPage = () => {
  return (
    <div className='md:px-60 px-10 py-20'>
      <h1 className='font-anton text-4xl'>Cancellations and Refund</h1>
      
      <h2 className='font-assistant font-semibold mt-10 text-2xl'>Eligibility for Cancellations & Refunds</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>Cancellations will only be considered in cases of emergencies or reasonable justifications deemed valid by the organisers.</li>
        <li>Requests made without a sensible reason may not be entertained.</li>
        <li>Requests for cancellation will only be entertained within 2-3 days from the date of selection.</li>
      </ul>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>Cancellation Request Process</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>To initiate a cancellation, participants must send an email to <a href="mailto:streetjam@minus01.com" className='text-blue-500'>streetjam@minus01.com</a>.</li>
        <li>The email should include:
          <ul className='list-disc pl-5 space-y-2'>
            <li>Full name of the participant</li>
            <li>Registration number/ID</li>
            <li>Reason for cancellation</li>
            <li>Payment details (e.g., UPI ID, Bank details, etc.)</li>
            <li>Any additional documents (if required)</li>
          </ul>
        </li>
      </ul>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>Refund Processing</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>Refunds will be processed in accordance with the organisers’ terms and conditions.</li>
        <li>Refunds are applicable only on the amount paid at the time of registration.</li>
        <li>Any applicable deductions such as platform fee and GST charges may apply.</li>
        <li>The exact refund amount and timeline will be determined based on these terms.</li>
      </ul>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>Important Notes</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>The organisers hold the right to approve or decline cancellation requests based on the provided reasoning.</li>
        <li>Refunds, if granted, will be processed within a reasonable timeframe.</li>
        <li>For further enquiries, participants can contact the organisers via the provided email ID.</li>
      </ul>
    </div>
  );
};

export default CancellationsRefundPage;