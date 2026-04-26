import { create } from 'zustand';

export const useSessionStore = create((set) => ({
  // Session state
  sessionActive: true,
  currentModel: 'T2',
  sessionStartTime: new Date(),

  // Data streams
  liveData: [],
  recentEvents: [],
  oodEvents: [],

  // UI state
  alerts: [],
  selectedOODEvent: null,
  evaluationRunning: false,

  // Settings
  settings: {
    anomalyThreshold: 0.7,
    confidenceMin: 0.75,
    oodDistanceThreshold: 3.0,
    distanceMetric: 'mahalanobis',
  },

  // Actions
  updateLiveData: (newData) =>
    set((state) => ({
      liveData: [...state.liveData.slice(-119), newData],
    })),

  addEvent: (event) =>
    set((state) => ({
      recentEvents: [event, ...state.recentEvents.slice(0, 9)],
    })),

  setCurrentModel: (model) => set({ currentModel: model }),

  addAlert: (alert) =>
    set((state) => ({
      alerts: [...state.alerts, { ...alert, id: Date.now() }],
    })),

  removeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),

  setEvaluationRunning: (running) => set({ evaluationRunning: running }),

  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));
