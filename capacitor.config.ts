import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5d0b1048bff64ef68b41f540d659efe6',
  appName: 'trip-smith-co',
  webDir: 'dist',
  server: {
    url: 'https://5d0b1048-bff6-4ef6-8b41-f540d659efe6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000000',
      showSpinner: false
    }
  }
};

export default config;