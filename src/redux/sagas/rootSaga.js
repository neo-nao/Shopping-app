import { all } from "redux-saga/effects";
import {
  watchUserCreateAccount,
  watchUserRemoveItem,
} from "./userSagas/userSagas";

export default function* rootSaga() {
  yield all([watchUserRemoveItem(), watchUserCreateAccount()]);
}
