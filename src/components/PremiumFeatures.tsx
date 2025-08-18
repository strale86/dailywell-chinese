import React, { useState } from 'react';
import { Download, Bell, Wifi, Settings, Star, Brain, Cloud, Users, Trophy, MessageCircle, Share2, BookOpen, Headphones, Dumbbell, Smartphone, QrCode } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PremiumFeaturesProps {
  isPremium: boolean;
  onUpgrade: () => void;
}

export const PremiumFeatures: React.FC<PremiumFeaturesProps> = ({
  isPremium,
  onUpgrade,
}) => {
  const { t } = useTranslation();
  const [qrCodes, setQrCodes] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState<{[key: string]: boolean}>({});
  const [paymentStatus, setPaymentStatus] = useState<{[key: string]: string}>({});

  const generateQrCode = async (plan: string, amount: number) => {
    setLoading(prev => ({ ...prev, [plan]: true }));
    
    try {
      // In development, we'll use a mock response
      // In production, this would call the Netlify function
      const isDevelopment = process.env.NODE_ENV === 'development';
      
      if (isDevelopment) {
        // Mock response for development
        setTimeout(() => {
          const mockQrUrl = `weixin://wxpay/bizpayurl?pr=mock_${Date.now()}`;
          setQrCodes(prev => ({ ...prev, [plan]: mockQrUrl }));
          setPaymentStatus(prev => ({ ...prev, [plan]: 'pending' }));
          setLoading(prev => ({ ...prev, [plan]: false }));
        }, 1000);
        return;
      }

      const response = await fetch('/.netlify/functions/generate-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          amount,
          userId: 'user_' + Date.now() // Mock user ID
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setQrCodes(prev => ({ ...prev, [plan]: data.qrCodeUrl }));
        setPaymentStatus(prev => ({ ...prev, [plan]: 'pending' }));
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      setPaymentStatus(prev => ({ ...prev, [plan]: 'error' }));
    } finally {
      setLoading(prev => ({ ...prev, [plan]: false }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t('premiumFeatures.premiumFeatures')}</h2>
          <p className="text-gray-600">{t('premiumFeatures.unlockAdvanced')}</p>
        </div>
      </div>

      {/* Data Export Feature */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Download className="w-6 h-6 text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t('premiumFeatures.dataExport')}</h3>
              <p className="text-sm text-gray-600">{t('premiumFeatures.dataExportDesc')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-600">{t('premiumFeatures.premium')}</span>
          </div>
        </div>
        
                 <div className="flex space-x-2">
           <button
             disabled={!isPremium}
             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
               isPremium
                 ? 'bg-blue-600 text-white hover:bg-blue-700'
                 : 'bg-gray-100 text-gray-400 cursor-not-allowed'
             }`}
           >
             {t('premiumFeatures.exportCSV')}
           </button>
           <button
             disabled={!isPremium}
             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
               isPremium
                 ? 'bg-green-600 text-white hover:bg-green-700'
                 : 'bg-gray-100 text-gray-400 cursor-not-allowed'
             }`}
           >
             {t('premiumFeatures.exportJSON')}
           </button>
           <button
             disabled={!isPremium}
             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
               isPremium
                 ? 'bg-red-600 text-white hover:bg-red-700'
                 : 'bg-gray-100 text-gray-400 cursor-not-allowed'
             }`}
           >
             {t('premiumFeatures.exportPDF')}
           </button>
                  </div>
       </div>

       {/* Backup & Sync Feature */}
       <div className="bg-white p-6 rounded-xl shadow-sm border">
         <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <Cloud className="w-6 h-6 text-blue-500" />
             <div>
               <h3 className="text-lg font-semibold text-gray-900">Backup & Sync</h3>
               <p className="text-sm text-gray-600">Cloud backup and cross-device sync</p>
             </div>
           </div>
           <div className="flex items-center gap-2">
             <Star className="w-4 h-4 text-yellow-500" />
             <span className="text-sm text-gray-600">Premium</span>
           </div>
         </div>
         
         <div className="space-y-3">
           <div className="flex items-center justify-between">
             <span className="text-sm text-gray-700">Auto backup</span>
             <button
               disabled={!isPremium}
               className={`w-12 h-6 rounded-full transition-colors ${
                 isPremium ? 'bg-blue-600' : 'bg-gray-300'
               }`}
             >
               <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                 isPremium ? 'translate-x-6' : 'translate-x-1'
               }`} />
             </button>
           </div>
           <div className="flex items-center justify-between">
             <span className="text-sm text-gray-700">Cross-device sync</span>
             <button
               disabled={!isPremium}
               className={`w-12 h-6 rounded-full transition-colors ${
                 isPremium ? 'bg-blue-600' : 'bg-gray-300'
               }`}
             >
               <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                 isPremium ? 'translate-x-6' : 'translate-x-1'
               }`} />
             </button>
           </div>
           <div className="flex items-center justify-between">
             <span className="text-sm text-gray-700">Version history</span>
             <button
               disabled={!isPremium}
               className={`w-12 h-6 rounded-full transition-colors ${
                 isPremium ? 'bg-blue-600' : 'bg-gray-300'
               }`}
             >
               <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                 isPremium ? 'translate-x-6' : 'translate-x-1'
               }`} />
             </button>
           </div>
         </div>
       </div>

       {/* Advanced Notifications Feature */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-purple-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Advanced Notifications</h3>
              <p className="text-sm text-gray-600">Custom reminders and smart alerts</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-600">Premium</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Habit reminders</span>
            <button
              disabled={!isPremium}
              className={`w-12 h-6 rounded-full transition-colors ${
                isPremium ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                isPremium ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Goal progress alerts</span>
            <button
              disabled={!isPremium}
              className={`w-12 h-6 rounded-full transition-colors ${
                isPremium ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                isPremium ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
                 </div>
       </div>

       {/* Push Notifications Feature */}
       <div className="bg-white p-6 rounded-xl shadow-sm border">
         <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <Smartphone className="w-6 h-6 text-blue-500" />
             <div>
               <h3 className="text-lg font-semibold text-gray-900">Push Notifications</h3>
               <p className="text-sm text-gray-600">Real-time notifications on your device</p>
             </div>
           </div>
           <div className="flex items-center gap-2">
             <Star className="w-4 h-4 text-yellow-500" />
             <span className="text-sm text-gray-600">Premium</span>
           </div>
         </div>
         
         <div className="space-y-3">
           <div className="flex items-center justify-between">
             <span className="text-sm text-gray-700">Task due reminders</span>
             <button
               disabled={!isPremium}
               className={`w-12 h-6 rounded-full transition-colors ${
                 isPremium ? 'bg-blue-600' : 'bg-gray-300'
               }`}
             >
               <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                 isPremium ? 'translate-x-6' : 'translate-x-1'
               }`} />
             </button>
           </div>
           <div className="flex items-center justify-between">
             <span className="text-sm text-gray-700">Habit streak alerts</span>
             <button
               disabled={!isPremium}
               className={`w-12 h-6 rounded-full transition-colors ${
                 isPremium ? 'bg-blue-600' : 'bg-gray-300'
               }`}
             >
               <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                 isPremium ? 'translate-x-6' : 'translate-x-1'
               }`} />
             </button>
           </div>
           <div className="flex items-center justify-between">
             <span className="text-sm text-gray-700">Goal milestone notifications</span>
             <button
               disabled={!isPremium}
               className={`w-12 h-6 rounded-full transition-colors ${
                 isPremium ? 'bg-blue-600' : 'bg-gray-300'
               }`}
             >
               <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                 isPremium ? 'translate-x-6' : 'translate-x-1'
               }`} />
             </button>
           </div>
           <div className="flex items-center justify-between">
             <span className="text-sm text-gray-700">Friend challenge updates</span>
             <button
               disabled={!isPremium}
               className={`w-12 h-6 rounded-full transition-colors ${
                 isPremium ? 'bg-blue-600' : 'bg-gray-300'
               }`}
             >
               <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                 isPremium ? 'translate-x-6' : 'translate-x-1'
               }`} />
             </button>
           </div>
         </div>
         
         <div className="mt-4 pt-4 border-t border-gray-200">
           <button
             disabled={!isPremium}
             className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
               isPremium
                 ? 'bg-blue-600 text-white hover:bg-blue-700'
                 : 'bg-gray-100 text-gray-400 cursor-not-allowed'
             }`}
           >
             {isPremium ? 'Configure Notifications' : 'Upgrade for Push Notifications'}
           </button>
         </div>
       </div>

       {/* Offline Mode Feature */}
       <div className="bg-white p-6 rounded-xl shadow-sm border">
         <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <Wifi className="w-6 h-6 text-orange-500" />
             <div>
               <h3 className="text-lg font-semibold text-gray-900">Offline Mode</h3>
               <p className="text-sm text-gray-600">Work without internet connection</p>
             </div>
           </div>
           <div className="flex items-center gap-2">
             <Star className="w-4 h-4 text-yellow-500" />
             <span className="text-sm text-gray-600">Premium</span>
           </div>
         </div>
         
         <div className="space-y-3">
           <div className="flex items-center justify-between">
             <span className="text-sm text-gray-700">Offline access</span>
             <button
               disabled={!isPremium}
               className={`w-12 h-6 rounded-full transition-colors ${
                 isPremium ? 'bg-orange-600' : 'bg-gray-300'
               }`}
             >
               <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                 isPremium ? 'translate-x-6' : 'translate-x-1'
               }`} />
             </button>
           </div>
           <div className="flex items-center justify-between">
             <span className="text-sm text-gray-700">Sync when online</span>
             <button
               disabled={!isPremium}
               className={`w-12 h-6 rounded-full transition-colors ${
                 isPremium ? 'bg-orange-600' : 'bg-gray-300'
               }`}
             >
               <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                 isPremium ? 'translate-x-6' : 'translate-x-1'
               }`} />
             </button>
           </div>
           <div className="flex items-center justify-between">
             <span className="text-sm text-gray-700">Local storage</span>
             <button
               disabled={!isPremium}
               className={`w-12 h-6 rounded-full transition-colors ${
                 isPremium ? 'bg-orange-600' : 'bg-gray-300'
               }`}
             >
               <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                 isPremium ? 'translate-x-6' : 'translate-x-1'
               }`} />
             </button>
           </div>
         </div>
       </div>

       {/* Customizable Dashboard Feature */}
       <div className="bg-white p-6 rounded-xl shadow-sm border">
         <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <Settings className="w-6 h-6 text-indigo-500" />
             <div>
               <h3 className="text-lg font-semibold text-gray-900">Customizable Dashboard</h3>
               <p className="text-sm text-gray-600">Organize and arrange widgets</p>
             </div>
           </div>
           <div className="flex items-center gap-2">
             <Star className="w-4 h-4 text-yellow-500" />
             <span className="text-sm text-gray-600">Premium</span>
           </div>
         </div>
         
         <div className="grid grid-cols-2 gap-3">
           <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
             <span className="text-sm text-gray-700">Task Widget</span>
             <button
               disabled={!isPremium}
               className={`w-8 h-4 rounded-full transition-colors ${
                 isPremium ? 'bg-indigo-600' : 'bg-gray-300'
               }`}
             >
               <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                 isPremium ? 'translate-x-4' : 'translate-x-0.5'
               }`} />
             </button>
           </div>
           <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
             <span className="text-sm text-gray-700">Habits Widget</span>
             <button
               disabled={!isPremium}
               className={`w-8 h-4 rounded-full transition-colors ${
                 isPremium ? 'bg-indigo-600' : 'bg-gray-300'
               }`}
             >
               <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                 isPremium ? 'translate-x-4' : 'translate-x-0.5'
               }`} />
             </button>
           </div>
           <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
             <span className="text-sm text-gray-700">Goals Widget</span>
             <button
               disabled={!isPremium}
               className={`w-8 h-4 rounded-full transition-colors ${
                 isPremium ? 'bg-indigo-600' : 'bg-gray-300'
               }`}
             >
               <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                 isPremium ? 'translate-x-4' : 'translate-x-0.5'
               }`} />
             </button>
           </div>
           <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
             <span className="text-sm text-gray-700">Analytics Widget</span>
             <button
               disabled={!isPremium}
               className={`w-8 h-4 rounded-full transition-colors ${
                 isPremium ? 'bg-indigo-600' : 'bg-gray-300'
               }`}
             >
               <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                 isPremium ? 'translate-x-4' : 'translate-x-0.5'
               }`} />
             </button>
           </div>
         </div>
       </div>

       {/* Personalized Recommendations Feature */}
       <div className="bg-white p-6 rounded-xl shadow-sm border">
         <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <Brain className="w-6 h-6 text-green-500" />
             <div>
               <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
               <p className="text-sm text-gray-600">Personalized suggestions based on your data</p>
             </div>
           </div>
           <div className="flex items-center gap-2">
             <Star className="w-4 h-4 text-yellow-500" />
             <span className="text-sm text-gray-600">Premium</span>
           </div>
         </div>
         
         <div className="space-y-3">
           <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
             <div className="flex items-start gap-3">
               <Brain className="w-5 h-5 text-green-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900">Habit Suggestion</h4>
                 <p className="text-xs text-gray-600">Based on your morning routine, try adding "Drink water" as a daily habit</p>
               </div>
             </div>
           </div>
           
           <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
             <div className="flex items-start gap-3">
               <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900">Goal Recommendation</h4>
                 <p className="text-xs text-gray-600">You're close to completing your reading goal. Consider setting a new target!</p>
               </div>
             </div>
           </div>
           
           <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
             <div className="flex items-start gap-3">
               <Brain className="w-5 h-5 text-yellow-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900">Productivity Tip</h4>
                 <p className="text-xs text-gray-600">Your focus sessions are most productive in the morning. Schedule important tasks then.</p>
               </div>
             </div>
           </div>
         </div>
         
         <div className="mt-4 pt-4 border-t border-gray-200">
           <button
             disabled={!isPremium}
             className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
               isPremium
                 ? 'bg-green-600 text-white hover:bg-green-700'
                 : 'bg-gray-100 text-gray-400 cursor-not-allowed'
             }`}
           >
             {isPremium ? 'Get New Recommendations' : 'Upgrade for AI Insights'}
           </button>
         </div>
       </div>

       {/* Social Features */}
       <div className="bg-white p-6 rounded-xl shadow-sm border">
         <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <Users className="w-6 h-6 text-purple-500" />
             <div>
               <h3 className="text-lg font-semibold text-gray-900">Social Features</h3>
               <p className="text-sm text-gray-600">Connect and compete with friends</p>
             </div>
           </div>
           <div className="flex items-center gap-2">
             <Star className="w-4 h-4 text-yellow-500" />
             <span className="text-sm text-gray-600">Premium</span>
           </div>
         </div>
         
         <div className="space-y-4">
           {/* Friend Challenges */}
           <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
             <div className="flex items-start gap-3">
               <Trophy className="w-5 h-5 text-purple-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900">Friend Challenges</h4>
                 <p className="text-xs text-gray-600">Create and join challenges with friends</p>
                 <div className="mt-2 flex items-center gap-2">
                   <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Active: 2</span>
                   <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">Won: 5</span>
                 </div>
               </div>
             </div>
           </div>
           
           {/* Community */}
           <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
             <div className="flex items-start gap-3">
               <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900">Community</h4>
                 <p className="text-xs text-gray-600">Join forums and groups</p>
                 <div className="mt-2 flex items-center gap-2">
                   <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Groups: 3</span>
                   <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Posts: 12</span>
                 </div>
               </div>
             </div>
           </div>
           
           {/* Sharing */}
           <div className="p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
             <div className="flex items-start gap-3">
               <Share2 className="w-5 h-5 text-green-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900">Share Achievements</h4>
                 <p className="text-xs text-gray-600">Share your progress on social media</p>
                 <div className="mt-2 flex items-center gap-2">
                   <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Shared: 8</span>
                   <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">Likes: 24</span>
                 </div>
               </div>
             </div>
           </div>

           {/* Leaderboards */}
           <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
             <div className="flex items-start gap-3">
               <Trophy className="w-5 h-5 text-yellow-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900">Leaderboards</h4>
                 <p className="text-xs text-gray-600">Compete on global and friend leaderboards</p>
                 <div className="mt-2 flex items-center gap-2">
                   <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Rank: #15</span>
                   <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Points: 1,250</span>
                 </div>
               </div>
             </div>
           </div>
         </div>
         
         <div className="mt-4 pt-4 border-t border-gray-200">
           <button
             disabled={!isPremium}
             className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
               isPremium
                 ? 'bg-purple-600 text-white hover:bg-purple-700'
                 : 'bg-gray-100 text-gray-400 cursor-not-allowed'
             }`}
           >
             {isPremium ? 'Explore Community' : 'Upgrade for Social Features'}
           </button>
         </div>
       </div>

       {/* Content Library */}
       <div className="bg-white p-6 rounded-xl shadow-sm border">
         <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <BookOpen className="w-6 h-6 text-emerald-500" />
             <div>
               <h3 className="text-lg font-semibold text-gray-900">Premium Content</h3>
               <p className="text-sm text-gray-600">Educational and wellness content</p>
             </div>
           </div>
           <div className="flex items-center gap-2">
             <Star className="w-4 h-4 text-yellow-500" />
             <span className="text-sm text-gray-600">Premium</span>
           </div>
         </div>
         
         <div className="space-y-4">
           {/* Wellness Articles */}
           <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
             <div className="flex items-start gap-3">
               <BookOpen className="w-5 h-5 text-emerald-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900">Wellness Articles</h4>
                 <p className="text-xs text-gray-600">Educational content about health and wellness</p>
                 <div className="mt-2 flex items-center gap-2">
                   <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">50+ Articles</span>
                   <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Weekly Updates</span>
                 </div>
               </div>
             </div>
           </div>
           
           {/* Guided Meditations */}
           <div className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
             <div className="flex items-start gap-3">
               <Headphones className="w-5 h-5 text-indigo-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900">Guided Meditations</h4>
                 <p className="text-xs text-gray-600">Audio sessions for relaxation and focus</p>
                 <div className="mt-2 flex items-center gap-2">
                   <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">30+ Sessions</span>
                   <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">5-20 min</span>
                 </div>
               </div>
             </div>
           </div>
           
           {/* Workout Plans */}
           <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
             <div className="flex items-start gap-3">
               <Dumbbell className="w-5 h-5 text-orange-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900">Workout Plans</h4>
                 <p className="text-xs text-gray-600">Structured fitness programs and exercises</p>
                 <div className="mt-2 flex items-center gap-2">
                   <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">20+ Plans</span>
                   <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">All Levels</span>
                 </div>
               </div>
             </div>
           </div>
         </div>
         
         <div className="mt-4 pt-4 border-t border-gray-200">
           <button
             disabled={!isPremium}
             className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
               isPremium
                 ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                 : 'bg-gray-100 text-gray-400 cursor-not-allowed'
             }`}
           >
             {isPremium ? 'Browse Content Library' : 'Upgrade for Premium Content'}
           </button>
         </div>
       </div>

       {/* WeChat Pay Section */}
       <div className="bg-white p-6 rounded-xl shadow-sm border">
         <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <QrCode className="w-6 h-6 text-green-500" />
             <div>
               <h3 className="text-lg font-semibold text-gray-900">WeChat Pay</h3>
               <p className="text-sm text-gray-600">Scan QR code to upgrade to Premium</p>
             </div>
           </div>
           <div className="flex items-center gap-2">
             <Star className="w-4 h-4 text-yellow-500" />
             <span className="text-sm text-gray-600">Premium</span>
           </div>
         </div>
         
         <div className="space-y-4">
           {/* Pro Plan */}
           <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
             <div className="flex items-center justify-between mb-3">
               <h4 className="text-lg font-semibold text-gray-900">Pro Plan</h4>
               <span className="text-2xl font-bold text-green-600">¥68</span>
             </div>
             <ul className="text-sm text-gray-600 space-y-1 mb-4">
               <li>• Advanced Analytics</li>
               <li>• Push Notifications</li>
               <li>• Offline Mode</li>
               <li>• Data Export</li>
             </ul>
             <div className="text-center">
               {!qrCodes['pro'] ? (
                 <button
                   onClick={() => generateQrCode('pro', 68)}
                   disabled={loading['pro']}
                   className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                 >
                   {loading['pro'] ? t('premiumFeatures.generating') : t('premiumFeatures.generateQRCode')}
                 </button>
               ) : (
                 <div className="bg-white p-3 rounded-lg border border-green-200 inline-block">
                   <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                     <QrCode className="w-16 h-16 text-green-500" />
                   </div>
                   <p className="text-xs text-gray-500 mt-2">Scan with WeChat</p>
                   {paymentStatus['pro'] === 'pending' && (
                     <p className="text-xs text-blue-500 mt-1">Waiting for payment...</p>
                   )}
                 </div>
               )}
             </div>
           </div>

           {/* Premium Plan */}
           <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
             <div className="flex items-center justify-between mb-3">
               <h4 className="text-lg font-semibold text-gray-900">Premium Plan</h4>
               <span className="text-2xl font-bold text-purple-600">¥128</span>
             </div>
             <ul className="text-sm text-gray-600 space-y-1 mb-4">
               <li>• All Pro Features</li>
               <li>• Social Features</li>
               <li>• Premium Content</li>
               <li>• Customizable Dashboard</li>
             </ul>
             <div className="text-center">
               {!qrCodes['premium'] ? (
                 <button
                   onClick={() => generateQrCode('premium', 128)}
                   disabled={loading['premium']}
                   className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                 >
                   {loading['premium'] ? t('premiumFeatures.generating') : t('premiumFeatures.generateQRCode')}
                 </button>
               ) : (
                 <div className="bg-white p-3 rounded-lg border border-purple-200 inline-block">
                   <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                     <QrCode className="w-16 h-16 text-purple-500" />
                   </div>
                   <p className="text-xs text-gray-500 mt-2">Scan with WeChat</p>
                   {paymentStatus['premium'] === 'pending' && (
                     <p className="text-xs text-blue-500 mt-1">Waiting for payment...</p>
                   )}
                 </div>
               )}
             </div>
           </div>
         </div>
         
         <div className="mt-4 pt-4 border-t border-gray-200">
           <div className="text-center">
             <p className="text-sm text-gray-600 mb-2">How to pay:</p>
             <ol className="text-xs text-gray-500 space-y-1">
               <li>1. Open WeChat app on your phone</li>
               <li>2. Tap "Scan" and scan the QR code</li>
               <li>3. Confirm payment amount</li>
               <li>4. Premium features will be activated instantly</li>
             </ol>
           </div>
         </div>
       </div>
     </div>
   );
 };
