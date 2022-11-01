import { gmail_v1 } from "googleapis/build/src/apis/gmail/v1";

export type Stats = {
  labels: [];
  from: [];
  to: [];
};
export enum APP_STATE {
  LOADING = "LOADING",
  READY = "READY",
};
export type State = {
  app_state: APP_STATE;
  stats: Stats;
  messages_list: gmail_v1.Schema$Message[];
  messages: gmail_v1.Schema$Message[];
  timestamps: any[]
};

export const initialState1: State = {
  app_state: APP_STATE.LOADING,
  stats: {
    labels: [],
    from: [],
    to: [],
  },
  messages_list: [],
  messages: [],
  timestamps: null,
};

export const initialState = initialState1;

export type Action =
  | { type: "init_stored"; value: State }
  | { type: "add_messages_list"; value: gmail_v1.Schema$Message[] }
  | { type: "add_message"; value: gmail_v1.Schema$Message }
  | { type: "set_timestamps"; value: any }
  | { type: "new_app_state"; value: APP_STATE };

export const AppReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "new_app_state": {
      console.log("new_app_state", action.value);
      return {
        ...state,
        app_state: action.value,
      };    }

    case "init_stored": {
      return action.value;
    }

    case "add_messages_list": {
      return {
        ...state,
        messages_list: action.value,
      };
    }

    case "add_message": {
      const found = state.messages.find(
        (message) => message.id === action.value.id
      );
      console.log(33333, undefined != found, "add_message", action.value.id);

      if (undefined != found) {
        return state;
      }

      state.messages.push(action.value);
      return {
        ...state,
        messages: state.messages,
      };
    }

    case "set_timestamps":{
      return {
        ...state,
        timestamps: action.value,
      };
    }

  }
};
