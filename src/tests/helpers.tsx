import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // to mock the Redux store
import { PropsWithChildren } from "react";

const mockStore = configureStore([]);
const store = mockStore({});

export const ReduxProvider = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <>{children}</>
    </Provider>
  );
};
