import { gmail_v1 } from "googleapis/build/src/apis/gmail/v1";

export type Stats = {
  labels: [];
  from: [];
  to: [];
};
export type State = {
  stats: Stats;
  messages_list: gmail_v1.Schema$Message[];
  messages: gmail_v1.Schema$Message[];
};

export const initialState1: State = {
  stats: {
    labels: [],
    from: [],
    to: [],
  },
  messages_list: [],
  messages: [],
};

export const initialState = initialState1;

export type Action =
  | { type: "init_stored"; value: State }
  | { type: "add_messages_list"; value: gmail_v1.Schema$Message[] }
  | { type: "add_message"; value: gmail_v1.Schema$Message }
  | { type: "add_stats_label"; value: any }
  | { type: "add_stats_fromto"; value: any }
  | { type: "load_stat_1"; value: any };

export const AppReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "init_stored": {
      console.log(111111, "init_stored", action.value);

      return action.value;
    }

    case "add_messages_list": {
      console.log(22222, "add_messages_list", action.value);

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

    case "add_stats_label": {
      const labels = {
        ...state.stats.labels,
      };

      const { id, labelIds } = action.value;

      if (labelIds) {
        for (const label of labelIds) {
          if (undefined === labels[label]) {
            labels[label] = [];
          }

          if (labels[label].indexOf(id) === -1) {
            labels[label].push(id);
          }
        }
      }

      return {
        ...state,
        stats: {
          ...state.stats,
          labels: labels,
        },
      };
    }
    case "add_stats_fromto": {
      const { from, to } = state.stats;

      const { id, payload } = action.value;
      if (payload && payload.headers) {
        for (const header of payload.headers) {
          if (header.name === "From") {
            if (from.indexOf(header.value) === -1) {
              from.push(header.value);
            }
          }
          if (header.name === "To") {
            if (to.indexOf(header.value) === -1) {
              to.push(header.value);
            }
          }
        }
      }

      return {
        ...state,
        stats: {
          ...state.stats,
          to: [...to],
          from: [...from],
        },
      };
    }
  }
};
