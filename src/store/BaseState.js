export class BaseState {
  error;
  message;
  loading;
  data;
  constructor() {
    this.data = [];
    this.message = "";
    this.error = false;
    this.loading = false;
  }

  // TODO: remove this method
  clearMessage() {
    this.error=false;//added this because a success message after a previous error becomes red
    this.message = "";
  }
}
