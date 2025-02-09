
const PersonalDataPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 text-center p-6 min-h-[90svh]">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md ">
        <h1 className="text-2xl text-green-600 uppercase font-anton">Registration Complete!</h1>
        <p>A confirmation has been sent to your registered email</p>
        <p className="font-semibold mt-10">You will be notified upon selection.</p>
        <p className="mt-2 mb-10 text-gray-700 font-medium">
          Once selected, you&apos;ll need to pay the registration fee to confirm your participation.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Keep an eye on your email for updates!
        </p>
      </div>
    </div>
  );
}

export default PersonalDataPage