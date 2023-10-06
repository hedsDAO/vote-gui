"use client";
import { Fragment } from "react";
import { LoggedIn, LoginFailure, LoginSuccess, ModalSteps, ModalWrapper, NewUser, verifyUserWallet, Wallet} from "@heds-dev/auth"
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect } from "react";
import { Button } from "@/common";
import { useAppSelector } from "@/store/hooks";
import { useAppDispatch } from "@/store/hooks";
import { setModalState, setStep, setUser, reset} from "@/store/auth";

const LoginButton = () => {
  const { address, isConnected } = useAccount();
  const { currentStep, isModalOpen, user} = useAppSelector((store) => store.authReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!address) return;
    validateUserWallet(address);
  }, [isConnected, address]);

  const onLoginButtonClick = (newModalState: boolean) => {
    dispatch(setModalState(newModalState));
  }
  const authSetStep = (newStep: ModalSteps) => {
    dispatch(setStep(newStep));
  }

  const authSetUser = (userData: any) => {
    dispatch(setUser(userData));
  }

  const authClearUserState = () => {
    dispatch(reset());
  }

  const validateUserWallet = async (address: string) => {
    const userData = await verifyUserWallet(address);
    console.log(userData)
    if (userData) {
      dispatch(setUser(userData));
      dispatch(setStep(ModalSteps.LOGGED_IN));
    }
  }
  
  
  return (
    <Fragment>
        <Button onClick={() => onLoginButtonClick(true)}>{ user ? user.wallet.substring(0, 5) : "login"}</Button>
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
