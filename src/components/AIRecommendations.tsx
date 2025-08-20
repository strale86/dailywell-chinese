import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Target, Heart, Zap, RefreshCw, CheckCircle, AlertCircle, Info, Flag } from 'lucide-react';
import { AIRecommendationService, AIRecommendation } from '../services/aiRecommendations';
import { Task, Habit, WellnessEntry, Goal, Note } from '../types';

interface AIRecommendationsProps {
  tasks: Task[];
  habits: Habit[];
  wellnessEntries: WellnessEntry[];
  goals: Goal[];
  notes: Note[];
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  tasks,
  habits,
  wellnessEntries,
  goals,
  notes,
}) => {
  // Get current language from localStorage or default to English
  const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Static translations based on language
  const getText = () => {
    switch (currentLanguage) {
      case 'sr':
        return {
          title: "AI preporuke",
          subtitle: "Personalizovani uvid na osnovu vaših podataka o dobrobiti",
          refresh: "Osveži",
          analyzing: "Analiziranje...",
          lastUpdated: "Poslednji put ažurirano",
          noRecommendations: "Još nema preporuka",
          startUsingApp: "Počnite da koristite aplikaciju da biste dobili personalizovane AI preporuke",
          priority: "Prioritet",
          confidence: "Pouzdanost",
          suggestedAction: "Predložena akcija",
          category: "Kategorija",
          howAiWorks: "Kako AI preporuke rade",
          howAiWorksDesc: "Naš AI analizira vaše navike, zadatke, podatke o dobrobiti i ciljeve da bi pružio personalizovane preporuke za poboljšanje vaše dnevne rutine."
        };
      case 'es':
        return {
          title: "Recomendaciones de IA",
          subtitle: "Insights personalizados basados en tus datos de bienestar",
          refresh: "Actualizar",
          analyzing: "Analizando...",
          lastUpdated: "Última actualización",
          noRecommendations: "Aún no hay recomendaciones",
          startUsingApp: "Comienza a usar la aplicación para obtener recomendaciones de IA personalizadas",
          priority: "Prioridad",
          confidence: "Confianza",
          suggestedAction: "Acción sugerida",
          category: "Categoría",
          howAiWorks: "Cómo funcionan las recomendaciones de IA",
          howAiWorksDesc: "Nuestra IA analiza tus hábitos, tareas, datos de bienestar y objetivos para proporcionar recomendaciones personalizadas para mejorar tu rutina diaria."
        };
      case 'fr':
        return {
          title: "Recommandations IA",
          subtitle: "Aperçus personnalisés basés sur vos données de bien-être",
          refresh: "Actualiser",
          analyzing: "Analyse en cours...",
          lastUpdated: "Dernière mise à jour",
          noRecommendations: "Aucune recommandation pour le moment",
          startUsingApp: "Commencez à utiliser l'application pour obtenir des recommandations IA personnalisées",
          priority: "Priorité",
          confidence: "Confiance",
          suggestedAction: "Action suggérée",
          category: "Catégorie",
          howAiWorks: "Comment fonctionnent les recommandations IA",
          howAiWorksDesc: "Notre IA analyse vos habitudes, tâches, données de bien-être et objectifs pour fournir des recommandations personnalisées pour améliorer votre routine quotidienne."
        };
      default: // English
        return {
          title: "AI Recommendations",
          subtitle: "Personalized insights based on your wellness data",
          refresh: "Refresh",
          analyzing: "Analyzing...",
          lastUpdated: "Last updated",
          noRecommendations: "No recommendations yet",
          startUsingApp: "Start using the app to get personalized AI recommendations",
          priority: "Priority",
          confidence: "Confidence",
          suggestedAction: "Suggested Action",
          category: "Category",
          howAiWorks: "How AI Recommendations Work",
          howAiWorksDesc: "Our AI analyzes your habits, tasks, wellness data, and goals to provide personalized recommendations for improving your daily routine."
        };
    }
  };

  const text = getText();

  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const aiService = AIRecommendationService.getInstance();

  const generateRecommendations = async () => {
    setIsLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newRecommendations = aiService.generateRecommendations(
      tasks,
      habits,
      wellnessEntries,
      goals,
      notes
    );
    
    setRecommendations(newRecommendations);
    setLastUpdated(new Date());
    setIsLoading(false);
  };

  useEffect(() => {
    generateRecommendations();
  }, [tasks, habits, wellnessEntries, goals, notes]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'habit': return <Target className="w-5 h-5" />;
      case 'task': return <CheckCircle className="w-5 h-5" />;
      case 'goal': return <Flag className="w-5 h-5 text-blue-600" />; // GOAL ICON - FLAG
      case 'wellness': return <Heart className="w-5 h-5" />;
      case 'productivity': return <Zap className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'habit': return 'text-purple-600';
      case 'task': return 'text-green-600';
      case 'goal': return 'text-blue-600';
      case 'wellness': return 'text-pink-600';
      case 'productivity': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            {text.title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">{text.subtitle}</p>
        </div>
        <button
          onClick={generateRecommendations}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? text.analyzing : text.refresh}
        </button>
      </div>

      {lastUpdated && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {text.lastUpdated}: {lastUpdated.toLocaleTimeString()}
        </div>
      )}

      {recommendations.length === 0 ? (
        <div className="text-center py-12">
                      <Brain className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{text.noRecommendations}</h3>
          <p className="text-gray-600 dark:text-gray-400">{text.startUsingApp}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((recommendation) => (
            <div key={recommendation.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(recommendation.type)} bg-opacity-10`}>
                    {getTypeIcon(recommendation.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{recommendation.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(recommendation.priority)}`}>
                        {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} {text.priority}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {recommendation.confidence}% {text.confidence}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">{recommendation.description}</p>
              
              {recommendation.action && (
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">{text.suggestedAction}:</p>
                      <p className="text-sm text-blue-700">{recommendation.action}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {text.category}: {recommendation.category.charAt(0).toUpperCase() + recommendation.category.slice(1)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {recommendation.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-purple-900">{text.howAiWorks}</h4>
              <p className="text-sm text-purple-700 mt-1">
                {text.howAiWorksDesc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



