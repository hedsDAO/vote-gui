"use client";

import Image from "next/image";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import DeleteProposalModal from "../_modals/DeleteProposalModal";

const DeleteProposalButton = ({
  slug,
  id,
  admins,
  proposal
}: {
  slug: string;
  id: string;
  admins?: string[];
  proposal: any
}) => {
  const [isShowingDeleteProposalModal, setIsShowingDeleteProposalModal] =
    useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { address } = useAccount();

  useEffect(() => {
    const formattedAdmins = admins?.map((admin) => admin?.toLowerCase()) || [];
    if (
      admins?.length &&
      address &&
      formattedAdmins.includes(address.toLowerCase())
    ) {
      setIsAdmin(true);
    }
  }, [address]);

  return (
    <div>
      {isAdmin && (
        <>
          <DeleteProposalModal
            proposal={proposal}
            setIsOpen={setIsShowingDeleteProposalModal}
            isOpen={isShowingDeleteProposalModal}
            slug={slug}
            id={id}
          />
          <button
            type="button"
            className="flex items-center gap-2 border px-2.5 rounded-md py-1"
            onClick={() => setIsShowingDeleteProposalModal(true)}
          >
            <Image
              alt="add proposal"
              src={"/icons/trash.svg"}
              width={8}
              height={8}
              className=""
            />
            <p className="text-black text-xs font-space-grotesk">delete</p>
          </button>
        </>
      )}
    </div>
  );
};

export default DeleteProposalButton;
