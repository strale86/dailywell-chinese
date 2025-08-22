import React, { useState } from 'react';
import { Download, Bell, Wifi, Settings, Star, Brain, Cloud, Users, Trophy, MessageCircle, Share2, BookOpen, Headphones, Dumbbell, Smartphone, QrCode, CreditCard } from 'lucide-react';


interface PremiumFeaturesProps {
  isPremium: boolean;
  onUpgrade: () => void;
}

export const PremiumFeatures: React.FC<PremiumFeaturesProps> = ({
  isPremium,
  onUpgrade,
}) => {
  // Get current language from localStorage or default to English
  const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Loading states for payment buttons
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    pro: false,
    premium: false
  });

  // QR Code state
  const [qrCodes, setQrCodes] = useState<{ [key: string]: string }>({});
  const [showQrCode, setShowQrCode] = useState<{ [key: string]: boolean }>({
    pro: false,
    premium: false
  });

  // QR Code generation handler
  const generateQrCode = async (plan: string, amount: number) => {
    try {
      setLoading(prev => ({ ...prev, [plan]: true }));
      
      // Hide existing QR code first
      setShowQrCode(prev => ({ ...prev, [plan]: false }));
      
      // Simulate QR code generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mini QR code like in corner
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 80;
      canvas.height = 80;
      
      if (ctx) {
        // Bela pozadina
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 80, 80);
        
        // Zeleni QR kod
        ctx.fillStyle = '#4CAF50';
        
        // Ugaoni markeri (mini)
        ctx.fillRect(8, 8, 16, 16);
        ctx.fillRect(56, 8, 16, 16);
        ctx.fillRect(8, 56, 16, 16);
        
        // Beli unutrašnji kvadrati
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(11, 11, 10, 10);
        ctx.fillRect(59, 11, 10, 10);
        ctx.fillRect(11, 59, 10, 10);
        
        // Zeleni centri
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(13, 13, 6, 6);
        ctx.fillRect(61, 13, 6, 6);
        ctx.fillRect(13, 61, 6, 6);
        
        // Srednji deo - mini pattern
        ctx.fillStyle = '#4CAF50';
        
        // Glavni kvadrati
        ctx.fillRect(40, 40, 8, 8);
        ctx.fillRect(32, 40, 8, 8);
        ctx.fillRect(40, 32, 8, 8);
        ctx.fillRect(32, 32, 8, 8);
        
        // Dodatni kvadrati
        ctx.fillRect(36, 36, 4, 4);
        ctx.fillRect(44, 36, 4, 4);
        ctx.fillRect(36, 44, 4, 4);
        ctx.fillRect(44, 44, 4, 4);
      }
      
      const qrCodeDataUrl = canvas.toDataURL();
      
      setQrCodes(prev => ({ ...prev, [plan]: qrCodeDataUrl }));
      setShowQrCode(prev => ({ ...prev, [plan]: true }));
      
      console.log(`QR Code generated for ${plan} plan - ¥${amount}`);
      
    } catch (error) {
      console.error('QR generation error:', error);
      alert('QR code generation failed. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, [plan]: false }));
    }
  };

  // Static translations based on language
  const getText = () => {
    switch (currentLanguage) {
      case 'sr':
        return {
          title: "Premium funkcije",
          subtitle: "Otključajte napredne funkcije i uvid",
          premium: "Premium",
          // Payment translations
          wechatPay: "WeChat Pay",
          wechatPayDesc: "Platite putem WeChat aplikacije",
          generateQrCode: "Generiši QR kod",
          generating: "Generisanje...",
          scanWithWechat: "Skenirajte sa WeChat",
          waitingForPayment: "Čekanje na plaćanje...",
          howToPay: "Kako platiti:",
          howToPayStep1: "Kliknite 'Generiši QR kod'",
          howToPayStep2: "Otvorite WeChat i skenirajte kod",
          howToPayStep3: "Potvrdite iznos plaćanja",
          howToPayStep4: "Potvrdite plaćanje",
          proPlan: "Pro Plan",
          premiumPlan: "Premium Plan",
          advancedAnalytics: "Napredna analitika",
          dataExportDesc: "Izvezite svoje podatke u različitim formatima"
        };
      case 'zh':
        return {
          title: "高级功能",
          subtitle: "解锁高级功能和洞察",
          premium: "高级版",
          dataExport: "数据导出",
          dataExportDesc: "以多种格式导出您的数据",
          exportCSV: "导出CSV",
          exportJSON: "导出JSON",
          exportPDF: "导出PDF",
          backupSync: "备份和同步",
          backupSyncDesc: "云端备份和设备间同步",
          autoBackup: "自动备份",
          crossDeviceSync: "跨设备同步",
          versionHistory: "版本历史",
          advancedNotifications: "高级通知",
          advancedNotificationsDesc: "个性化提醒和智能警报",
          habitReminders: "习惯提醒",
          goalProgressAlerts: "目标进度警报",
          pushNotifications: "推送通知",
          pushNotificationsDesc: "设备上的实时通知",
          taskDueReminders: "任务到期提醒",
          habitStreakAlerts: "习惯连续天数警报",
          goalMilestoneNotifications: "目标里程碑通知",
          friendChallengeUpdates: "朋友挑战更新",
          configureNotifications: "配置通知",
          upgradeForPushNotifications: "升级以获得推送通知",
          offlineMode: "离线模式",
          offlineModeDesc: "无需互联网连接即可工作",
          offlineAccess: "离线访问",
          syncWhenOnline: "在线时同步",
          localStorage: "本地存储",
          customizableDashboard: "可自定义仪表板",
          customizableDashboardDesc: "组织和排列小部件",
          taskWidget: "任务小部件",
          habitsWidget: "习惯小部件",
          goalsWidget: "目标小部件",
          analyticsWidget: "分析小部件",
          aiRecommendations: "AI推荐",
          aiRecommendationsDesc: "基于您数据的个性化建议",
          habitSuggestion: "习惯建议",
          habitSuggestionDesc: "基于您的晨间习惯，尝试添加'喝水'作为日常习惯",
          goalRecommendation: "目标建议",
          goalRecommendationDesc: "您即将完成阅读目标。考虑设定新目标！",
          productivityTip: "生产力提示",
          productivityTipDesc: "您的专注会话在早上更有效。在那个时候安排重要任务。",
          getNewRecommendations: "获取新建议",
          upgradeForAiInsights: "升级以获得AI洞察",
          socialFeatures: "社交功能",
          socialFeaturesDesc: "与朋友联系和竞争",
          friendChallenges: "朋友挑战",
          friendChallengesDesc: "创建并加入朋友挑战",
          active: "活跃",
          won: "获胜",
          community: "社区",
          communityDesc: "加入论坛和群组",
          groups: "群组",
          posts: "帖子",
          shareAchievements: "分享成就",
          shareAchievementsDesc: "在社交媒体上分享您的进度",
          shared: "已分享",
          likes: "点赞",
          leaderboards: "排行榜",
          leaderboardsDesc: "在全球和朋友排行榜上竞争",
          rank: "排名",
          points: "积分",
          exploreCommunity: "探索社区",
          upgradeForSocialFeatures: "升级以获得社交功能",
          premiumContent: "高级内容",
          premiumContentDesc: "教育和健康内容",
          wellnessArticles: "健康文章",
          wellnessArticlesDesc: "关于健康和福祉的教育内容",
          articles: "文章",
          weeklyUpdates: "每周更新",
          guidedMeditations: "引导冥想",
          guidedMeditationsDesc: "放松和专注的音频会话",
          sessions: "会话",
          min: "分钟",
          workoutPlans: "锻炼计划",
          workoutPlansDesc: "结构化健身计划和锻炼",
          plans: "计划",
          allLevels: "所有级别",
          browseContentLibrary: "浏览内容库",
          upgradeForPremiumContent: "升级以获得高级内容",
          wechatPay: "微信支付",
          wechatPayDesc: "扫描二维码升级到高级版",
          proPlan: "专业版",
          premiumPlan: "高级版",
          advancedAnalytics: "高级分析",
          allProFeatures: "所有专业功能",
          generateQrCode: "生成二维码",
          generating: "生成中...",
          scanWithWechat: "使用微信扫描",
          waitingForPayment: "等待支付...",
          howToPay: "如何支付：",
          howToPayStep1: "1. 在手机上打开微信应用",
          howToPayStep2: "2. 点击'扫一扫'并扫描二维码",
          howToPayStep3: "3. 确认支付金额",
          howToPayStep4: "4. 高级功能将立即激活"
        };
      default: // English
        return {
          title: "Premium Features",
          subtitle: "Unlock advanced features and insights",
          premium: "Premium",
          dataExport: "Data Export",
          dataExportDesc: "Export your data in various formats",
          exportCSV: "Export CSV",
          exportJSON: "Export JSON",
          exportPDF: "Export PDF",
          backupSync: "Backup & Sync",
          backupSyncDesc: "Cloud backup and cross-device sync",
          autoBackup: "Auto backup",
          crossDeviceSync: "Cross-device sync",
          versionHistory: "Version history",
          advancedNotifications: "Advanced Notifications",
          advancedNotificationsDesc: "Custom reminders and smart alerts",
          habitReminders: "Habit reminders",
          goalProgressAlerts: "Goal progress alerts",
          pushNotifications: "Push Notifications",
          pushNotificationsDesc: "Real-time notifications on your device",
          taskDueReminders: "Task due reminders",
          habitStreakAlerts: "Habit streak alerts",
          goalMilestoneNotifications: "Goal milestone notifications",
          friendChallengeUpdates: "Friend challenge updates",
          configureNotifications: "Configure Notifications",
          upgradeForPushNotifications: "Upgrade for Push Notifications",
          offlineMode: "Offline Mode",
          offlineModeDesc: "Work without internet connection",
          offlineAccess: "Offline access",
          syncWhenOnline: "Sync when online",
          localStorage: "Local storage",
          customizableDashboard: "Customizable Dashboard",
          customizableDashboardDesc: "Organize and arrange widgets",
          taskWidget: "Task Widget",
          habitsWidget: "Habits Widget",
          goalsWidget: "Goals Widget",
          analyticsWidget: "Analytics Widget",
          aiRecommendations: "AI Recommendations",
          aiRecommendationsDesc: "Personalized suggestions based on your data",
          habitSuggestion: "Habit Suggestion",
          habitSuggestionDesc: "Based on your morning routine, try adding 'Drink water' as a daily habit",
          goalRecommendation: "Goal Recommendation",
          goalRecommendationDesc: "You're close to completing your reading goal. Consider setting a new target!",
          productivityTip: "Productivity Tip",
          productivityTipDesc: "Your focus sessions are most productive in the morning. Schedule important tasks then.",
          getNewRecommendations: "Get New Recommendations",
          upgradeForAiInsights: "Upgrade for AI Insights",
          socialFeatures: "Social Features",
          socialFeaturesDesc: "Connect and compete with friends",
          friendChallenges: "Friend Challenges",
          friendChallengesDesc: "Create and join challenges with friends",
          active: "Active",
          won: "Won",
          community: "Community",
          communityDesc: "Join forums and groups",
          groups: "Groups",
          posts: "Posts",
          shareAchievements: "Share Achievements",
          shareAchievementsDesc: "Share your progress on social media",
          shared: "Shared",
          likes: "Likes",
          leaderboards: "Leaderboards",
          leaderboardsDesc: "Compete on global and friend leaderboards",
          rank: "Rank",
          points: "Points",
          exploreCommunity: "Explore Community",
          upgradeForSocialFeatures: "Upgrade for Social Features",
          premiumContent: "Premium Content",
          premiumContentDesc: "Educational and wellness content",
          wellnessArticles: "Wellness Articles",
          wellnessArticlesDesc: "Educational content about health and wellness",
          articles: "Articles",
          weeklyUpdates: "Weekly Updates",
          guidedMeditations: "Guided Meditations",
          guidedMeditationsDesc: "Audio sessions for relaxation and focus",
          sessions: "Sessions",
          min: "min",
          workoutPlans: "Workout Plans",
          workoutPlansDesc: "Structured fitness programs and exercises",
          plans: "Plans",
          allLevels: "All Levels",
          browseContentLibrary: "Browse Content Library",
          upgradeForPremiumContent: "Upgrade for Premium Content",
          wechatPay: "WeChat Pay",
          wechatPayDesc: "Scan QR code to upgrade to Premium",
          proPlan: "Pro Plan",
          premiumPlan: "Premium Plan",
          advancedAnalytics: "Advanced Analytics",
          allProFeatures: "All Pro Features",
          generateQrCode: "Generate QR Code",
          generating: "Generating...",
          scanWithWechat: "Scan with WeChat",
          waitingForPayment: "Waiting for payment...",
          howToPay: "How to pay:",
          howToPayStep1: "1. Open WeChat app on your phone",
          howToPayStep2: "2. Tap 'Scan' and scan the QR code",
          howToPayStep3: "3. Confirm the payment amount",
          howToPayStep4: "4. Premium features will be activated instantly"
        };
    }
  };

  const text = getText();





  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{text.title}</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">{text.subtitle}</p>
        </div>
      </div>

      {/* Data Export Feature */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Download className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{text.dataExport}</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.dataExportDesc}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.premium}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
           <button
             disabled={!isPremium}
             className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
               isPremium
                 ? 'bg-blue-600 text-white hover:bg-blue-700'
                 : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
             }`}
           >
             {text.exportCSV}
           </button>
           <button
             disabled={!isPremium}
             className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
               isPremium
                 ? 'bg-green-600 text-white hover:bg-green-700'
                 : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
             }`}
           >
             {text.exportJSON}
           </button>
           <button
             disabled={!isPremium}
             className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
               isPremium
                 ? 'bg-red-600 text-white hover:bg-red-700'
                 : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
             }`}
           >
             {text.exportPDF}
           </button>
                  </div>
       </div>

       {/* Backup & Sync Feature */}
       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
         <div className="flex items-center justify-between mb-3 sm:mb-4">
           <div className="flex items-center gap-2 sm:gap-3">
             <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
             <div>
               <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{text.backupSync}</h3>
               <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.backupSyncDesc}</p>
             </div>
           </div>
           <div className="flex items-center gap-2 flex-shrink-0">
             <Star className="w-4 h-4 text-yellow-500" />
             <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{text.premium}</span>
           </div>
         </div>
         
         <div className="space-y-3">
           <div className="flex items-center justify-between">
             <span className="text-sm text-gray-700 dark:text-gray-300">{text.autoBackup}</span>
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
             <span className="text-sm text-gray-700 dark:text-gray-300">{text.crossDeviceSync}</span>
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
             <span className="text-sm text-gray-700 dark:text-gray-300">{text.versionHistory}</span>
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
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-purple-500" />
            <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{text.advancedNotifications}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{text.advancedNotificationsDesc}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{text.premium}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">{text.habitReminders}</span>
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
            <span className="text-sm text-gray-700 dark:text-gray-300">{text.goalProgressAlerts}</span>
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
       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
         <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <Smartphone className="w-6 h-6 text-blue-500" />
             <div>
               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{text.pushNotifications}</h3>
               <p className="text-sm text-gray-600 dark:text-gray-400">{text.pushNotificationsDesc}</p>
             </div>
           </div>
           <div className="flex items-center gap-2 flex-shrink-0">
             <Star className="w-4 h-4 text-yellow-500" />
             <span className="text-sm text-gray-600 dark:text-gray-400">{text.premium}</span>
           </div>
         </div>
         
         <div className="space-y-3">
           <div className="flex items-center justify-between">
             <span className="text-sm text-gray-700 dark:text-gray-300">{text.taskDueReminders}</span>
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
             <span className="text-sm text-gray-700 dark:text-gray-300">{text.habitStreakAlerts}</span>
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
             <span className="text-sm text-gray-700 dark:text-gray-300">{text.goalMilestoneNotifications}</span>
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
             <span className="text-sm text-gray-700 dark:text-gray-300">{text.friendChallengeUpdates}</span>
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
         
         <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
           <button
             disabled={!isPremium}
             className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
               isPremium
                 ? 'bg-blue-600 text-white hover:bg-blue-700'
                 : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
             }`}
           >
             {isPremium ? text.configureNotifications : text.upgradeForPushNotifications}
           </button>
         </div>
       </div>

       {/* Offline Mode Feature */}
       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
         <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <Wifi className="w-6 h-6 text-orange-500" />
             <div>
               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{text.offlineMode}</h3>
               <p className="text-sm text-gray-600 dark:text-gray-400">{text.offlineModeDesc}</p>
             </div>
           </div>
           <div className="flex items-center gap-2 flex-shrink-0">
             <Star className="w-4 h-4 text-yellow-500" />
             <span className="text-sm text-gray-600 dark:text-gray-400">{text.premium}</span>
           </div>
         </div>
         
         <div className="space-y-3">
           <div className="flex items-center justify-between">
             <span className="text-sm text-gray-700 dark:text-gray-300">{text.offlineAccess}</span>
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
             <span className="text-sm text-gray-700 dark:text-gray-300">{text.syncWhenOnline}</span>
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
             <span className="text-sm text-gray-700 dark:text-gray-300">{text.localStorage}</span>
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
       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
         <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <Settings className="w-6 h-6 text-indigo-500" />
             <div>
               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{text.customizableDashboard}</h3>
               <p className="text-sm text-gray-600 dark:text-gray-400">{text.customizableDashboardDesc}</p>
             </div>
           </div>
           <div className="flex items-center gap-2 flex-shrink-0">
             <Star className="w-4 h-4 text-yellow-500" />
             <span className="text-sm text-gray-600 dark:text-gray-400">{text.premium}</span>
           </div>
         </div>
         
         <div className="grid grid-cols-2 gap-3">
           <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
             <span className="text-sm text-gray-700">{text.taskWidget}</span>
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
             <span className="text-sm text-gray-700">{text.habitsWidget}</span>
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
             <span className="text-sm text-gray-700">{text.goalsWidget}</span>
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
             <span className="text-sm text-gray-700">{text.analyticsWidget}</span>
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
       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
         <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <Brain className="w-6 h-6 text-green-500" />
             <div>
               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{text.aiRecommendations}</h3>
               <p className="text-sm text-gray-600 dark:text-gray-400">{text.aiRecommendationsDesc}</p>
             </div>
           </div>
           <div className="flex items-center gap-2 flex-shrink-0">
             <Star className="w-4 h-4 text-yellow-500" />
             <span className="text-sm text-gray-600 dark:text-gray-400">{text.premium}</span>
           </div>
         </div>
         
         <div className="space-y-3">
           <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-600">
             <div className="flex items-start gap-3">
               <Brain className="w-5 h-5 text-green-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900 dark:text-white">{text.habitSuggestion}</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">{text.habitSuggestionDesc}</p>
               </div>
             </div>
           </div>
           
           <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-600">
             <div className="flex items-start gap-3">
               <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900 dark:text-white">{text.goalRecommendation}</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">{text.goalRecommendationDesc}</p>
               </div>
             </div>
           </div>
           
           <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-600">
             <div className="flex items-start gap-3">
               <Brain className="w-5 h-5 text-yellow-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900 dark:text-white">{text.productivityTip}</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">{text.productivityTipDesc}</p>
               </div>
             </div>
           </div>
         </div>
         
         <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
           <button
             disabled={!isPremium}
             className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
               isPremium
                 ? 'bg-green-600 text-white hover:bg-green-700'
                 : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
             }`}
           >
             {isPremium ? text.getNewRecommendations : text.upgradeForAiInsights}
           </button>
         </div>
       </div>

       {/* Social Features */}
       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
         <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <Users className="w-6 h-6 text-purple-500" />
             <div>
               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{text.socialFeatures}</h3>
               <p className="text-sm text-gray-600 dark:text-gray-400">{text.socialFeaturesDesc}</p>
             </div>
           </div>
           <div className="flex items-center gap-2 flex-shrink-0">
             <Star className="w-4 h-4 text-yellow-500" />
             <span className="text-sm text-gray-600 dark:text-gray-400">{text.premium}</span>
           </div>
         </div>
         
         <div className="space-y-4">
           {/* Friend Challenges */}
           <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-600">
             <div className="flex items-start gap-3">
               <Trophy className="w-5 h-5 text-purple-600 mt-0.5" />
               <div>
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{text.friendChallenges}</h4>
               <p className="text-xs text-gray-600 dark:text-gray-400">{text.friendChallengesDesc}</p>
                 <div className="mt-2 flex items-center gap-2">
                   <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">{text.active}: 2</span>
                   <span className="text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-2 py-1 rounded-full">{text.won}: 5</span>
                 </div>
               </div>
             </div>
           </div>
           
           {/* Community */}
           <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-600">
             <div className="flex items-start gap-3">
               <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900 dark:text-white">{text.community}</h4>
                 <p className="text-xs text-gray-600 dark:text-gray-400">{text.communityDesc}</p>
                 <div className="mt-2 flex items-center gap-2">
                   <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">{text.groups}: 3</span>
                   <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full">{text.posts}: 12</span>
                 </div>
               </div>
             </div>
           </div>
           
           {/* Sharing */}
           <div className="p-3 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg border border-green-200 dark:border-green-600">
             <div className="flex items-start gap-3">
               <Share2 className="w-5 h-5 text-green-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900 dark:text-white">{text.shareAchievements}</h4>
                 <p className="text-xs text-gray-600 dark:text-gray-400">{text.shareAchievementsDesc}</p>
                 <div className="mt-2 flex items-center gap-2">
                   <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">{text.shared}: 8</span>
                   <span className="text-xs bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-2 py-1 rounded-full">{text.likes}: 24</span>
                 </div>
               </div>
             </div>
           </div>

           {/* Leaderboards */}
           <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-600">
             <div className="flex items-start gap-3">
               <Trophy className="w-5 h-5 text-yellow-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900 dark:text-white">{text.leaderboards}</h4>
                 <p className="text-xs text-gray-600 dark:text-gray-400">{text.leaderboardsDesc}</p>
                 <div className="mt-2 flex items-center gap-2">
                   <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-full">{text.rank}: #15</span>
                   <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">{text.points}: 1,250</span>
                 </div>
               </div>
             </div>
           </div>
         </div>
         
         <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
           <button
             disabled={!isPremium}
             className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
               isPremium
                 ? 'bg-purple-600 text-white hover:bg-purple-700'
                 : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
             }`}
           >
             {isPremium ? text.exploreCommunity : text.upgradeForSocialFeatures}
           </button>
         </div>
       </div>

       {/* Content Library */}
       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
         <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <BookOpen className="w-6 h-6 text-emerald-500" />
             <div>
               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{text.premiumContent}</h3>
               <p className="text-sm text-gray-600 dark:text-gray-400">{text.premiumContentDesc}</p>
             </div>
           </div>
           <div className="flex items-center gap-2 flex-shrink-0">
             <Star className="w-4 h-4 text-yellow-500" />
             <span className="text-sm text-gray-600 dark:text-gray-400">{text.premium}</span>
           </div>
         </div>
         
         <div className="space-y-4">
           {/* Wellness Articles */}
           <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg border border-emerald-200 dark:border-emerald-600">
             <div className="flex items-start gap-3">
               <BookOpen className="w-5 h-5 text-emerald-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900 dark:text-white">{text.wellnessArticles}</h4>
                 <p className="text-xs text-gray-600 dark:text-gray-400">{text.wellnessArticlesDesc}</p>
                 <div className="mt-2 flex items-center gap-2">
                   <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full">50+ {text.articles}</span>
                   <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">{text.weeklyUpdates}</span>
                 </div>
               </div>
             </div>
           </div>
           
           {/* Guided Meditations */}
           <div className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-600">
             <div className="flex items-start gap-3">
               <Headphones className="w-5 h-5 text-indigo-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900 dark:text-white">{text.guidedMeditations}</h4>
                 <p className="text-xs text-gray-600 dark:text-gray-400">{text.guidedMeditationsDesc}</p>
                 <div className="mt-2 flex items-center gap-2">
                   <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full">30+ {text.sessions}</span>
                   <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">5-20 {text.min}</span>
                 </div>
               </div>
             </div>
           </div>
           
           {/* Workout Plans */}
           <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-600">
             <div className="flex items-start gap-3">
               <Dumbbell className="w-5 h-5 text-orange-600 mt-0.5" />
               <div>
                 <h4 className="text-sm font-medium text-gray-900 dark:text-white">{text.workoutPlans}</h4>
                 <p className="text-xs text-gray-600 dark:text-gray-400">{text.workoutPlansDesc}</p>
                 <div className="mt-2 flex items-center gap-2">
                   <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">20+ {text.plans}</span>
                   <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded-full">{text.allLevels}</span>
                 </div>
               </div>
             </div>
           </div>
         </div>
         
         <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
           <button
             disabled={!isPremium}
             className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
               isPremium
                 ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                 : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
             }`}
           >
             {isPremium ? text.browseContentLibrary : text.upgradeForPremiumContent}
           </button>
         </div>
       </div>

       {/* WeChat Pay Section */}
       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
         <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <QrCode className="w-6 h-6 text-green-500" />
             <div>
               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{text.wechatPay}</h3>
               <p className="text-sm text-gray-600 dark:text-gray-400">{text.wechatPayDesc}</p>
             </div>
           </div>
           <div className="flex items-center gap-2 flex-shrink-0">
             <Star className="w-4 h-4 text-yellow-500" />
             <span className="text-sm text-gray-600 dark:text-gray-400">{text.premium}</span>
           </div>
         </div>
         
         <div className="space-y-4">
           {/* Pro Plan */}
           <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-600">
             <div className="flex items-center justify-between mb-3">
               <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{text.proPlan}</h4>
               <span className="text-2xl font-bold text-green-600 dark:text-green-400">¥68</span>
             </div>
             <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 mb-4">
               <li>• {text.advancedAnalytics}</li>
               <li>• {text.pushNotifications}</li>
               <li>• {text.offlineMode}</li>
               <li>• {text.dataExport}</li>
             </ul>
             <div className="text-center">
               <button
                 onClick={() => generateQrCode('pro', 68)}
                 disabled={loading['pro']}
                 className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium"
               >
                 {loading['pro'] ? text.generating : `${text.generateQrCode} - ¥68`}
               </button>
               
               {/* QR Code Display */}
               {showQrCode['pro'] && qrCodes['pro'] && (
                 <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                   <div className="text-center">
                     <div className="flex justify-between items-center mb-2">
                       <h5 className="text-sm font-medium text-gray-900">{text.scanWithWechat}</h5>
                       <button
                         onClick={() => setShowQrCode(prev => ({ ...prev, pro: false }))}
                         className="text-gray-400 hover:text-gray-600"
                       >
                         ✕
                       </button>
                     </div>
                     <img 
                       src={qrCodes['pro']} 
                       alt="WeChat QR Code" 
                       className="mx-auto w-48 h-48 border border-gray-300 rounded-lg"
                     />
                     <p className="text-xs text-gray-500 mt-2">{text.waitingForPayment}</p>
                   </div>
                 </div>
               )}
             </div>
           </div>

           {/* Premium Plan */}
           <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-600">
             <div className="flex items-center justify-between mb-3">
               <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{text.premiumPlan}</h4>
               <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">¥128</span>
             </div>
             <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 mb-4">
               <li>• {text.allProFeatures}</li>
               <li>• {text.socialFeatures}</li>
               <li>• {text.premiumContent}</li>
               <li>• {text.customizableDashboard}</li>
             </ul>
             <div className="text-center">
               <button
                 onClick={() => generateQrCode('premium', 128)}
                 disabled={loading['premium']}
                 className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 font-medium"
               >
                 {loading['premium'] ? text.generating : `${text.generateQrCode} - ¥128`}
               </button>
               
               {/* QR Code Display */}
               {showQrCode['premium'] && qrCodes['premium'] && (
                 <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                   <div className="text-center">
                     <div className="flex justify-between items-center mb-2">
                       <h5 className="text-sm font-medium text-gray-900">{text.scanWithWechat}</h5>
                       <button
                         onClick={() => setShowQrCode(prev => ({ ...prev, premium: false }))}
                         className="text-gray-400 hover:text-gray-600"
                       >
                         ✕
                       </button>
                     </div>
                     <img 
                       src={qrCodes['premium']} 
                       alt="WeChat QR Code" 
                       className="mx-auto w-48 h-48 border border-gray-300 rounded-lg"
                     />
                     <p className="text-xs text-gray-500 mt-2">{text.waitingForPayment}</p>
                   </div>
                 </div>
               )}
             </div>
           </div>
         </div>
         
         <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
           <div className="text-center">
             <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{text.howToPay}</p>
             <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
               <p>{text.howToPayStep1}</p>
               <p>{text.howToPayStep2}</p>
               <p>{text.howToPayStep3}</p>
               <p>{text.howToPayStep4}</p>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 };
