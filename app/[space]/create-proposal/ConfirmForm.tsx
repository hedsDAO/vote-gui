"use client";
import { useContext, useState } from "react";
import NextStepButton from "./NextStepButton";
import Image from "next/image";
import { CheckCircle, NotePencil } from "@phosphor-icons/react";
import {
  ChoiceOption,
  CreateProposalContext,
} from "@/context/createProposal.context";
// import { pinFileToIpfs } from "../../_actions";
import { pinFileToIpfs } from "@/_actions";
import { Choice, Proposal, createClient } from "hedsvote";
import { useBlockNumber, useAccount, useWalletClient } from "wagmi";
import { useParams, useRouter } from "next/navigation";
import ChoicesPreview from "./ChoicesPreview";

interface OwnProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const ConfirmForm = ({ setActiveStep }: OwnProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [isShowingFullDescription, setIsShowingFullDescription] =
    useState<boolean>(false);
  const [isShowingChoicesPreview, setIsShowingChoicesPreview] =
    useState<boolean>(false);
  const [confirmedProposal, setConfirmedProposal] = useState<boolean>(false)
  const { state, dispatch } = useContext(CreateProposalContext);
  const blockNumber = useBlockNumber().data;
  const { address } = useAccount();
  const signer = useWalletClient().data;
  const { space: slug } = useParams();

  const formattedDate = state.voteStart.toLocaleString("en-US", {
    month: "long", // or 'numeric' for numeric representation
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedTimeDuration =
    Number(state.voteDuration) / (1000 * 60 * 60 * 24);

  const formValidation = () => {
    if (!confirmedProposal) {
      return true;
    }
    return false;
  };

  const formatChoices = async (choiceOptions: ChoiceOption[]) => {
    const formattedChoices = choiceOptions.map(async (choice, idx) => {
      const { title, imageFile } = choice;
      const formattedChoice: Choice = { id: idx + 1, image: "", name: title };
      if (imageFile) {
        const data = new FormData();

        // Metadata for pinata can be customized as needed
        const pinataMetadata = {
          name: `${title} image`,
          keyvalues: {
            fieldName: `${title} image`,
          },
        };

        data.append("pinataMetadata", JSON.stringify(pinataMetadata));
        data.append("file", imageFile);
        try {
          const imageRes = await pinFileToIpfs(data);
          console.log(imageRes)
          formattedChoice.image =
            "https://www.heds.cloud/ipfs/" + imageRes.IpfsHash;
        } catch (e) {
          console.log(e);
        }
      }

      // if (audioFile) {
          // const audioRes = await pinFileToIpfs(audioFile, `${title} audio`);
          // const audioLink = audioRes.data.IpfsHash;
          // formattedChoice.media = audioLink;
      //   }
      return formattedChoice;
    });
    return Promise.all(formattedChoices);
  };
  const getCoverLink = async (coverFile: File | null) => {
    if (!coverFile) return "";
    const data = new FormData();

    // Metadata for pinata can be customized as needed
    const pinataMetadata = {
      name: `${coverFile.name} cover`,
      keyvalues: {
        fieldName: coverFile.name,
      },
    };

    data.append("pinataMetadata", JSON.stringify(pinataMetadata));
    data.append("file", coverFile);
    try {
      const imageRes = await pinFileToIpfs(data);
      console.log(imageRes)
      const coverLink = "https://www.heds.cloud/ipfs/" + imageRes.IpfsHash;
      return coverLink;
    } catch (e) {
      console.log(e);
    }
  };

  const submitCreateProposal = async () => {
    // console.log("options", await formatChoices(state.choiceOptions));
    if (Array.isArray(slug)) return;
    const startTime = new Date(state.voteStart);
    try {
      setIsLoading(true);
    const proposal: Proposal = {
      author: address as string,
      block: Number(blockNumber),
      choices: await formatChoices(state.choiceOptions),
      cover: await getCoverLink(state.coverFile),
      description: state.tapeDetails.description,
      startTime,
      endTime: new Date(startTime.getTime() + parseInt(state.voteDuration)),
      spaceName: slug,
      title: state.tapeDetails.title,
      strategies: state.strategy,
      method: 1,
      choice_type: state.tapeDetails.choiceType,
      show_results: state.tapeDetails.showResults
    };
    //Use hedsvote createProposal via server actions
    const { createProposal } = createClient();
    if (!signer) return;
    const createdProposal: any = await createProposal(signer,proposal);
    if (createdProposal) {
      setIsLoading(false);
      console.log(`/${slug}/${createdProposal.data.ipfsHash}`, "createdProposal", createdProposal?.data)
      router.push(`/${slug}/${createdProposal.data.ipfsHash}`);
      return;
    } else {
      return;
    }
   } catch (e) {
    setIsLoading(false);
    console.error(e);
    return
   }
  };

  return (
    <div className="w-full lg:pl-12">
      <p className="font-space-grotesk text-2xl text-white">Preview and Submit</p>
      <div className="mt-2 flex flex-col">
        <div className="flex items-baseline justify-between py-1">
          <label className="mb-2 font-space-grotesk text-lg font-light text-white/80">
            Cover & Details
          </label>
          <NotePencil
            type="button"
            onClick={() => setActiveStep(0)}
            className="h-4 w-4 cursor-pointer text-white"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex h-44 w-44 flex-col items-center justify-center rounded-2xl border-[4px] border-dashed border-gray-200 p-4 text-center">
            {state.coverFile && (
              <Image
                alt="cover image"
                width={176}
                height={176}
                className="min-h-[176px] min-w-[176px] rounded-2xl object-cover p-1.5"
                src={URL.createObjectURL(state.coverFile)}
              ></Image>
            )}
          </div>
          <div className="flex flex-col justify-start gap-1">
            <div>
              <label className="font-space-grotesk text-sm text-gray-100/50">
                title
              </label>
              <h4 className="pointer-events-none font-space-grotesk font-light text-white">
                {state.tapeDetails.title}
              </h4>
            </div>
            <div>
              <label className="font-space-grotesk text-sm text-gray-100/50">
                description
              </label>
              {isShowingFullDescription ? (
                <h4 className="pointer-events-none mt-1 font-space-grotesk text-base font-light text-white">
                  {state.tapeDetails.description}
                  <span
                    role="button"
                    className="pointer-events-auto ml-2 text-sm text-white/50"
                    onClick={() => setIsShowingFullDescription(false)}
                  >
                    show less
                  </span>
                </h4>
              ) : (
                <h4 className="pointer-events-none mt-1 font-space-grotesk text-base font-light text-white">
                  {state.tapeDetails.description?.length > 200
                    ? state.tapeDetails.description.slice(0, 200)
                    : state.tapeDetails.description}
                  {state.tapeDetails.description?.length > 200 && (
                    <span
                      role="button"
                      className="pointer-events-auto ml-2 text-sm text-white/50"
                      onClick={() => setIsShowingFullDescription(true)}
                    >
                      ...
                    </span>
                  )}
                </h4>
              )}
            </div>
          </div>
        </div>
        <hr className="mt-4 border-white/50" />
        <div className="flex items-center justify-between pt-3">
          <label className="mb-3 font-space-grotesk text-lg font-light text-white/80">
            Choices
          </label>
          <NotePencil
            cursor="pointer"
            type="button"
            onClick={() => setActiveStep(1)}
            className="h-4 w-4 cursor-pointer text-white"
          />
        </div>
        {/* desktop choices */}
        <div className="flex flex-row gap-2 lg:hidden">
          {state.choiceOptions.slice(0, 2).map((choice, idx) => {
            return (
              <div key={choice.title} className="rounded-[17px] border border-white/50">
                <Image
                  key={choice.title}
                  alt="cover image"
                  width={80}
                  height={80}
                  className="max-h-[80px] min-h-[80px] min-w-[80px] max-w-[80px] rounded-2xl object-cover"
                  src={URL.createObjectURL(choice.imageFile as File)}
                ></Image>
              </div>
            );
          })}
          <div className="flex max-h-[80px] min-h-[80px] min-w-[80px] max-w-[80px] flex-col items-center justify-center rounded-[17px] border border-white/50 text-xs">
            <span
              onClick={() => setIsShowingChoicesPreview(true)}
              role="button"
              className="pointer-events-auto -mt-1 font-space-grotesk text-[0.65rem] text-white/75"
            >
              view all
            </span>
          </div>
          {isShowingChoicesPreview && (
            <ChoicesPreview
              onClose={() => setIsShowingChoicesPreview(false)}
              isOpen={isShowingChoicesPreview}
            />
          )}
        </div>
        {/* mobile choices */}
        <div className="lg:flex flex-row gap-2 hidden">
          {state.choiceOptions.slice(0, 3).map((choice, idx) => {
            return (
              <div key={choice.title} className="rounded-[17px] border border-white/50">
                <Image
                  alt="cover image"
                  width={80}
                  height={80}
                  className="max-h-[80px] min-h-[80px] min-w-[80px] max-w-[80px] rounded-2xl object-cover"
                  src={URL.createObjectURL(choice.imageFile as File)}
                ></Image>
              </div>
            );
          })}
          <div className="flex max-h-[80px] min-h-[80px] min-w-[80px] max-w-[80px] flex-col items-center justify-center rounded-[17px] border border-white/50 text-xs">
            <span
              onClick={() => setIsShowingChoicesPreview(true)}
              role="button"
              className="pointer-events-auto -mt-1 font-space-grotesk text-[0.65rem] text-white/75"
            >
              view all
            </span>
          </div>
          {isShowingChoicesPreview && (
            <ChoicesPreview
              onClose={() => setIsShowingChoicesPreview(false)}
              isOpen={isShowingChoicesPreview}
            />
          )}
        </div>
        <hr className="mt-7 border-white/50" />
        <div className="flex items-center justify-between pt-5">
          <label className="mb-3 font-space-grotesk text-lg font-light text-white/80">
            Proposal Timeline
          </label>
          <NotePencil
            cursor="pointer"
            type="button"
            onClick={() => setActiveStep(2)}
            className="h-4 w-4 cursor-pointer text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-2">
            <label className="font-space-grotesk text-sm text-gray-100/50">
              Vote Start:
            </label>
            <div className="font-space-grotesk text-sm text-white">{formattedDate}</div>
          </div>
          <div className="flex items-baseline gap-2">
            <label className="font-space-grotesk text-sm text-gray-100/50">
              Vote Duration:
            </label>
            <div className="font-space-grotesk text-sm text-white">
              {formattedTimeDuration === 1
                ? `${formattedTimeDuration} Day`
                : `${formattedTimeDuration} Days`}
            </div>
          </div>
        </div>
        <hr className="mt-7 border-white/50" />
        <div className="flex items-center justify-between pt-4">
          <label className="mb-3 font-space-grotesk text-lg font-light text-white/80">
            Strategies
          </label>
          <NotePencil
            cursor="pointer"
            type="button"
            onClick={() => setActiveStep(3)}
            className="h-4 w-4 cursor-pointer text-white"
          />
        </div>
        <div className="mt-2 flex flex-col gap-2">
          {state.strategy.map((strategy, idx) => {
            return (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 rounded-lg bg-transparent px-2 py-1.5 border border-white/80 text-sm transition-all lg:w-[50%]"
              >
                <h4 className="font-space-grotesk text-xs text-white">
                  {strategy.name}
                </h4>
                <div className="rounded-full bg-green-700">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-flex items-start gap-2 mt-8 mb-3"> 
          <input type="checkbox" className="default:ring-2  w-4 h-4 mt-1" onChange={(e) => {
            setConfirmedProposal(e.target.checked)
            } }/>
          <p className="font-space-grotesk text-white"> I understand that Proposals can not be edited. To make changes you must delete and make a new Proposal</p >
        </div>
        <div className="mt-10 flex justify-end">
          <NextStepButton
            isLoading={isLoading}
            onClick={() => submitCreateProposal()}
            disabled={formValidation() || isLoading}
            text="Submit"
            includeIcon
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmForm;
