import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchFunc,
  deleteFunc,
  postFunc,
} from "../../../services/requestServices";
import { random } from "../../../utils/appUtils";
import { hideAlert, showAlert } from "../../alert/alertSlice";
import { clearValues } from "../../authFormValues/authFormSlice";
import {
  createUserAccountFulfilled,
  createUserAccountPending,
  createUserAccountRejected,
  removeUserItemFulfilled,
  removeUserItemPending,
  removeUserItemRejected,
} from "../../user/userSlice";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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
    const accountExists = yield call(() =>
      fetchFunc("/users?email=" + payload.email)
    );

    if (!accountExists.length > 0) {
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
    } else {
      yield delay(300);
      yield put(hideAlert());
      yield delay(550);
      yield put(
        showAlert({ title: "Fail", paragraph: "Account already exists!" })
      );
    }
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
