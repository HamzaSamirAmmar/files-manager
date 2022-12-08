export class BaseState {
  error;
  message;
  loading;
  data;
  constructor() {
    this.data = null;
    this.message = "";
    this.error = false;
    this.loading = false;
  }

  // TODO: remove this method
  clearMessage() {
    this.message = "";
  }
}
