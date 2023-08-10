"use client";

import { Dialog, Transition } from "@headlessui/react";
import { PlusCircle } from "@phosphor-icons/react";
import { useState, Fragment, useEffect } from "react";

const defaultState = `{
    "symbol": "HED",
    "addresses": [
        "0x00000000000000000000",
        "0x00000000000000000000",
        "0x00000000000000000000",
        "0x00000000000000000000"
    ],
    "weights": [
        10, 
        8, 
        7, 
        4
    ]
}
`;

const validateJson = (json: string) => {
  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
};

const ERC721Form = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(true)}
      role="button"
      className="flex cursor-pointer flex-col items-start gap-2 rounded-lg bg-white px-4 py-3 transition-all hover:bg-white/80 lg:w-[70%]"
    >
      <ERC721Modal open={open} setOpen={setOpen} />
      <div className="flex w-full items-center justify-between">
        <h4 className="font-space-grotesk font-medium text-black">ERC 721</h4>
        <PlusCircle className="h-5 w-5 text-black" />
      </div>
      <p className="max-w-[28ch] whitespace-pre-wrap font-space-grotesk text-sm text-black">
        Choose a set of contracts to base your voting power.
      </p>
    </div>
  );
};

const ERC721Modal = ({ open, setOpen }: any) => {
  const [jsonData, setJsonData] = useState<any>(defaultState);
//   const [isValid, setIsValid] = useState(false);

//   useEffect(() => {
//     if (!isValid) {
//       setTimeout(() => {
//         setIsValid(false);
//       }, 2000);
//     }
//   }, [isValid]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <textarea
                    id="jsonEditor"
                    value={jsonData}
                    onChange={(e) => {
                    //   if (validateJson(e.target.value)) {
                    //     setIsValid(true);
                    //     console.log('true')
                    //   } else {
                    //     console.log('false')
                    //     setIsValid(false);
                    //   }
                      setJsonData(e.target.value);
                    }}
                    className={
                    //   `${isValid ? "border-green-500 transition-all" : "border-red-500 transition-all"}` +
                      "mt-2 w-full rounded-md border bg-black/90 p-2 text-white shadow-sm focus:border-blue-300 focus:ring focus:ring-opacity-50"
                    }
                    style={{
                      fontFamily: "monospace",
                      whiteSpace: "pre",
                      overflowX: "scroll",
                    }} // Styling to make it look like code
                    rows={10} // adjust based on how big you want the textarea
                    placeholder="Enter your JSON data here..."
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ERC721Form;
