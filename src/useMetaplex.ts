import { createContext, useContext } from 'react';

const DEFAULT_CONTEXT = {
    metaplex: null,
};

export const MetaplexContext = createContext<any>(DEFAULT_CONTEXT);

export function useMetaplex() {
    return useContext(MetaplexContext);
}
