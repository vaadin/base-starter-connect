import * as statusService from './generated/StatusService.js';

export class StatusController {
  /**
   * @param {StatusView} statusView the status view instance
   */
  constructor(statusView) {
    this.statusView = statusView;
    this.statusView.onUpdate = this.updateAction.bind(this);
    this.statusView.attached = true;
  }

  /**
   * Calls the backend method and shows the result.
   */
  async updateAction() {
    const newStatus = this.statusView.newStatus;
    if (!newStatus) {
      this.statusView.status = 'Enter a new status first!';
    } else {
      this.statusView.status = await statusService.update(newStatus);
    }
  }
}
