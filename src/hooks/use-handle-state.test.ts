import { renderHook, act } from "@testing-library/react-hooks";
import { useHandleState } from "./use-handle-state";

describe("Handle state hook tests", () => {
  it("Should throw an error, if state list is empty", () => {
    const { result } = renderHook(() => useHandleState([]));

    expect(result.error).toBeDefined();
    expect(result.error.message).toBe("Possible states list can't be empty");
  });

  it("Should throw an error, if at least one state value less than 1", () => {
    const testState = [1, 2, 5, 10, 25, 25, 100, 500, 1000, 9999, -1];

    const { result } = renderHook(() => useHandleState(testState));

    expect(result.error).toBeDefined();
    expect(result.error.message).toBe("Each state value should be more than 1");
  });


  it("Should set first value, if initial state is not from the list of possible states", () => {
    const testState = [1, 2, 5, 10, 25, 25, 100, 500, 1000, 9999];
    const { result: resultNumbers } = renderHook(() =>
      useHandleState(testState)
    );

    expect(resultNumbers.current[0]).toEqual(testState[0]);
  });

  it("Should set initial state correctly", () => {
    const testState = [1, 2, 5, 10, 25, 25, 100, 500, 1000, 9999];
    const { result } = renderHook(() =>
        useHandleState(testState, testState[0])
    );
    expect(result.current[0]).toEqual(testState[0]);
  });

  it("Should not change active state if new state is invalid", () => {
    const testState = [1, 2, 5, 10, 25, 25, 100, 500, 1000, 9999];
    const { result } = renderHook(() =>
        useHandleState(testState, 99)
    );
    act(() => result.current[1](3));
    expect(result.current[0]).toEqual(testState[0]);
  });

  it("Should correctly change current state if new state is valid", () => {
    const testState = [1, 2, 5, 10, 25, 25, 100, 500, 1000, 9999];
    const { result } = renderHook(() =>
        useHandleState(testState, testState[0])
    );

    testState.forEach(value => {
      act(() => result.current[1](value));
      expect(result.current[0]).toEqual(value);
    })
  });

});
