import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { MetaplexContext } from './useMetaplex';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';

export const MetaplexProvider = ({ children }:any) => {
    const { connection } = window.xnft.solana
    const wallet = useWallet();

    console.log(wallet)

    const metaplex = useMemo(
        () => Metaplex.make(connection).use(walletAdapterIdentity(wallet)),
        [connection, wallet]
    );

    return (
        <MetaplexContext.Provider value={{ metaplex }}>
            {children}
        </MetaplexContext.Provider>
    )
}
