import { createStore, createTypedHooks, action, Action } from "easy-peasy";


interface StoreModel {
}

export const store = createStore<StoreModel>({
});

export const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>();
