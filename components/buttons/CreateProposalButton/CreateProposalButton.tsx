"use client";

import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { Button } from "@/common";
import * as styles from "@/components/buttons/CreateProposalButton/styles";
import { Plus } from "@/common/Icons";

const CreateProposalButton = ({ slug, admins }: { slug: string; admins?: string[] }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();
  const { address } = useAccount();

  useEffect(() => {
    const mappedAdmins = admins?.map((admin) => admin.toLowerCase());
    if (admins?.length && address && mappedAdmins?.includes(address.toLowerCase())) {
      setIsAdmin(true);
    }
  }, [address]);

  return (
    <div>
      {isAdmin && (
        <Button {...styles.$createProposalButtonStyles} onClick={() => router.push(`/${slug}/create-proposal`)}>
          <Plus />
          create
        </Button>
      )}
    </div>
  );
};

export default CreateProposalButton;
