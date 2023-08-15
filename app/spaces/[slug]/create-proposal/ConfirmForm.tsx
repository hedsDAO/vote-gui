"use client"
import { useContext } from "react";
import NextStepButton from "./NextStepButton";
import Image from "next/image";
import { CheckCircle, NotePencil } from "@phosphor-icons/react";
import { ChoiceOption, CreateProposalContext } from "@/context/createProposal.context";
import { pinFileToIpfs } from "../../../_actions";
import { Choice, Proposal } from "hedsvote";
import { useBlockNumber, useAccount } from "wagmi";
import { useParams } from 'next/navigation';

interface OwnProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const ConfirmForm = ({ setActiveStep }: OwnProps) => {
  const { state, dispatch } = useContext(CreateProposalContext);
  const blockNumber = useBlockNumber().data;
  const {address} = useAccount();
  const {slug} = useParams();

  const formattedDate = state.voteStart.toLocaleString('en-US', {
    month: 'long', // or 'numeric' for numeric representation
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const formattedTimeDuration = Number(state.voteDuration) / (1000 * 60 * 60 * 24);


  const formValidation = () => {
    // if (!state.voteDuration || !state.voteStart) {
    //   return true;
    // }
    return false;
  };
  console.log(state)

  const formatChoices = async (choiceOptions: ChoiceOption[]) => {
    const formattedChoices = choiceOptions.map( async (choice, idx) => {
      const {title, imageFile} = choice;
      const formattedChoice: Choice = {id: idx, image: '', name: title}
      if (imageFile) {
        const data = new FormData();
    
        // Metadata for pinata can be customized as needed
        const pinataMetadata = {
          name: `${title} image`,
          keyvalues: {
            fieldName: `${title} image`,
          },
        };
      
        data.append('pinataMetadata', JSON.stringify(pinataMetadata));
        data.append('file', imageFile);
        try {
          const imageRes = await pinFileToIpfs(data);
          formattedChoice.image = "https://www.heds.cloud/ipfs/" + imageRes.IpfsHash;
          console.log(formattedChoice.image)
          } catch (e) {
            console.log(e)
          }
        }

      // if (audioFile) {
      //     const audioRes = await pinFileToIpfs(audioFile, `${title} audio`);
      //     const audioLink = audioRes.data.IpfsHash;
      //     formattedChoice.media = audioLink;
      //   }
        return formattedChoice;
      })
      return Promise.all(formattedChoices)
    }
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
      
        data.append('pinataMetadata', JSON.stringify(pinataMetadata));
        data.append('file', coverFile);
        try {
          const imageRes = await pinFileToIpfs(data);
          const coverLink = "https://www.heds.cloud/ipfs/" + imageRes.IpfsHash;
          console.log(coverLink)
          return coverLink;
          } catch (e) {
            console.log(e)
          }
  }
  const submitCreateProposal = async () => {
    console.log("options", await formatChoices(state.choiceOptions))
    if (Array.isArray(slug)) return;
    const startTime =  new Date(state.voteStart);
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
      method: 1
    };
   console.log(proposal)
    //Use hedsvote createProposal via server actions
  }


  return (
    <div className="w-full">
      <div className="space-y-5 pl-12">
        <div className="flex w-fit flex-col">
          <div className="flex justify-between items-center pt-2 ">
            <label className="font-mono text-lg font-semibold tracking-tight text-gray-200 ">
              Cover + Details
            </label>
            <NotePencil type="button" onClick={() => setActiveStep(0)} className="h-5 w-5 text-white cursor-pointer"/>
          </div>
          {state.coverFile && <Image alt='cover image' width={350} height={400} src={ URL.createObjectURL(state.coverFile)}></Image>}
          <label className="font-mono text-lg font-bold tracking-tight text-gray-100 pt-4">
            Title
          </label>
          <h4 className="font-mono tracking-tight font-light" >
            {state.tapeDetails.title}
          </h4>
          <hr className="mb-1 h-[0.5px] border-t-0 bg-white opacity-100" />
          <label className="font-mono text-lg font-bold tracking-tight text-gray-100 pt-4">
            Description
          </label>
          <p className="font-mono tracking-tight font-light">
            {state.tapeDetails.description}
          </p>
          <div className="flex justify-between items-center pt-3 ">
            <label className="font-mono text-lg font-semibold tracking-tight text-gray-200 ">
              Choice Options
            </label>
            <NotePencil cursor="pointer" type="button" onClick={() => setActiveStep(1)} className="h-5 w-5 text-white cursor-pointer"/>
          </div>
          <div className="flex flex-col justify-between">
            {state.choiceOptions.map((choice, idx) => {
               return (
               <div key={idx}>
                <h4  className="font-mono tracking-tight font-light" >
                {choice.title}
                </h4>
                <hr className="mb-1 h-[0.5px] border-t-0 bg-white opacity-100" />
               </div>
               )
            })}
          </div>
          <div className="flex justify-between items-center pt-3 ">
            <label className="font-mono text-lg font-semibold tracking-tight text-gray-200 ">
              Proposal Timeline
            </label>
            <NotePencil cursor="pointer" type="button" onClick={() => setActiveStep(2)} className="h-5 w-5 text-white cursor-pointer"/>
          </div>
          <label className="font-mono text-sm font-semibold tracking-tight mb-1 text-gray-200">
              Vote Start
          </label>
          <div className="text-black max-h-[32px] w-fit bg-white rounded-lg font-space-grotesk px-5 border-transparent">
            {formattedDate}
          </div>
          <label className="font-mono text-sm font-semibold tracking-tight mb-1 text-gray-200">
              Vote Duration
          </label>
          <div className="text-black max-h-[32px] w-fit bg-white rounded-lg font-space-grotesk px-5 border-transparent">
            {formattedTimeDuration === 1 ? `${formattedTimeDuration} Day` : `${formattedTimeDuration} Days`}
          </div>
          <div className="flex justify-between items-center pt-3 ">
            <label className="font-mono text-lg font-semibold tracking-tight text-gray-200 ">
              Strategy
            </label>
            <NotePencil cursor="pointer" type="button" onClick={() => setActiveStep(3)} className="h-5 w-5 text-white cursor-pointer"/>
          </div>
          <div className="flex flex-col justify-between">
            {state.strategy.map((strategy, idx) => {
               return (
                <div className="flex flex-col items-start mt-2 gap-2 rounded-lg bg-white px-4 py-3 lg:w-full">
                  <div key={idx} className="flex w-full items-start justify-between">
                    <h4 className="font-space-grotesk font-medium text-black pr-4">{strategy.name}</h4>
                    <div className="inline-flex rounded-full border-transparent bg-green-700">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="max-w-[28ch] whitespace-pre-wrap pb-1 font-space-grotesk text-sm text-black">
                    Choose a set of contracts to base your voting power.
                  </p>
              </div>
               )
            })}
          </div>
        </div>
        <NextStepButton
            onClick={() => submitCreateProposal()}
            disabled={formValidation()}
            text="Submit"
            includeIcon
          />
      </div>
    </div>
  );
};

export default ConfirmForm;
