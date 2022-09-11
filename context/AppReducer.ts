export const initialState1 = {
  number: 0,
  stats: {
    labels: [],
    from: [],
    to: [],
  },
  labels: [],
  headers: {},
};

import superData from "../mocks/data/session.json";

export const initialState = superData;

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "init_stored": {
      return action.value;
    }

    case "add_number": {
      return {
        ...state,
        number: action.value + state.number,
      };
    }

    case "add_labels": {
      return {
        ...state,
        labels: action.value,
      };
    }

    case "add_headers": {
      return {
        ...state,
        headers: {
          ...state.headers,
          [action.value.id]: action.value,
        },
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

    case "load_stat_1": {

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
      };
    }
  }
};
