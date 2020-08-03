import {useState, useCallback, useEffect} from "react";
export type HandleStateRes<T> = [T, (value: T) => void];

export const useHandleState = <T>(possibleStates: number[], initialState?: number): HandleStateRes<number> => {
    // checking if possible state array it's not empty
    if (!possibleStates.length) {
        throw new Error("Possible states list can't be empty");
    }

    // checking if each state value is more than 1
    if (possibleStates.some(value => value < 1)) {
        throw new Error("Each state value should be more than 1");
    }

    const [initialIndex, setInitialIndex] = useState<number>(0);
    const [state, setState] = useState<number>(possibleStates[initialIndex]);

    useEffect(() => {
        const index = possibleStates.findIndex((value) => initialState === value);

        setInitialIndex(index === -1 ? 0 : index)
    }, [initialState]);

    const setNewState = useCallback(
        (newState: number): void => {
            const index = possibleStates.findIndex((value) => value === newState);

            if (index === -1) return;
            setInitialIndex(index)
            setState(newState);
        },
        [possibleStates]
    );

    return [state, setNewState];
};
