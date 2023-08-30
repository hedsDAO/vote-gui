"use client";

import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { Button } from "@/common";
import { Plus } from "@/common/Icons";
import Link from "next/link";
import * as styles from "@/components/buttons/CreateProposalButton/styles";
import * as constants from "@/components/buttons/CreateProposalButton/constants";

const CreateProposalButton = ({ slug, admins }: { slug: string; admins?: string[] }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { address } = useAccount();
  const plusClassName = "-mb-[2px] invert-0";

  useEffect(() => {
    const mappedAdmins = admins?.map((admin) => admin.toLowerCase());
    if (admins?.length && address && mappedAdmins?.includes(address.toLowerCase())) {
      setIsAdmin(true);
    }
  }, [address]);

  return (
    <>
      {isAdmin && (
        <Link href={`/${slug}/create-proposal`}>
          <Button {...styles.$createProposalButtonStyles}>
            <Plus className={plusClassName} />
            {constants.CREATE_PROPOSAL_BUTTON_LABEL}
          </Button>
        </Link>
      )}
    </>
  );
};

export default CreateProposalButton;
