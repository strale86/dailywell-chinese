import React, { useEffect } from 'react';
import { exchangeCodeForToken, getUserInfo } from '../config/oauth';
import { useTranslation } from 'react-i18next';

interface OAuthCallbackProps {
  provider: 'google' | 'apple' | 'wechat' | 'alipay';
}

export const OAuthCallback: React.FC<OAuthCallbackProps> = ({ provider }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');
      const state = urlParams.get('state');

      if (error) {
        // Handle OAuth error
        window.opener?.postMessage({
          type: 'oauth_callback',
          error: error
        }, window.location.origin);
        window.close();
        return;
      }

      if (code && state) {
        try {
          // Exchange code for access token
          const tokenResponse = await exchangeCodeForToken(provider, code);
          
          // Get user info
          const userInfo = await getUserInfo(provider, tokenResponse.access_token);
          
          // Send success message to parent window
          window.opener?.postMessage({
            type: 'oauth_callback',
            code: code,
            state: state,
            user: userInfo
          }, window.location.origin);
          
          window.close();
        } catch (error) {
          // Handle exchange error
          window.opener?.postMessage({
            type: 'oauth_callback',
            error: error instanceof Error ? error.message : 'Unknown error'
          }, window.location.origin);
          window.close();
        }
      }
    };

    handleOAuthCallback();
  }, [provider]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {t('oauthCallback.processingLogin')}
        </h2>
        <p className="text-gray-600">
          {t('oauthCallback.pleaseWait')}
        </p>
      </div>
    </div>
  );
};
