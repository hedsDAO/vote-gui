"use client"

import { useRouter } from "next/navigation"
import Image from "next/image";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

const CreateProposalButton = ({slug, admins}: {slug: string, admins?: string[]}) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const router = useRouter();
    const {address} = useAccount();

    useEffect(() => {
        if(admins?.length && address && admins.includes(address.toLowerCase())) {
            setIsAdmin(true);
        }
    },[address])

    return (
            <div>
              { isAdmin && 
                <button type="button" className="flex items-center gap-2 px-4" onClick={() =>  router.push(`/${slug}/create-proposal`)}>
                    <Image
                    alt="add proposal"
                    src={"/icons/plus.svg"}
                    width={10}
                    height={10}
                    />
                    <p className="font-space-grotesk text-sm text-black">create</p>
                 </button>
               }
            </div> 
    )
};

export default CreateProposalButton;