import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className='md:px-60 px-10 py-20'>
      <h1 className='font-anton text-4xl'>Privacy Policy</h1>
      <p className='font-assistant mt-5 text-sm'>
        Last Updated: February 7, 2025
      </p>
      <p className='font-assistant mt-5 text-xl'>
         MINUS01 STREETJAM respects your privacy and is committed to protecting the personal information you provide while using our platform. This Privacy Policy outlines how we collect, use, share, and safeguard your information in accordance with applicable Indian data protection laws.
      </p>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>1. Interpretation and Definitions</h2>
      <p className='font-assistant mt-5 text-xl'>
        References to "We," "Us," and "Our" refer to MINUS01 STREETJAM. "You" refers to the user accessing our platform.
      </p>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>2. Collecting and Using Your Personal Data</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>Personal data includes name, email, phone number, social media usernames, and payment details.</li>
        <li>Usage data includes IP address, browser type, device details, and site interactions.</li>
        <li>Sensitive personal data is collected only with explicit consent, including financial information and biometric data.</li>
      </ul>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>3. How We Use Your Personal Data</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>To provide and improve our services.</li>
        <li>To manage accounts and process transactions securely.</li>
        <li>To communicate important updates and event-related information.</li>
        <li>To comply with legal obligations and security measures.</li>
      </ul>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>4. Sharing Your Personal Data</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>We do not sell or rent your data.</li>
        <li>Data may be shared with service providers, legal authorities, and affiliates when necessary.</li>
        <li>Third-party sharing occurs only with your explicit consent.</li>
      </ul>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>5. Cookies and Tracking Technologies</h2>
      <p className='font-assistant mt-5 text-xl'>
        We use cookies to enhance functionality and track website usage. You may adjust cookie settings in your browser.
      </p>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>6. Data Security and Retention</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>We implement security measures to protect your data.</li>
        <li>Data is retained only for as long as necessary for its intended purpose.</li>
      </ul>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>7. Your Rights Under Indian Law</h2>
      <ul className='list-disc space-y-5 mt-5 pl-5'>
        <li>Right to access your personal data.</li>
        <li>Right to request corrections or deletion.</li>
        <li>Right to withdraw consent for data processing.</li>
      </ul>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>8. Children's Privacy</h2>
      <p className='font-assistant mt-5 text-xl'>
        Our services are not intended for children under 16 without parental supervision.
      </p>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>9. Third-Party Links</h2>
      <p className='font-assistant mt-5 text-xl'>
        We are not responsible for third-party websites linked from our platform. Please review their privacy policies before use.
      </p>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>10. Changes to This Privacy Policy</h2>
      <p className='font-assistant mt-5 text-xl'>
        We may update this policy at any time. Continued use of our services signifies acceptance of any changes.
      </p>

      <h2 className='font-assistant font-semibold mt-10 text-2xl'>11. Contact Us</h2>
      <p className='font-assistant mt-5 text-xl'>
        For questions or concerns, contact us at <a href="mailto:streetjam@seven01.com" className='text-blue-500'>streetjam@seven01.com</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
