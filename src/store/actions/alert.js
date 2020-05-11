import { SHOW_ALERT, HIDE_ALERT } from '../type';

export function showAlert(alert) {
  return {
    type: SHOW_ALERT,
    alert,
  };
}

export function hideAlert() {
  return {
    type: HIDE_ALERT,
  };
}
