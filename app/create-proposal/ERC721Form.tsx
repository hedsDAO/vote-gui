"use client";

import { Dialog, Transition } from "@headlessui/react";
import _ from 'lodash';
import { PlusCircle, CheckCircle, XCircle} from "@phosphor-icons/react";
import { useState, Fragment, useEffect, useContext } from "react";
import { CreateProposalContext } from "@/context/createProposal.context";

const defaultState = `{
    "symbol": "HED",
    "tokens": [
        "0x00000000000000000000",
        "0x00000000000000000000"
    ],
    "weights": [
        10, 
        8
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
  const [jsonData, setJsonData] = useState<any>("");
  const { state } = useContext(CreateProposalContext);
  const currentStrategies = state.strategy.length > 0 ? state.strategy[state.strategy.length - 1] : defaultState;
  const isDefaultStrategy = _.isEqual(currentStrategies, JSON.parse(defaultState));
  useEffect(() => {
    setJsonData(currentStrategies);

  }, [currentStrategies]);

  // Callback function to handle updates from the child component
  const handleJsonDataUpdate = (updatedJsonData: any) => {
    setJsonData(updatedJsonData);
  };
  return (
    <div
      onClick={() => setOpen(true)}
      role="button"
      className="flex cursor-pointer flex-col items-start gap-2 rounded-lg bg-white px-4 py-3 transition-all hover:bg-white/80 lg:w-[70%]"
    >
      <ERC721Modal open={open} setOpen={setOpen} onJsonDataUpdate={handleJsonDataUpdate} />
      <div className="flex w-full items-center justify-between">
        <h4 className="font-space-grotesk font-medium text-black">ERC 721</h4>
        <div className="flex flex-col items-end justify-between">
          <PlusCircle className="h-5 w-5 text-black" />
          {!isDefaultStrategy && jsonData && typeof jsonData === 'object' ? <div className="bg-green-700 rounded-full inline-flex border-transparent"><CheckCircle className="h-5 w-5 text-white" /></div> : <XCircle className="h-5 w-5 text-red-800"/>}
        </div>
      </div>
      <p className="max-w-[28ch] whitespace-pre-wrap font-space-grotesk text-sm text-black">
        Choose a set of contracts to base your voting power.
      </p>
    </div>
  );
};

const ERC721Modal = ({ open, setOpen, onJsonDataUpdate }: any) => {
  const { state, dispatch } = useContext(CreateProposalContext);
  const currentStrategies = state.strategy.length > 0 ? JSON.stringify(state.strategy[state.strategy.length - 1]) : defaultState;

  const [localJsonData, setLocalJsonData] = useState<any>(currentStrategies);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  useEffect(() => {
    setLocalJsonData(formatStrategyToJson(currentStrategies));

  }, [currentStrategies]);

  const formatStrategyToJson = (strategy: any) => {
    const parsedStrategy = typeof strategy === 'string' ? JSON.parse(strategy) : strategy;

    return JSON.stringify({
      symbol: parsedStrategy.symbol || "HED",
      tokens: parsedStrategy.tokens || ["0x00000000000000000000", "0x00000000000000000000"],
      weights: parsedStrategy.weights || [10, 8],
    }, null, 2); // The third argument (2) is for pretty-printing the JSON with 2-space indentation
  };

  const handleDoneClick = () => {
    const isValidJson = validateJson(localJsonData);
    if (!isValidJson) {
      setErrorMessage('Invalid JSON data. Please check your input and try again.');
      return; // Exit the function early if the JSON is invalid
    }
    setErrorMessage(null);

    const parsedData = isValidJson ? JSON.parse(localJsonData) : "";

    if (isValidJson) {
      dispatch({ type: 'ADD_STRATEGY', payload: [parsedData] }); // Update the context
    }

    onJsonDataUpdate(parsedData);
    setOpen(false);
  };
  

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
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                  <textarea
                    id="jsonEditor"
                    value={localJsonData}
                    onChange={(e) => {
                    //   if (validateJson(e.target.value)) {
                    //     setIsValid(true);
                    //     console.log('true')
                    //   } else {
                    //     console.log('false')
                    //     setIsValid(false);
                    //   }
                      setErrorMessage(null);
                      setLocalJsonData(e.target.value);
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
                <button
                  type="button"
                  className="inline-flex justify-start rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                  onClick={handleDoneClick}
                >
                  Done
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ERC721Form;
