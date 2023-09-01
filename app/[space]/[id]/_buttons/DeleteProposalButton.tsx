"use client";

import Image from "next/image";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import DeleteProposalModal from "../_modals/DeleteProposalModal";
import { useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";

const DeleteProposalButton = () => {
  const [isShowingDeleteProposalModal, setIsShowingDeleteProposalModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const proposal = useAppSelector((state) => state.proposal.proposal);
  const admins = useAppSelector((state) => state.proposal.spaceData.authors);
  const { spaceName, id } = useParams();
  const { address } = useAccount();

  useEffect(() => {
    const formattedAdmins = admins?.map((admin: any) => admin?.toLowerCase()) || [];
    if (admins?.length && address && formattedAdmins.includes(address.toLowerCase())) {
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
            spaceName={Array.isArray(spaceName) ? spaceName[0] : spaceName}
            id={Array.isArray(id) ? id[0] : id}
          />
          <button
            type="button"
            className="flex items-center gap-2 rounded-md border px-2.5 py-1"
            onClick={() => setIsShowingDeleteProposalModal(true)}
          >
            <Image alt="add proposal" src={"/icons/trash.svg"} width={8} height={8} className="" />
            <p className="font-space-grotesk text-xs text-black">delete</p>
          </button>
        </>
      )}
    </div>
  );
};

export default DeleteProposalButton;
