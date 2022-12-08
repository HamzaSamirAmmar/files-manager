// 1) set [this.error] to false when we want to display a success message (with green background) like (group created successfully, file deleted successfully etc..)
// 2) else [this.error] to true
// 3) [this.message] contain error or success message
// 4) if (this.error) $root.VToast.showErrorMessage(this.message)
// 5) if (!this.error) $root.VToast.showSuccessMessage(this.message)

export class BaseState {
  error;
  message;
  loading;
  data;
  constructor(loading, error, message, data) {
    this.error = error || false;
    this.message = message || "";
    this.loading = loading || false;
    this.data = data || null;
  }

  toggleLoading(loading) {
    this.loading = loading || !this.loading;
  }

  setData(data) {
    this.data = data;
  }

  showMessage(message, error) {
    this.message = message;
    this.error = error;
  }

  clearMessage() {
    this.message = "";
  }
}
