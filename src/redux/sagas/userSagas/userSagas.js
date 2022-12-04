import { call, put, takeEvery } from "redux-saga/effects";
import { deleteFunc, postFunc } from "../../../services/requestServices";
import { random } from "../../../utils/appUtils";
import { clearValues } from "../../authFormValues/authFormSlice";
import {
  createUserAccountFulfilled,
  createUserAccountPending,
  createUserAccountRejected,
  removeUserItemFulfilled,
  removeUserItemPending,
  removeUserItemRejected,
} from "../../user/userSlice";

function* asyncRemoveUserItem({ payload }) {
  const { userToken, productID } = payload;

  try {
    const res = yield call(() =>
      deleteFunc(`/usersCart?userToken=${userToken}&productID=${productID}`)
    );

    yield put(removeUserItemFulfilled(res));
  } catch (err) {
    yield put(removeUserItemRejected(err));
  }
}

function* asyncCreateUserAccount({ payload }) {
  try {
    const res = yield call(() =>
      postFunc("/users", {
        ...payload,
        userToken: random.createRandomString(),
        cart: {
          requestStatus: {
            loading: false,
            error: null,
          },
          items: [],
        },
      })
    );

    yield put(clearValues());
    yield put(createUserAccountFulfilled(res));
  } catch (err) {
    yield put(createUserAccountRejected(err));
  }
}

function* watchUserRemoveItem() {
  yield takeEvery(removeUserItemPending.type, asyncRemoveUserItem);
}

function* watchUserCreateAccount() {
  yield takeEvery(createUserAccountPending.type, asyncCreateUserAccount);
}

export { watchUserRemoveItem, watchUserCreateAccount };
