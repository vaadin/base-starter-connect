import {StatusView} from './status-view';
import * as statusService from './generated/StatusService';

export class StatusController {
  /**
   * The status view instance
   */
  public statusView: StatusView;

  /**
   * @param statusView the status view instance
   */
  constructor(statusView: StatusView) {
    this.statusView = statusView;
    this.statusView.onUpdate = this.updateAction.bind(this);
    this.statusView.attached = true;
  }

  /**
   * Calls the backend method and shows the result.
   */
  async updateAction(): Promise<void> {
    const newStatus = this.statusView.newStatus;
    if (!newStatus) {
      this.statusView.status = 'Enter a new status first!';
    } else {
      this.statusView.status = await statusService.update(newStatus);
    }
  }
}
