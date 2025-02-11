
const PersonalDataPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 text-center p-6 min-h-[90svh]">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md min-h-60 flex flex-col justify-between">
        <h1 className="text-2xl text-green-600 uppercase font-anton">Registration Complete!</h1>
        <p>A confirmation has been sent to your registered email</p>
        <p className="mt-4 text-sm text-gray-500">
          Keep an eye on your email for updates!
        </p>
      </div>
    </div>
  );
}

export default PersonalDataPage