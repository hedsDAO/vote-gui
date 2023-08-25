"use client";
import { Transition, Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Fragment, useState } from "react";
import { createClient } from "hedsvote";
import { useWalletClient } from "wagmi";

const DeleteProposalModal = ({
  isOpen,
  setIsOpen,
  proposal,
  slug,
  id
}: {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  proposal: any;
  slug: string;
  id:string
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const {deleteProposal} = createClient();
  const signer = useWalletClient().data;
  const router = useRouter();
  // console.log(proposal);

  // delete function
  const handleDelete = async () => {
    if(!signer) return;
    await deleteProposal(signer,slug,id);
    setIsOpen(false);
    router.push(`/${slug}`)
  };
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
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
          <div className="flex min-h-full w-full min-w-full items-center justify-center p-0 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-[90%] transform overflow-hidden rounded-lg bg-heds-bg px-6 py-4 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                <div className="flex flex-col gap-4">
                  <p className="font-space-grotesk text-white">
                    Delete Proposal
                  </p>
                  <div className="flex gap-2">
                    <Image
                      src={proposal?.cover}
                      alt="cover"
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col">
                      <p className="font-space-grotesk text-sm text-white">
                        {proposal?.title}
                      </p>
                      <p className="font-space-grotesk text-xs text-white/60">
                        {proposal?.description?.slice(0, 30) + "..."}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4 rounded-lg bg-h-black-800 px-2 py-6">
                    <div>
                      <p className="px-10 text-center font-space-grotesk text-xs text-white">
                        Deleting a proposal will also delete all of its choices
                        and votes. There is no way to undo this action.
                      </p>
                    </div>
                    <div className="relative flex items-center">
                      <div className="flex h-6 items-center">
                        <input
                          id="comments"
                          aria-describedby="comments-description"
                          name="comments"
                          type="checkbox"
                          onChange={() => setIsChecked(!isChecked)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label
                          htmlFor="comments"
                          className="font-space-grotesk text-xs text-red-500"
                        >
                          I understand that this action is irreversible.
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-h-black rounded-md bg-h-black-800/80 px-3 py-1 text-xs text-white/80 transition-all ease-in-out hover:text-white"
                    >
                      back
                    </button>
                    <button
                      onClick={() => handleDelete()}
                      className="rounded-md bg-h-red-dark px-3 py-1 text-xs text-white disabled:bg-h-red-dark/40 disabled:text-white/50"
                      disabled={!isChecked}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DeleteProposalModal;
