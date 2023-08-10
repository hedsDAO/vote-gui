"use client";
import { useContext, useState } from "react";
import NextStepButton from "./NextStepButton";
import { CreateProposalContext } from "@/context/createProposal.context";
import {
  Strategy,
  StrategyName,
  Erc721MultiRegistryWeightedStrategy,
  WhitelistWeightedStrategy,
} from "hedsvote";

interface OwnProps {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

interface ERC721Entry {
  token: string;
  weight: number;
}

interface WhitelistEntry {
  address: string;
  weight: number;
}

//Need to fix bug were duplicate things are rendered if a user leaves form, comes back and then resubmits
const StrategyForm = ({ setActiveStep }: OwnProps) => {
  const { state, dispatch } = useContext(CreateProposalContext);
  const initialStrategies = state.strategy || [];
  const initialErc721Entries: ERC721Entry[] = initialStrategies
    .filter((s) => s.name === StrategyName.ERC721)
    .map((strategy) => {
      const params = (strategy as Erc721MultiRegistryWeightedStrategy).params;
      return params.tokens.map((token, index) => ({
        token,
        weight: params.weights[index],
      }));
    })
    .flat();
  const initialWhitelistEntries: WhitelistEntry[] = initialStrategies
    .filter((s) => s.name === StrategyName.WHITELIST)
    .map((strategy) => {
      const params = (strategy as WhitelistWeightedStrategy).params;
      return Object.keys(params.addresses).map((address) => ({
        address,
        weight: params.addresses[address],
      }));
    })
    .flat();

  const [strategies, setStrategies] = useState<Strategy[]>(initialStrategies);
  const [erc721Entries, setErc721Entries] =
    useState<ERC721Entry[]>(initialErc721Entries);
  const [whitelistEntries, setWhitelistEntries] = useState<WhitelistEntry[]>(
    initialWhitelistEntries
  );

  const handleClick = () => {
    let updatedStrategies = [...strategies]; // Clone the existing strategies

    // Update the ERC721 strategy if there are ERC721 entries
    if (erc721Entries.length > 0) {
      const erc721Index = strategies.findIndex(
        (s) => s.name === StrategyName.ERC721
      );
      const existingStrategy = strategies[erc721Index];
      updatedStrategies[erc721Index] = {
        ...existingStrategy,
        params: {
          symbol: (
            existingStrategy.params as Erc721MultiRegistryWeightedStrategy["params"]
          ).symbol,
          tokens: erc721Entries.map((entry) => entry.token),
          weights: erc721Entries.map((entry) => entry.weight),
        },
      } as Erc721MultiRegistryWeightedStrategy;
    }

    // Update the WHITELIST strategy if there are whitelist entries
    if (whitelistEntries.length > 0) {
      const whitelistIndex = strategies.findIndex(
        (s) => s.name === StrategyName.WHITELIST
      );
      updatedStrategies[whitelistIndex] = {
        ...strategies[whitelistIndex],
        params: {
          addresses: whitelistEntries.reduce((acc, entry) => {
            acc[entry.address] = entry.weight;
            return acc;
          }, {} as Record<string, number>),
        },
      } as WhitelistWeightedStrategy;
    }

    dispatch({ type: "ADD_STRATEGY", payload: updatedStrategies });
    setActiveStep(4);
    return;
  };

  const isValidAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const formValidation = () => {
    for (const strategy of strategies) {
      if (strategy.name === StrategyName.ERC721) {
        const params =
          strategy.params as Erc721MultiRegistryWeightedStrategy["params"];
        if (
          !params.symbol ||
          params.tokens.some((token) => !isValidAddress(token))
        ) {
          return true;
        }
      } else if (strategy.name === StrategyName.WHITELIST) {
        if (whitelistEntries.some((entry) => !isValidAddress(entry.address))) {
          return true;
        }
      }
    }
    return false;
  };

  const handleSymbolChange = (index: number, value: string) => {
    const updatedStrategies = [...strategies];
    (
      updatedStrategies[index]
        .params as Erc721MultiRegistryWeightedStrategy["params"]
    ).symbol = value;
    setStrategies(updatedStrategies);
  };

  const handleAddErc721Entry = () => {
    setErc721Entries([...erc721Entries, { token: "", weight: 0 }]);
  };

  const handleErc721EntryChange = (
    index: number,
    key: "token" | "weight",
    value: string | number
  ) => {
    const updatedErc721Entries = [...erc721Entries];
    updatedErc721Entries[index] = {
      ...updatedErc721Entries[index],
      [key]: value,
    };
    setErc721Entries(updatedErc721Entries);

    // Update the corresponding strategy in the strategies array
    const updatedStrategies: Strategy[] = strategies.map((strategy) => {
      if (strategy.name === StrategyName.ERC721) {
        // Ensuring that strategy is of the proper type
        const erc721Strategy = strategy as Erc721MultiRegistryWeightedStrategy;

        return {
          ...erc721Strategy,
          params: {
            ...erc721Strategy.params,
            symbol: erc721Strategy.params.symbol, // Preserve existing symbol
            tokens: updatedErc721Entries.map((entry) => entry.token),
            weights: updatedErc721Entries.map((entry) => entry.weight),
          },
        } as Erc721MultiRegistryWeightedStrategy;
      }
      return strategy;
    });

    setStrategies(updatedStrategies);
  };

  const handleAddWhitelistEntry = () => {
    setWhitelistEntries([...whitelistEntries, { address: "", weight: 0 }]);
  };

  const handleWhitelistChange = (
    index: number,
    key: "address" | "weight",
    value: string | number
  ) => {
    // Clone the existing entries
    const updatedWhitelistEntries = [...whitelistEntries];

    // Update the specific entry
    updatedWhitelistEntries[index] = {
      ...updatedWhitelistEntries[index],
      [key]: value,
    };

    // Update the state
    setWhitelistEntries(updatedWhitelistEntries);

    // Build the addresses parameter for WhitelistWeightedStrategy
    const updatedAddresses: { [key: string]: number } = {};
    updatedWhitelistEntries.forEach((entry) => {
      updatedAddresses[entry.address] = entry.weight;
    });

    // Update the corresponding strategy in the strategies array
    const updatedStrategies = strategies.map((strategy) => {
      if (strategy.name === StrategyName.WHITELIST) {
        // Specific update logic for WhitelistWeightedStrategy
        return {
          ...strategy,
          params: {
            addresses: updatedAddresses,
          },
        } as WhitelistWeightedStrategy;
      }
      return strategy;
    });

    setStrategies(updatedStrategies);
  };
  type StrategyParams =
    | { addresses: { [key: string]: number } }
    | { owners?: any; symbol: string; tokens: string[]; weights: number[] };

  const handleStrategyChange = (strategyName: StrategyName) => {
    if (strategies.some((s) => s.name === strategyName)) {
      // Remove the strategy if it already exists
      setStrategies(strategies.filter((s) => s.name !== strategyName));
    } else {
      // Construct the new strategy based on the strategy name
      let newStrategy: Strategy;
      if (strategyName === StrategyName.ERC721) {
        newStrategy = {
          name: strategyName,
          network: "", // default or empty network, change accordingly
          params: {
            symbol: "",
            tokens: [],
            weights: [],
          },
        };
      } else if (strategyName === StrategyName.WHITELIST) {
        newStrategy = {
          name: strategyName,
          network: "", // default or empty network, change accordingly
          params: {
            addresses: {},
          },
        };
      } else {
        throw new Error(`Unknown strategy name: ${strategyName}`);
      }

      // Add the new strategy
      setStrategies([...strategies, newStrategy]);
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-5 lg:pl-12">
        <div className="flex w-fit flex-col">
          <label className="font-space-grotesk text-lg font-medium tracking-wide text-white">
            Configure Tokens & Whitelist
          </label>
        </div>
        <div className="flex flex-col">
          <label>
            <input
              type="checkbox"
              checked={strategies.some((s) => s.name === StrategyName.ERC721)}
              onChange={() => handleStrategyChange(StrategyName.ERC721)}
            />
            ERC721 Strategy
          </label>
          <label>
            <input
              type="checkbox"
              checked={strategies.some(
                (s) => s.name === StrategyName.WHITELIST
              )}
              onChange={() => handleStrategyChange(StrategyName.WHITELIST)}
            />
            Whitelist Strategy
          </label>
        </div>
        {strategies.map((strategy, index) => {
          if (strategy.name === StrategyName.ERC721) {
            return (
              <div key={index}>
                <input
                  className="text-black"
                  type="text"
                  placeholder="Symbol"
                  value={
                    (
                      strategy.params as Erc721MultiRegistryWeightedStrategy["params"]
                    ).symbol
                  }
                  onChange={(e) => handleSymbolChange(index, e.target.value)}
                />
                {erc721Entries.map((entry, entryIndex) => (
                  <div key={entryIndex} className="flex space-x-2">
                    <input
                      className="text-black"
                      type="text"
                      placeholder="Token"
                      value={entry.token}
                      onChange={(e) =>
                        handleErc721EntryChange(
                          entryIndex,
                          "token",
                          e.target.value
                        )
                      }
                    />
                    <input
                      className="text-black"
                      type="number"
                      placeholder="Weight"
                      value={entry.weight}
                      onChange={(e) =>
                        handleErc721EntryChange(
                          entryIndex,
                          "weight",
                          +e.target.value
                        )
                      }
                    />
                  </div>
                ))}
                <button onClick={handleAddErc721Entry}>Add Token</button>
              </div>
            );
          } else if (strategy.name === StrategyName.WHITELIST) {
            return (
              <div key={index}>
                {whitelistEntries.map((entry, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      className="text-black"
                      placeholder="Address"
                      value={entry.address}
                      onChange={(e) =>
                        handleWhitelistChange(index, "address", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      className="text-black"
                      placeholder="Weight"
                      value={entry.weight}
                      onChange={(e) =>
                        handleWhitelistChange(index, "weight", +e.target.value)
                      }
                    />
                  </div>
                ))}
                <button onClick={handleAddWhitelistEntry}>Add Address</button>
              </div>
            );
          }
          return null;
        })}
        <NextStepButton
          onClick={() => handleClick()}
          disabled={formValidation()}
          text="NEXT"
          includeIcon
        />
      </div>
    </div>
  );
};

export default StrategyForm;
