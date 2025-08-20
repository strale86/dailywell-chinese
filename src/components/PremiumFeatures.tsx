import React, { useState } from 'react';
import { Download, Bell, Wifi, Settings, Star, Brain, Cloud, Users, Trophy, MessageCircle, Share2, BookOpen, Headphones, Dumbbell, Smartphone, QrCode } from 'lucide-react';


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

  // Static translations based on language
  const getText = () => {
    switch (currentLanguage) {
      case 'sr':
        return {
          title: "Premium funkcije",
          subtitle: "Otključajte napredne funkcije i uvid",
          premium: "Premium",
          dataExport: "Izvoz podataka",
          dataExportDesc: "Izvezite svoje podatke u različitim formatima",
          exportCSV: "Izvezi CSV",
          exportJSON: "Izvezi JSON",
          exportPDF: "Izvezi PDF",
          backupSync: "Backup i sinhronizacija",
          backupSyncDesc: "Cloud backup i sinhronizacija između uređaja",
          autoBackup: "Automatski backup",
          crossDeviceSync: "Sinhronizacija između uređaja",
          versionHistory: "Istorija verzija",
          advancedNotifications: "Napredne notifikacije",
          advancedNotificationsDesc: "Prilagođeni podsetnici i pametna upozorenja",
          habitReminders: "Podsetnici za navike",
          goalProgressAlerts: "Upozorenja o napretku ciljeva",
          pushNotifications: "Push notifikacije",
          pushNotificationsDesc: "Notifikacije u realnom vremenu na vašem uređaju",
          taskDueReminders: "Podsetnici za rokove zadataka",
          habitStreakAlerts: "Upozorenja o seriji navika",
          goalMilestoneNotifications: "Notifikacije o prekretnicama ciljeva",
          friendChallengeUpdates: "Ažuriranja izazova prijatelja",
          configureNotifications: "Konfiguriši notifikacije",
          upgradeForPushNotifications: "Nadogradi za push notifikacije",
          offlineMode: "Offline mod",
          offlineModeDesc: "Radite bez internet konekcije",
          offlineAccess: "Offline pristup",
          syncWhenOnline: "Sinhronizuj kada ste online",
          localStorage: "Lokalno skladištenje",
          customizableDashboard: "Prilagodljiv dashboard",
          customizableDashboardDesc: "Organizujte i rasporedite widgete",
          taskWidget: "Widget zadataka",
          habitsWidget: "Widget navika",
          goalsWidget: "Widget ciljeva",
          analyticsWidget: "Widget analitike",
          aiRecommendations: "AI preporuke",
          aiRecommendationsDesc: "Personalizovane sugestije na osnovu vaših podataka",
          habitSuggestion: "Preporuka navike",
          habitSuggestionDesc: "Na osnovu vaše jutarnje rutine, pokušajte da dodate 'Pij vodu' kao dnevnu naviku",
          goalRecommendation: "Preporuka cilja",
          goalRecommendationDesc: "Blizu ste završavanja vašeg cilja čitanja. Razmislite o postavljanju novog cilja!",
          productivityTip: "Savet za produktivnost",
          productivityTipDesc: "Vaše sesije fokusa su najproduktivnije ujutru. Zakažite važne zadatke tada.",
          getNewRecommendations: "Dobavi nove preporuke",
          upgradeForAiInsights: "Nadogradi za AI uvid",
          socialFeatures: "Društvene funkcije",
          socialFeaturesDesc: "Povežite se i takmičite sa prijateljima",
          friendChallenges: "Izazovi prijatelja",
          friendChallengesDesc: "Kreirajte i pridružite se izazovima sa prijateljima",
          active: "Aktivno",
          won: "Pobedeno",
          community: "Zajednica",
          communityDesc: "Pridružite se forumima i grupama",
          groups: "Grupe",
          posts: "Objave",
          shareAchievements: "Podeli dostignuća",
          shareAchievementsDesc: "Podelite svoj napredak na društvenim mrežama",
          shared: "Podeljeno",
          likes: "Lajkovi",
          leaderboards: "Tabele rangiranja",
          leaderboardsDesc: "Takmičite se na globalnim i prijateljskim tabelama rangiranja",
          rank: "Rang",
          points: "Poeni",
          exploreCommunity: "Istraži zajednicu",
          upgradeForSocialFeatures: "Nadogradi za društvene funkcije",
          premiumContent: "Premium sadržaj",
          premiumContentDesc: "Edukativni i wellness sadržaj",
          wellnessArticles: "Članci o dobrobiti",
          wellnessArticlesDesc: "Edukativni sadržaj o zdravlju i dobrobiti",
          articles: "Članci",
          weeklyUpdates: "Nedeljna ažuriranja",
          guidedMeditations: "Vođene meditacije",
          guidedMeditationsDesc: "Audio sesije za opuštanje i fokus",
          sessions: "Sesije",
          min: "min",
          workoutPlans: "Planovi vežbanja",
          workoutPlansDesc: "Strukturirani fitness programi i vežbe",
          plans: "Planovi",
          allLevels: "Svi nivoi",
          browseContentLibrary: "Pregledaj biblioteku sadržaja",
          upgradeForPremiumContent: "Nadogradi za premium sadržaj",
          wechatPay: "WeChat Pay",
          wechatPayDesc: "Skenirajte QR kod da nadogradite na Premium",
          proPlan: "Pro plan",
          premiumPlan: "Premium plan",
          advancedAnalytics: "Napredna analitika",
          allProFeatures: "Sve Pro funkcije",
          generateQrCode: "Generiši QR kod",
          generating: "Generisanje...",
          scanWithWechat: "Skeniraj sa WeChat",
          waitingForPayment: "Čekanje na plaćanje...",
          howToPay: "Kako platiti:",
          howToPayStep1: "1. Otvorite WeChat aplikaciju na vašem telefonu",
          howToPayStep2: "2. Tapnite 'Skeniraj' i skenirajte QR kod",
          howToPayStep3: "3. Potvrdite iznos plaćanja",
          howToPayStep4: "4. Premium funkcije će biti aktivirane trenutno"
        };
      case 'es':
        return {
          title: "Funciones premium",
          subtitle: "Desbloquea funciones avanzadas e insights",
          premium: "Premium",
          dataExport: "Exportación de datos",
          dataExportDesc: "Exporta tus datos en varios formatos",
          exportCSV: "Exportar CSV",
          exportJSON: "Exportar JSON",
          exportPDF: "Exportar PDF",
          backupSync: "Respaldo y sincronización",
          backupSyncDesc: "Respaldo en la nube y sincronización entre dispositivos",
          autoBackup: "Respaldo automático",
          crossDeviceSync: "Sincronización entre dispositivos",
          versionHistory: "Historial de versiones",
          advancedNotifications: "Notificaciones avanzadas",
          advancedNotificationsDesc: "Recordatorios personalizados y alertas inteligentes",
          habitReminders: "Recordatorios de hábitos",
          goalProgressAlerts: "Alertas de progreso de objetivos",
          pushNotifications: "Notificaciones push",
          pushNotificationsDesc: "Notificaciones en tiempo real en tu dispositivo",
          taskDueReminders: "Recordatorios de tareas vencidas",
          habitStreakAlerts: "Alertas de racha de hábitos",
          goalMilestoneNotifications: "Notificaciones de hitos de objetivos",
          friendChallengeUpdates: "Actualizaciones de desafíos de amigos",
          configureNotifications: "Configurar notificaciones",
          upgradeForPushNotifications: "Actualizar para notificaciones push",
          offlineMode: "Modo sin conexión",
          offlineModeDesc: "Funciona sin conexión a internet",
          offlineAccess: "Acceso sin conexión",
          syncWhenOnline: "Sincronizar cuando esté en línea",
          localStorage: "Almacenamiento local",
          customizableDashboard: "Panel personalizable",
          customizableDashboardDesc: "Organiza y organiza widgets",
          taskWidget: "Widget de tareas",
          habitsWidget: "Widget de hábitos",
          goalsWidget: "Widget de objetivos",
          analyticsWidget: "Widget de análisis",
          aiRecommendations: "Recomendaciones de IA",
          aiRecommendationsDesc: "Sugerencias personalizadas basadas en tus datos",
          habitSuggestion: "Sugerencia de hábito",
          habitSuggestionDesc: "Basado en tu rutina matutina, intenta agregar 'beber agua' como hábito diario",
          goalRecommendation: "Recomendación de objetivo",
          goalRecommendationDesc: "Estás cerca de completar tu objetivo de lectura. ¡Considera establecer un nuevo objetivo!",
          productivityTip: "Consejo de productividad",
          productivityTipDesc: "Tus sesiones de enfoque son más efectivas por la mañana. Programa tareas importantes en ese momento.",
          getNewRecommendations: "Obtener nuevas recomendaciones",
          upgradeForAiInsights: "Actualizar para insights de IA",
          socialFeatures: "Funciones sociales",
          socialFeaturesDesc: "Conéctate y compite con amigos",
          friendChallenges: "Desafíos de amigos",
          friendChallengesDesc: "Crea y únete a desafíos de amigos",
          active: "Activo",
          won: "Ganado",
          community: "Comunidad",
          communityDesc: "Únete a foros y grupos",
          groups: "Grupos",
          posts: "Publicaciones",
          shareAchievements: "Compartir logros",
          shareAchievementsDesc: "Comparte tu progreso en redes sociales",
          shared: "Compartido",
          likes: "Me gusta",
          leaderboards: "Tablas de clasificación",
          leaderboardsDesc: "Compite en tablas de clasificación globales y de amigos",
          rank: "Rango",
          points: "Puntos",
          exploreCommunity: "Explorar comunidad",
          upgradeForSocialFeatures: "Actualizar para funciones sociales",
          premiumContent: "Contenido premium",
          premiumContentDesc: "Contenido educativo y de bienestar",
          wellnessArticles: "Artículos de bienestar",
          wellnessArticlesDesc: "Contenido educativo sobre salud y bienestar",
          articles: "Artículos",
          weeklyUpdates: "Actualizaciones semanales",
          guidedMeditations: "Meditaciones guiadas",
          guidedMeditationsDesc: "Sesiones de audio para relajación y enfoque",
          sessions: "Sesiones",
          min: "min",
          workoutPlans: "Planes de entrenamiento",
          workoutPlansDesc: "Planes de fitness estructurados y ejercicios",
          plans: "Planes",
          allLevels: "Todos los niveles",
          browseContentLibrary: "Explorar biblioteca de contenido",
          upgradeForPremiumContent: "Actualizar para contenido premium",
          wechatPay: "Pago WeChat",
          wechatPayDesc: "Escanee el código QR para actualizar a premium",
          proPlan: "Plan Pro",
          premiumPlan: "Plan Premium",
          advancedAnalytics: "Análisis avanzado",
          allProFeatures: "Todas las funciones Pro",
          generateQrCode: "Generar código QR",
          generating: "Generando...",
          scanWithWechat: "Escanear con WeChat",
          waitingForPayment: "Esperando pago...",
          howToPay: "Cómo pagar:",
          howToPayStep1: "1. 在手机上打开微信应用",
          howToPayStep2: "2. 点击'扫一扫'并扫描二维码",
          howToPayStep3: "3. 确认支付金额",
          howToPayStep4: "4. 高级功能将立即激活"
        };
      case 'fr':
        return {
          title: "Fonctionnalités Premium",
          subtitle: "Débloquez des fonctionnalités avancées et des insights",
          premium: "Premium",
          dataExport: "Exportation de données",
          dataExportDesc: "Exportez vos données dans différents formats",
          exportCSV: "Exporter CSV",
          exportJSON: "Exporter JSON",
          exportPDF: "Exporter PDF",
          backupSync: "Sauvegarde et synchronisation",
          backupSyncDesc: "Sauvegarde cloud et synchronisation multi-appareils",
          autoBackup: "Sauvegarde automatique",
          crossDeviceSync: "Synchronisation multi-appareils",
          versionHistory: "Historique des versions",
          advancedNotifications: "Notifications avancées",
          advancedNotificationsDesc: "Rappels personnalisés et alertes intelligentes",
          habitReminders: "Rappels d'habitudes",
          goalProgressAlerts: "Alertes de progression d'objectifs",
          pushNotifications: "Notifications en temps réel sur votre appareil",
          pushNotificationsDesc: "Push en temps réel sur votre appareil",
          taskDueReminders: "Rappels d'échéance de tâches",
          habitStreakAlerts: "Alertes de série d'habitudes",
          goalMilestoneNotifications: "Notifications de jalons d'objectifs",
          friendChallengeUpdates: "Mises à jour de défis d'amis",
          configureNotifications: "Configurer les notifications",
          upgradeForPushNotifications: "Mettre à niveau pour les notifications push",
          offlineMode: "Mode hors ligne",
          offlineModeDesc: "Travaillez sans connexion internet",
          offlineAccess: "Accès hors ligne",
          syncWhenOnline: "Synchroniser quand en ligne",
          localStorage: "Stockage local",
          customizableDashboard: "Tableau de bord personnalisable",
          customizableDashboardDesc: "Organisez et arrangez les widgets",
          taskWidget: "Widget de tâches",
          habitsWidget: "Widget d'habitudes",
          goalsWidget: "Widget d'objectifs",
          analyticsWidget: "Widget d'analyses",
          aiRecommendations: "Recommandations IA",
          aiRecommendationsDesc: "Suggestions personnalisées basées sur vos données",
          habitSuggestion: "Suggestion d'habitude",
          habitSuggestionDesc: "Basé sur votre routine matinale, essayez d'ajouter 'Boire de l'eau' comme habitude quotidienne",
          goalRecommendation: "Recommandation d'objectif",
          goalRecommendationDesc: "Vous êtes proche de terminer votre objectif de lecture. Considérez définir une nouvelle cible !",
          productivityTip: "Conseil de productivité",
          productivityTipDesc: "Vos sessions de concentration sont les plus productives le matin. Planifiez les tâches importantes à ce moment-là.",
          getNewRecommendations: "Obtenir de nouvelles recommandations",
          upgradeForAiInsights: "Mettre à niveau pour les insights IA",
          socialFeatures: "Fonctionnalités sociales",
          socialFeaturesDesc: "Connectez-vous et rivalisez avec des amis",
          friendChallenges: "Défis d'amis",
          friendChallengesDesc: "Créez et rejoignez des défis avec des amis",
          active: "Actif",
          won: "Gagné",
          community: "Communauté",
          communityDesc: "Rejoignez des forums et des groupes",
          groups: "Groupes",
          posts: "Publications",
          shareAchievements: "Partager les réalisations",
          shareAchievementsDesc: "Partagez vos progrès sur les réseaux sociaux",
          shared: "Partagé",
          likes: "J'aime",
          leaderboards: "Classements",
          leaderboardsDesc: "Rivalisez sur les classements globaux et entre amis",
          rank: "Rang",
          points: "Points",
          exploreCommunity: "Explorer la communauté",
          upgradeForSocialFeatures: "Mettre à niveau pour les fonctionnalités sociales",
          premiumContent: "Contenu premium",
          premiumContentDesc: "Contenu éducatif et de bien-être",
          wellnessArticles: "Articles de bien-être",
          wellnessArticlesDesc: "Contenu éducatif sur la santé et le bien-être",
          articles: "Articles",
          weeklyUpdates: "Mises à jour hebdomadaires",
          guidedMeditations: "Méditations guidées",
          guidedMeditationsDesc: "Sessions audio pour la relaxation et la concentration",
          sessions: "Sessions",
          min: "min",
          workoutPlans: "Plans d'entraînement",
          workoutPlansDesc: "Programmes de fitness structurés et exercices",
          plans: "Plans",
          allLevels: "Tous niveaux",
          browseContentLibrary: "Parcourir la bibliothèque de contenu",
          upgradeForPremiumContent: "Mettre à niveau pour le contenu premium",
          wechatPay: "Paiement WeChat",
          wechatPayDesc: "Scannez le code QR pour passer à Premium",
          proPlan: "Plan Pro",
          premiumPlan: "Plan Premium",
          advancedAnalytics: "Analyses avancées",
          allProFeatures: "Toutes les fonctionnalités Pro",
          generateQrCode: "Générer le code QR",
          generating: "Génération...",
          scanWithWechat: "Scanner avec WeChat",
          waitingForPayment: "En attente de paiement...",
          howToPay: "Comment payer :",
          howToPayStep1: "1. Ouvrez l'application WeChat sur votre téléphone",
          howToPayStep2: "2. Appuyez sur 'Scanner' et scannez le code QR",
          howToPayStep3: "3. Confirmez le montant du paiement",
          howToPayStep4: "4. Les fonctionnalités Premium seront activées instantanément"
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
               {!qrCodes['pro'] ? (
                 <button
                   onClick={() => generateQrCode('pro', 68)}
                   disabled={loading['pro']}
                   className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                 >
                   {loading['pro'] ? text.generating : text.generateQrCode}
                 </button>
               ) : (
                 <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-green-200 dark:border-green-600 inline-block">
                   <div className="w-32 h-32 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                     <QrCode className="w-16 h-16 text-green-500" />
                   </div>
                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{text.scanWithWechat}</p>
                   {paymentStatus['pro'] === 'pending' && (
                     <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">{text.waitingForPayment}</p>
                   )}
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
               {!qrCodes['premium'] ? (
                 <button
                   onClick={() => generateQrCode('premium', 128)}
                   disabled={loading['premium']}
                   className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                 >
                   {loading['premium'] ? text.generating : text.generateQrCode}
                 </button>
               ) : (
                 <div className="bg-white dark:bg-gray-700 p-3 rounded-lg border border-purple-200 dark:border-purple-600 inline-block">
                   <div className="w-32 h-32 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                     <QrCode className="w-16 h-16 text-purple-500" />
                   </div>
                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{text.scanWithWechat}</p>
                   {paymentStatus['premium'] === 'pending' && (
                     <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">{text.waitingForPayment}</p>
                   )}
                 </div>
               )}
             </div>
           </div>
         </div>
         
         <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
           <div className="text-center">
             <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{text.howToPay}</p>
             <ol className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
               <li>1. {text.howToPayStep1}</li>
               <li>2. {text.howToPayStep2}</li>
               <li>3. {text.howToPayStep3}</li>
               <li>4. {text.howToPayStep4}</li>
             </ol>
           </div>
         </div>
       </div>
     </div>
   );
 };
