# REACT HANDLE STATE HOOK

## 1. Mission.

Build a react hook that a programmer can use to toggle between n arbitrary states where n >= 1. I can feed the hook a set of possible states and an initial state. It returns the current state and a function to let me set a new state.
Use Typescript and write a test suite for it using jest.

## 2. Installation.

1. Clone repository.
2. Install dependencies `npm i` or `yarn`.

## 3. Usage.

1. Import `useHandleState` hook from [src/hooks/use-handle-state](src/hooks/use-handle-state.ts).
2. Use `useHandleState` hook as shown in the example.
Example:
```typescript
const [state, setState] = useHandleState({ possibleStates, initialState });
```

## 4. Test options.

1. Should throw an error, if state list is empty.
2. Should throw an error, if at least one state value less than 1.
3. Should set first value, if initial state is not from the list of possible states.
4. Should set initial state correctly.
5. Should not change active state if new state is invalid.
6. Should correctly change current state if new state is valid.
