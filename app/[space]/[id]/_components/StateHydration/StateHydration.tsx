import { useEffect } from "react";
import { useAccount } from "wagmi";
import { RootState } from "@/store";
import { createClient, calculateUserVotingPower } from "hedsvote";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { HedsVoteChoice } from "@/components/cards/ChoiceCard/constants";
import { StateHydrationProps } from "@/app/[space]/[id]/_components/StateHydration/constants";
import * as proposalActions from "@/store/proposal";
import * as spaceActions from "@/store/space";
import _ from "lodash";

/**
 * @const {JSX.Element} StateHydration
 * @param {object} getHedsTapeTracks - The getHedsTapeTracks function is used to get the HEDS tape tracks.
 * @param {object} params - The params object contains the space and id of the proposal.
 * @description This component is responsible for hydrating the client proposal state.
 */

const StateHydration = ({ getHedsTapeTracks, getVoterData, getTapeData, params }: StateHydrationProps) => {
  const dispatch = useAppDispatch();
  const { isConnected, address } = useAccount();
  const { getProposal, getAllSpaces } = createClient();
  const proposalState = useAppSelector((state: RootState) => state.proposal);
  const proposalData = useAppSelector((state: RootState) => state?.proposal?.proposal);
  const spaceAuthors = useAppSelector((state: RootState) => state?.spaceReducer?.spaceData?.authors);

  useEffect(() => {
    if (_.isEmpty(params)) return;
    if (spaceAuthors?.length === 0) getSpaceData(params.space);
    if (proposalData === null || proposalData?.ipfs_hash !== params.id) getProposalData(params.id);
    return () => {
      dispatch(proposalActions.reset());
    };
  }, [params.id]);

  const getSpaceData = async (slug: string) => {
    try {
      const spaces = await getAllSpaces();
      const spaceData = spaces.data.find((space) => space.name === slug);
      if (spaceData) dispatch(spaceActions.setSpaceData(spaceData));
    } catch (e) {
      console.log(e);
    }
    return;
  };

  useEffect(() => {
    if (isConnected && address?.length) {
      if (spaceAuthors?.length && proposalData?.strategies?.length)
        dispatch(proposalActions.setCanShowResults({ address: address.toLowerCase(), spaceAuthors, proposal: proposalData }));
    }
  }, [isConnected, spaceAuthors, proposalData, spaceAuthors, address]);
  useEffect(() => {
    if (proposalState?.isVoteOpen && proposalData && address?.length) {
      dispatch(proposalActions.setVotingPower(calculateUserVotingPower(address, proposalData.strategies)));
    }
  }, [proposalState?.isVoteOpen, address]);
  useEffect(() => {
    if (proposalState?.canShowResults && proposalData) {
      dispatch(proposalActions.setScoreData(proposalData));
    }
  }, [proposalState.canShowResults]);

  const getProposalData = async (id: string) => {
    try {
      const allProposals = await getProposal(id);
      const proposalData = allProposals?.data;
      if (proposalData) {
        dispatch(proposalActions.setProposal(proposalData));
        dispatch(proposalActions.setIsVoteOpen({ proposal: proposalData }));
        // note: Add Space ID or Validate for isHedsTape
        const isHedsTape = proposalData?.choice_type === "audio";
        if (proposalData?.votes?.length && proposalData?.cover) {
          const res = await getVoterData(proposalData.votes);
          const tapeData = await getTapeData(proposalData?.cover);
          if (tapeData) dispatch(proposalActions.setChosenTracks(tapeData));
          dispatch(proposalActions.setVoteParticipants({ voterData: res, proposal: proposalData }));
        }
        if (isHedsTape) {
          try {
            const publicStatus: proposalActions.PublicStatus = {};
            const updatedChoices: HedsVoteChoice[] | undefined = await getHedsTapeTracks(proposalData?.choices);
            dispatch(proposalActions.setHasCheckedPublicStatus(true));
            updatedChoices?.map((e) => (publicStatus[e.id] = e.isPublic));
            if (!_.isEmpty(publicStatus)) dispatch(proposalActions.setPublicStatus(publicStatus));
          } catch (e) {
            dispatch(proposalActions.setHasCheckedPublicStatus(true));
          }
        }
      } else {
        dispatch(proposalActions.setProposal(proposalData));
      }
    } catch (e) {
      console.log(e);
    }
    return;
  };

  return <></>;
};

export default StateHydration;
