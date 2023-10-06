"use client";
import { Fragment } from "react";
import { LoggedIn, LoginFailure, LoginSuccess, ModalSteps, ModalWrapper, NewUser, useVerifyUserWallet, Wallet} from "@heds-dev/auth"
import { ConnectKitButton } from "connectkit";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import axios from "axios";
import { useEffect } from "react";
import { createNewUserData } from "@/utils/createNewUserData";
import { Button, Typography } from "@/common";
import { useAppSelector } from "@/store/hooks";
import { useAppDispatch } from "@/store/hooks";
import { setModalState, setStep, setUser, reset} from "@/store/auth";
import { Spinner } from "@/common/Icons";
import * as styles from "./styles";

const getUserData = async (address: string) => {
  try {
    const adr = address.toLowerCase();
    const userDataResult = await axios.get(
      `https://us-central1-heds-104d8.cloudfunctions.net/api/users/${adr}`
    );
    if (!userDataResult.data.id) {
      const data = createNewUserData(adr);
      await axios.post(
        `https://us-central1-heds-104d8.cloudfunctions.net/api/users`,
        data
      );
      return;
    } else {
      return;
    }
  } catch (e) {
    console.log(e);
    return;
  }
};

const LoginButton = () => {
  const { address, isConnected } = useAccount();
  // const { data: { account = undefined } = {} } = useConnect() || {};
  const { currentStep, isModalOpen, user} = useAppSelector((store) => store.authReducer);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (!address) return;
  //   getUserData(address as `0x${string}`);
  // }, [isConnected, address]);

  const onLoginButtonClick = (newModalState: boolean) => {
    dispatch(setModalState(newModalState));
  }
  const authSetStep = (newStep: ModalSteps) => {
    dispatch(setStep(newStep));
  }

  const authSetUser = (userData: any) => {
    console.log("data from func", userData)
    dispatch(setUser(userData));
  }

  const authClearUserState = () => {
    dispatch(reset());
  }
  
  
  return (
    // <ConnectKitButton.Custom>
    //   {({ isConnected, isConnecting, show, address }) => {
    //     return (
    //       <Button {...styles.$connectButtonStyles} onClick={show}>
    //         {isConnecting ? (
    //           <Spinner />
    //         ) : isConnected ? (
    //           <Typography {...styles.$connectButtonTextStyles}>
    //             {address?.slice(0, 5).toLowerCase() + "..."}
    //           </Typography>
    //         ) : (
    //           <Typography {...styles.$connectButtonTextStyles}>
    //             connect
    //           </Typography>
    //         )}
    //       </Button>
    //     );
    //   }}
    // </ConnectKitButton.Custom>
    <Fragment>
        <Button onClick={() => onLoginButtonClick(true)}>login</Button>
          <ModalWrapper isOpen={isModalOpen} onLoginButtonClick={onLoginButtonClick}>
              {/* {currentStep === ModalSteps.RETURNING && <ReturningUser />} */}
              {currentStep === ModalSteps.NEW && <NewUser setStep={authSetStep} />}
              {currentStep === ModalSteps.WALLET && <Wallet useAccount={useAccount}  useConnect={useConnect} setStep={authSetStep} setUserData={authSetUser} />}
              {/* {currentStep === ModalSteps.SMS && <Phone />}
              {currentStep === ModalSteps.VERIFY_SMS && <PhoneConfirm />}*/}
              {/* {currentStep === ModalSteps.GOOGLE && <Google />} */}
              {currentStep === ModalSteps.SUCCESS && <LoginSuccess />}
              {currentStep === ModalSteps.ERROR && <LoginFailure />}
              {currentStep === ModalSteps.LOGGED_IN && <LoggedIn response={user} setStep={authSetStep} clearUserAuthState={authClearUserState} useDisconnect={useDisconnect} />}
              {/* {currentStep === ModalSteps.EDIT && <EditProfile />}  */}
          </ModalWrapper>
    </Fragment>
  );
};

export default LoginButton;
