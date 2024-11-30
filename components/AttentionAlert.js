import React from "react";

const AttentionAlert3 = ({ text }) => {
  return (
    <div className=" absolute left-[40%] top-0 z-10 ">
      <div className="container flex justify-center text-nowrap">
        <div className="border-l-yellow dark:bg-dark-2 flex max-w-[655px] items-center rounded-md border-l-[6px] bg-white p-5 pl-6 ">
          <div className="bg-yellow mr-5 flex h-[36px] w-full max-w-[36px] items-center justify-center rounded-full">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0156 11.6156L10.9969 1.93125C10.5188 1.28437 9.78752 0.918747 9.00002 0.918747C8.18439 0.918747 7.45314 1.28437 7.00314 1.93125L0.984395 11.6156C0.421895 12.375 0.33752 13.3594 0.759395 14.2031C1.18127 15.0469 2.02502 15.5812 2.98127 15.5812H15.0188C15.975 15.5812 16.8188 15.0469 17.2406 14.2031C17.6625 13.3875 17.5781 12.375 17.0156 11.6156ZM16.1156 13.6406C15.8906 14.0625 15.4969 14.3156 15.0188 14.3156H2.98127C2.50315 14.3156 2.10939 14.0625 1.88439 13.6406C1.68752 13.2187 1.71564 12.7406 1.99689 12.375L8.01564 2.69062C8.24064 2.38125 8.60627 2.18437 9.00002 2.18437C9.39377 2.18437 9.75939 2.35312 9.9844 2.69062L16.0031 12.375C16.2844 12.7406 16.3125 13.2187 16.1156 13.6406Z"
                fill="black"
              />
              <path
                d="M8.9999 6.15001C8.6624 6.15001 8.35303 6.43126 8.35303 6.79688V9.86251C8.35303 10.2 8.63428 10.5094 8.9999 10.5094C9.36553 10.5094 9.64678 10.2281 9.64678 9.86251V6.76876C9.64678 6.43126 9.3374 6.15001 8.9999 6.15001Z"
                fill="black"
              />
              <path
                d="M8.9999 11.25C8.6624 11.25 8.35303 11.5313 8.35303 11.8969V12.0375C8.35303 12.375 8.63428 12.6844 8.9999 12.6844C9.36553 12.6844 9.64678 12.4031 9.64678 12.0375V11.8688C9.64678 11.5313 9.3374 11.25 8.9999 11.25Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="flex items-center justify-between w-full px-6">
            <div>
              <h3 className="mb-1 text-lg font-medium text-black">
                Opps! something went wrong
              </h3>
              <p className="text-sm text-black">{text}</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttentionAlert3;
