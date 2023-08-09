"use client"
import { useContext } from "react";
import NextStepButton from "./NextStepButton";
import { ChoiceOption, CreateProposalContext } from "@/context/createProposal.context";
import { pinFileToIpfs } from "../_actions";
import { Choice } from "hedsvote";

interface OwnProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const ConfirmForm = ({ setActiveStep }: OwnProps) => {
  const { state, dispatch } = useContext(CreateProposalContext);

  const formValidation = () => {
    // if (!state.voteDuration || !state.voteStart) {
    //   return true;
    // }
    return false;
  };
  console.log(state)

  const formatChoices = async (choiceOptions: ChoiceOption[]) => {
    const formattedChoices = choiceOptions.map( async (choice, idx) => {
      const {title, imageFile, audioFile} = choice;
      const formattedChoice: Choice = {id: idx, image: '', name: title}
      if (imageFile) {
          const imageRes = await pinFileToIpfs(imageFile, `${title} image`);
          const imageLink = imageRes.data.IpfsHash;
          formattedChoice.image = imageLink;
        }

      if (audioFile) {
          const audioRes = await pinFileToIpfs(audioFile, `${title} audio`);
          const audioLink = audioRes.data.IpfsHash;
          formattedChoice.media = audioLink;
        }
        return formattedChoice;
      })
      return Promise.all(formattedChoices)
    }
     
  const submitCreateProposal = async () => {
    const author = "";//connected user
    const block = 0; //make wagmi call
    const choices = await formatChoices(state.choiceOptions);
    const description = state.tapeDetails.description;
    const startTime = new Date(state.voteStart);
    const endTime = new Date(startTime.getMilliseconds() + parseInt(state.voteDuration));
    const spaceName = "";//need to add to context or get from URL
    const title = state.tapeDetails.title;
    const voteMethod = 1;
    //Use hedsvote createProposal via server actions
  }


  return (
    <div className="w-full">
      <div className="space-y-5 pl-12">
        <div className="flex w-fit flex-col">
          <label className="font-mono text-sm font-semibold tracking-tight text-gray-200">
            Preview
          </label>
        </div>
        <NextStepButton
            onClick={() => setActiveStep(3)}
            disabled={formValidation()}
            text="NEXT"
            includeIcon
          />
        {/* <div className="mt-12 flex justify-between">
          <button>Previous</button>
          <button>Next</button>
        </div> */}
      </div>
    </div>
  );
};

export default ConfirmForm;
