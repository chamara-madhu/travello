import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'travello',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Duration in milliseconds
      launchAutoHide: true,
      backgroundColor: 'purple',
      androidSplashResourceName: 'splash',
      showSpinner: true,
      spinnerColor: '#999999',
    },
  },
};

export default config;
