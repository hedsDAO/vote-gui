import { DateTime } from 'luxon';

export const createNewUserData = (wallet: string): { [key: string]: any } => {
    return {
      badges: JSON.stringify([
        {
          name: 'Visitor',
          image: 'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1',
          description: 'Welcome to heds.',
        },
      ]),
      banner:
        'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3',
      collection: {},
      description: '',
      display_name: '',
      joined: DateTime.now().toMillis(),
      profile_picture:
        'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/profilePictures%2F0x000000000000000000000000000000.png?alt=media&token=55cb53fe-736d-4b1e-bcd0-bf17bc7146dc',
      votes: null,
      wallet: wallet?.toLowerCase(),
      spotlight: null,
      role: 'user',
    };
  };