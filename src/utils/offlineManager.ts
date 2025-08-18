export class OfflineManager {
  private static instance: OfflineManager;
  private isOnline: boolean = navigator.onLine;
  private pendingActions: Array<{action: string, data: any, timestamp: number}> = [];

  private constructor() {
    this.setupEventListeners();
    this.loadPendingActions();
  }

  static getInstance(): OfflineManager {
    if (!OfflineManager.instance) {
      OfflineManager.instance = new OfflineManager();
    }
    return OfflineManager.instance;
  }

  private setupEventListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncPendingActions();
      this.showNotification('Back online! Syncing data...', 'success');
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.showNotification('You are offline. Changes will be saved locally.', 'warning');
    });
  }

  private showNotification(message: string, type: 'success' | 'warning' | 'error') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500 text-white' :
      type === 'warning' ? 'bg-yellow-500 text-white' :
      'bg-red-500 text-white'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  private loadPendingActions() {
    const saved = localStorage.getItem('dailywell-pending-actions');
    if (saved) {
      this.pendingActions = JSON.parse(saved);
    }
  }

  private savePendingActions() {
    localStorage.setItem('dailywell-pending-actions', JSON.stringify(this.pendingActions));
  }

  private async syncPendingActions() {
    if (this.pendingActions.length === 0) return;

    for (const action of this.pendingActions) {
      try {
        // Here you would sync with your backend
        console.log('Syncing action:', action);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error('Failed to sync action:', action, error);
      }
    }

    // Clear pending actions after successful sync
    this.pendingActions = [];
    this.savePendingActions();
  }

  public addPendingAction(action: string, data: any) {
    const pendingAction = {
      action,
      data,
      timestamp: Date.now()
    };

    this.pendingActions.push(pendingAction);
    this.savePendingActions();
  }

  public isOnlineMode(): boolean {
    return this.isOnline;
  }

  public getPendingActionsCount(): number {
    return this.pendingActions.length;
  }

  public async saveDataLocally(key: string, data: any) {
    try {
      localStorage.setItem(`dailywell-${key}`, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Failed to save data locally:', error);
      return false;
    }
  }

  public getDataLocally(key: string): any {
    try {
      const saved = localStorage.getItem(`dailywell-${key}`);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to get data locally:', error);
      return null;
    }
  }
}

// Register service worker
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', registration);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};


