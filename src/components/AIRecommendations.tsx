import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Target, Heart, Zap, RefreshCw, CheckCircle, AlertCircle, Info } from 'lucide-react';
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
      case 'goal': return <TrendingUp className="w-5 h-5" />;
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            AI Recommendations
          </h2>
          <p className="text-gray-600">Personalized insights based on your data</p>
        </div>
        <button
          onClick={generateRecommendations}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Analyzing...' : 'Refresh'}
        </button>
      </div>

      {lastUpdated && (
        <div className="text-sm text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}

      {recommendations.length === 0 ? (
        <div className="text-center py-12">
          <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No recommendations yet</h3>
          <p className="text-gray-600">Start using the app to get personalized AI recommendations</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((recommendation) => (
            <div key={recommendation.id} className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(recommendation.type)} bg-opacity-10`}>
                    {getTypeIcon(recommendation.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{recommendation.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(recommendation.priority)}`}>
                        {recommendation.priority} priority
                      </span>
                      <span className="text-xs text-gray-500">
                        {recommendation.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{recommendation.description}</p>
              
              {recommendation.action && (
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Suggested Action:</p>
                      <p className="text-sm text-blue-700">{recommendation.action}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Category: {recommendation.category}
                  </span>
                  <span className="text-xs text-gray-500">
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
              <h4 className="text-sm font-medium text-purple-900">How AI Recommendations Work</h4>
              <p className="text-sm text-purple-700 mt-1">
                Our AI analyzes your tasks, habits, wellness data, and goals to provide personalized suggestions 
                for improving your productivity and well-being. Recommendations are updated automatically as you use the app.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


