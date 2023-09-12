"use client";

import { useEffect } from "react";
import { createClient } from "hedsvote";
import { useAppDispatch } from "@/store/hooks";
import * as spaceActions from "@/store/space";
import _ from "lodash";

/**
 * @const {JSX.Element} StateHydration
 * @param {object} params - The params object contains the space name of the space.
 * @description This component is responsible for hydrating the client space state.
 */

const { getAllSpaces } = createClient();

const StateHydration = (params: { space: string }) => {
  const dispatch = useAppDispatch();
  const getSpaceData = async (slug: string) => {
    try {
      const spaces = await getAllSpaces();
      const spaceData = spaces.data.find((space: any) => space.name === slug);
      if (spaceData) dispatch(spaceActions.setSpaceData(spaceData));
    } catch (e) {
      console.log(e);
    }
    return;
  };
  useEffect(() => {
    if (params.space) {
      getSpaceData(params.space);
    }
    return () => {
      dispatch(spaceActions.reset());
    };
  }, [params]);
  return <></>;
};

export default StateHydration;
