import { Space_Data } from "hedsvote";


export const PROPOSAL_HEADER_TEXT = "PROPOSALS"
export const BACK_TEXT = "back";
export const ICON_CLASSNAME = "invert 0";
export const BACK_BUTTON_LINK = "/"
export const URL_TARGET = "_blank";

export const gatherSocialLinks = (space: Space_Data) => {
  const { twitter, discord, soundcloud, instagram } = space;
  const socialLinks: { name: "twitter" | "soundcloud" | "discord" | "instagram"; url: string }[] = [];
  if (twitter) socialLinks.push({ name: "twitter", url: twitter });
  if (soundcloud) socialLinks.push({ name: "soundcloud", url: soundcloud });
  if (discord) socialLinks.push({ name: "discord", url: discord });
  if (instagram) socialLinks.push({ name: "instagram", url: instagram });
  return socialLinks;
};
