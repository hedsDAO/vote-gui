"use client";

// import { quadratic, Quadratic_Vote } from "hedsvote";
// import { useState, useEffect } from "react";
// import Ballot from "./temp/Ballot";
// import { SortedChoice, VoterUserData } from "@/common/types";
// import AudioCards from "./_cards/AudioCards";
// import ImageCards from "./_cards/ImageCards";
// import Results from "./temp/Results";
// import { useAccount } from "wagmi";
// import { getUserVotePercentages } from "@/utils/getUserVotePercentages";
// import { getScoreData } from "@/utils/getScoreData";
// import { getVotingStatus } from "@/utils/getVotingStatus";
// import { useAppSelector } from "@/store/hooks";

const VotingNavbar = () => {
  // const { address } = useAccount();
  // const [currentTab, setCurrentTab] = useState<number>(0);
  // const [choicesWithScores, setChoicesWithScores] = useState<any>();
  // const proposal = useAppSelector((state) => state.proposal.proposal);
  // const sortedChoicesWithScores = useAppSelector((state) => state.proposal.scoreData).sortedChoicesWithScores;


  // const votingStatus = getVotingStatus(
  //     //@ts-ignore
  //   proposal?.start_time,
  //     //@ts-ignore
  //   proposal?.end_time
  // );
  
  // useEffect(() => {
  //   if (votingStatus === "closed" && !proposal?.scores && proposal?.votes) {
  //     const { getScores } = quadratic({
  //       votes: proposal?.votes as Quadratic_Vote[],
  //       choices: proposal?.choices,
  //     });
  //     const scores = getScores();
  //     const newProposal = { ...proposal, scores };
  //     const { sortedChoicesWithScores: updatedChoicesWithScores } =
  //       getScoreData(newProposal);
  //     setChoicesWithScores(updatedChoicesWithScores);
  //   }
  // }, [proposal]);
  // console.log(sortedChoicesWithScores?.length)
  // console.log(sortedChoicesWithScores)

  // return (
  //   <>
  //     {votingStatus === "open" ? (
  //       <div className="mt-10 flex items-end justify-between">
  //         <p className="font-inter text-base font-semibold tracking-wide text-black">
  //           CHOICES
  //         </p>
  //         <Ballot
  //         />
  //       </div>
  //     ) : (
  //       <div className="mt-10 flex items-end gap-2">
  //         <p
  //           role="button"
  //           onClick={() => setCurrentTab(0)}
  //           className={
  //             `${
  //               currentTab === 0
  //                 ? "text-black"
  //                 : "text-black/40 hover:text-black"
  //             } ` +
  //             "font-inter text-base font-semibold tracking-wide transition-all ease-in-out"
  //           }
  //         >
  //           CHOICES
  //         </p>
  //         {proposal?.show_results && (
  //           <p
  //             role="button"
  //             onClick={() => setCurrentTab(1)}
  //             className={
  //               `${
  //                 currentTab === 1
  //                   ? "text-black"
  //                   : "text-black/40 hover:text-black"
  //               } ` +
  //               "font-inter text-base font-semibold tracking-wide transition-all ease-in-out"
  //             }
  //           >
  //             RESULTS
  //           </p>
  //         )}
  //       </div>
  //     )}
  //     {currentTab === 0 ? (
  //       <div className="mb-10 flex max-w-5xl text-black">
  //         <div className="mt-5 flex w-full flex-col gap-5">
  //           {proposal?.choice_type === "audio" ? (
  //             <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
  //               <AudioCards
  //                 votingStatus={votingStatus}
  //                 sortedChoicesWithScores={
  //                   sortedChoicesWithScores?.length
  //                     ? sortedChoicesWithScores
  //                     : choicesWithScores
  //                 }
  //               />
  //             </div>
  //           ) : proposal?.choice_type === "image" ? (
  //             <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
  //               <ImageCards
  //                 votingStatus={votingStatus}
  //                 sortedChoicesWithScores={
  //                   sortedChoicesWithScores?.length
  //                     ? sortedChoicesWithScores
  //                     : choicesWithScores
  //                 }
  //               />
  //             </div>
  //           ) : (
  //             <></>
  //           )}
  //         </div>
  //       </div>
  //     ) : (
  //       <>
  //         {
  //           <Results
  //             sortedChoicesWithScores={
  //               sortedChoicesWithScores?.length
  //                 ? sortedChoicesWithScores
  //                 : choicesWithScores
  //             }
  //           />
  //         }
  //       </>
  //     )}
  //   </>
  // );
};

export default VotingNavbar;
