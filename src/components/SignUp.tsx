import React, { useState } from 'react';

import { Mail, Lock, Eye, EyeOff, User, Loader2, ArrowLeft } from 'lucide-react';

interface SignUpProps {
  onSignUp: (userData: SignUpData) => void;
  onLogin: () => void;
  onBack: () => void;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
}

export const SignUp: React.FC<SignUpProps> = ({ 
  onSignUp, 
  onLogin, 
  onBack 
}) => {

  // Get current language from localStorage or default to English
  const currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Static translations based on language
  const getText = () => {
    switch (currentLanguage) {
      case 'sr':
        return {
          title: "Kreirajte nalog",
          subtitle: "Započnite svoj wellness put danas",
          firstName: "Ime",
          lastName: "Prezime",
          email: "Korisničko ime",
          password: "Lozinka",
          confirmPassword: "Potvrdite lozinku",
          birthDate: "Datum rođenja",
          firstNameRequired: "Unesite vaše ime",
          lastNameRequired: "Unesite vaše prezime",
          emailRequired: "Unesite vaš email",
          validEmail: "Unesite validan email",
          passwordRequired: "Unesite lozinku",
          passwordMinLength: "Lozinka mora imati najmanje 6 karaktera",
          passwordsDoNotMatch: "Lozinke se ne poklapaju",
          createAccount: "Kreirajte nalog",
          creatingAccount: "Kreiranje naloga...",
          hasAccount: "Već imate nalog?",
          signIn: "Prijavite se",
          back: "Nazad",
          month: "Mesec",
          day: "Dan",
          year: "Godina",
          months: {
            "01": "Januar",
            "02": "Februar", 
            "03": "Mart",
            "04": "April",
            "05": "Maj",
            "06": "Jun",
            "07": "Jul",
            "08": "Avgust",
            "09": "Septembar",
            "10": "Oktobar",
            "11": "Novembar",
            "12": "Decembar"
          }
        };
      case 'es':
        return {
          title: "Crear cuenta",
          subtitle: "Comienza tu viaje de bienestar hoy",
          firstName: "Nombre",
          lastName: "Apellido",
          email: "Dirección de correo electrónico",
          password: "Contraseña",
          confirmPassword: "Confirmar contraseña",
          birthDate: "Fecha de nacimiento",
          firstNameRequired: "Por favor ingresa tu nombre",
          lastNameRequired: "Por favor ingresa tu apellido",
          emailRequired: "Por favor ingresa tu correo electrónico",
          validEmail: "Por favor ingresa un correo electrónico válido",
          passwordRequired: "Por favor ingresa una contraseña",
          passwordMinLength: "La contraseña debe tener al menos 6 caracteres",
          passwordsDoNotMatch: "Las contraseñas no coinciden",
          createAccount: "Crear cuenta",
          creatingAccount: "Creando cuenta...",
          hasAccount: "¿Ya tienes una cuenta?",
          signIn: "Iniciar sesión",
          back: "Atrás",
          month: "Mes",
          day: "Día",
          year: "Año",
          months: {
            "01": "Enero",
            "02": "Febrero", 
            "03": "Marzo",
            "04": "Abril",
            "05": "Mayo",
            "06": "Junio",
            "07": "Julio",
            "08": "Agosto",
            "09": "Septiembre",
            "10": "Octubre",
            "11": "Noviembre",
            "12": "Diciembre"
          }
        };
      case 'fr':
        return {
          title: "Créer un compte",
          subtitle: "Commencez votre voyage de bien-être aujourd'hui",
          firstName: "Prénom",
          lastName: "Nom de famille",
          email: "Adresse e-mail",
          password: "Mot de passe",
          confirmPassword: "Confirmer le mot de passe",
          birthDate: "Date de naissance",
          firstNameRequired: "Veuillez entrer votre prénom",
          lastNameRequired: "Veuillez entrer votre nom de famille",
          emailRequired: "Veuillez entrer votre e-mail",
          validEmail: "Veuillez entrer un e-mail valide",
          passwordRequired: "Veuillez entrer un mot de passe",
          passwordMinLength: "Le mot de passe doit contenir au moins 6 caractères",
          passwordsDoNotMatch: "Les mots de passe ne correspondent pas",
          createAccount: "Créer un compte",
          creatingAccount: "Création du compte...",
          hasAccount: "Vous avez déjà un compte ?",
          signIn: "Se connecter",
          back: "Retour",
          month: "Mois",
          day: "Jour",
          year: "Année",
          months: {
            "01": "Janvier",
            "02": "Février", 
            "03": "Mars",
            "04": "Avril",
            "05": "Mai",
            "06": "Juin",
            "07": "Juillet",
            "08": "Août",
            "09": "Septembre",
            "10": "Octobre",
            "11": "Novembre",
            "12": "Décembre"
          }
        };
      case 'zh':
        return {
          title: "创建账户",
          subtitle: "今天开始您的健康之旅",
          firstName: "名字",
          lastName: "姓氏",
          email: "用户名",
          password: "密码",
          confirmPassword: "确认密码",
          birthDate: "出生日期",
          firstNameRequired: "请输入您的名字",
          lastNameRequired: "请输入您的姓氏",
          emailRequired: "请输入您的邮箱",
          validEmail: "请输入有效的邮箱",
          passwordRequired: "请输入密码",
          passwordMinLength: "密码至少需要6个字符",
          passwordsDoNotMatch: "密码不匹配",
          createAccount: "创建账户",
          creatingAccount: "创建账户中...",
          hasAccount: "已有账户？",
          signIn: "登录",
          back: "返回",
          month: "月",
          day: "日",
          year: "年",
          months: {
            "01": "一月",
            "02": "二月", 
            "03": "三月",
            "04": "四月",
            "05": "五月",
            "06": "六月",
            "07": "七月",
            "08": "八月",
            "09": "九月",
            "10": "十月",
            "11": "十一月",
            "12": "十二月"
          }
        };
      default: // English
        return {
          title: "Create Account",
          subtitle: "Start your wellness journey today",
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email address",
          password: "Password",
          confirmPassword: "Confirm Password",
          birthDate: "Date of Birth",
          firstNameRequired: "Please enter your first name",
          lastNameRequired: "Please enter your last name",
          emailRequired: "Please enter your email",
          validEmail: "Please enter a valid email",
          passwordRequired: "Please enter a password",
          passwordMinLength: "Password must be at least 6 characters",
          passwordsDoNotMatch: "Passwords do not match",
          createAccount: "Create Account",
          creatingAccount: "Creating account...",
          hasAccount: "Already have an account?",
          signIn: "Sign In",
          back: "Back",
          month: "Month",
          day: "Day",
          year: "Year",
          months: {
            "01": "January",
            "02": "February", 
            "03": "March",
            "04": "April",
            "05": "May",
            "06": "June",
            "07": "July",
            "08": "August",
            "09": "September",
            "10": "October",
            "11": "November",
            "12": "December"
          }
        };
    }
  };

  const text = getText();

  const [formData, setFormData] = useState<SignUpData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', general: '' });



  const handleSignUp = async () => {
    console.log('handleSignUp called with:', formData);
    
    // Reset errors
    setErrors({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', general: '' });
    
    let hasErrors = false;
    const newErrors = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', general: '' };

    if (!formData.firstName) {
      newErrors.firstName = text.firstNameRequired;
      hasErrors = true;
    }

    if (!formData.lastName) {
      newErrors.lastName = text.lastNameRequired;
      hasErrors = true;
    }

    if (!formData.email) {
      newErrors.email = text.emailRequired;
      hasErrors = true;
    } else if (!formData.email.includes('@')) {
              newErrors.email = text.validEmail;
      hasErrors = true;
    }

    if (!formData.password) {
      newErrors.password = text.passwordRequired;
      hasErrors = true;
    } else if (formData.password.length < 6) {
      newErrors.password = text.passwordMinLength;
      hasErrors = true;
    }

    if (!formData.confirmPassword) {
              newErrors.confirmPassword = text.passwordsDoNotMatch;
      hasErrors = true;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = text.passwordsDoNotMatch;
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    console.log('All validations passed, calling onSignUp...');
    setIsLoading(true);
    try {
      await onSignUp(formData);
      console.log('Sign up successful, redirecting to login...');
      // Ako je uspešno, prebaci na login
      onLogin();
    } catch (error) {
      console.error('Sign up failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed';
      setErrors({ ...newErrors, general: errorMessage });
      console.log('Error message set:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };



  const updateFormData = (field: keyof SignUpData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center px-3 sm:px-4 py-4 sm:py-8">
      <div className="max-w-sm sm:max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <button
            onClick={onBack}
            className="absolute top-4 sm:top-6 left-3 sm:left-6 p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/30 transition-all text-white"
            title={text.back}
          >
            <ArrowLeft size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">{text.title}</h1>
          <p className="text-white/90 text-sm sm:text-base">{text.subtitle}</p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 border border-white/20">
          {/* General Error */}
          {errors.general && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
              {errors.general}
            </div>
          )}
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="relative">
              <User size={18} className="absolute left-3 top-3 text-gray-400 dark:text-gray-500 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder={text.firstName}
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
                className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base ${
                  errors.firstName ? 'border-red-500' : 'border-white/30'
                }`}
              />
              {errors.firstName && (
                <p className="text-red-200 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="relative">
              <User size={18} className="absolute left-3 top-3 text-gray-400 dark:text-gray-500 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder={text.lastName}
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base ${
                  errors.lastName ? 'border-red-500' : 'border-white/30'
                }`}
              />
              {errors.lastName && (
                <p className="text-red-200 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3 text-gray-400 dark:text-gray-500 sm:w-5 sm:h-5" />
            <input
              type="email"
              placeholder={text.email}
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base ${
                errors.email ? 'border-red-500' : 'border-white/30'
              }`}
            />
            {errors.email && (
              <p className="text-red-200 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Birth Date - Custom Design */}
          <div className="relative">
            <label className="block text-white/90 text-xs sm:text-sm mb-2 font-medium">
              {text.birthDate}
            </label>
            <div className="flex space-x-1 sm:space-x-2">
              {/* Month */}
              <div className="flex-1">
                <select
                  value={formData.birthDate.split('/')[0] || ''}
                  onChange={(e) => {
                    const parts = formData.birthDate.split('/');
                    const newDate = `${e.target.value}/${parts[1] || ''}/${parts[2] || ''}`;
                    updateFormData('birthDate', newDate);
                  }}
                  className="w-full px-2 sm:px-3 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 text-xs sm:text-sm"
                >
                  <option value="">{text.month}</option>
                  <option value="01">{text.months["01"]}</option>
                  <option value="02">{text.months["02"]}</option>
                  <option value="03">{text.months["03"]}</option>
                  <option value="04">{text.months["04"]}</option>
                  <option value="05">{text.months["05"]}</option>
                  <option value="06">{text.months["06"]}</option>
                  <option value="07">{text.months["07"]}</option>
                  <option value="08">{text.months["08"]}</option>
                  <option value="09">{text.months["09"]}</option>
                  <option value="10">{text.months["10"]}</option>
                  <option value="11">{text.months["11"]}</option>
                  <option value="12">{text.months["12"]}</option>
                </select>
              </div>
              
              {/* Day */}
              <div className="flex-1">
                <select
                  value={formData.birthDate.split('/')[1] || ''}
                  onChange={(e) => {
                    const parts = formData.birthDate.split('/');
                    const newDate = `${parts[0] || ''}/${e.target.value}/${parts[2] || ''}`;
                    updateFormData('birthDate', newDate);
                  }}
                  className="w-full px-2 sm:px-3 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 text-xs sm:text-sm"
                >
                  <option value="">{text.day}</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Year */}
              <div className="flex-1">
                <select
                  value={formData.birthDate.split('/')[2] || ''}
                  onChange={(e) => {
                    const parts = formData.birthDate.split('/');
                    const newDate = `${parts[0] || ''}/${parts[1] || ''}/${e.target.value}`;
                    updateFormData('birthDate', newDate);
                  }}
                  className="w-full px-2 sm:px-3 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 text-xs sm:text-sm"
                >
                  <option value="">{text.year}</option>
                  {Array.from({ length: 100 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-gray-400 dark:text-gray-500 sm:w-5 sm:h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={text.password}
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              className={`w-full pl-9 sm:pl-10 pr-12 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base ${
                errors.password ? 'border-red-500' : 'border-white/30'
              }`}
            />
            {errors.password && (
              <p className="text-red-200 text-xs mt-1">{errors.password}</p>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
            >
              {showPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-gray-400 dark:text-gray-500 sm:w-5 sm:h-5" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={text.confirmPassword}
              value={formData.confirmPassword}
              onChange={(e) => updateFormData('confirmPassword', e.target.value)}
              className={`w-full pl-9 sm:pl-10 pr-12 py-2 sm:py-3 bg-white/80 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base ${
                errors.confirmPassword ? 'border-red-500' : 'border-white/30'
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-200 text-xs mt-1">{errors.confirmPassword}</p>
            )}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
            >
              {showConfirmPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}
            </button>
          </div>

          {/* Sign Up Button */}
          <button
            type="button"
            onClick={() => {
              console.log('Button clicked!');
              handleSignUp();
            }}
            disabled={isLoading}
            className={`w-full py-2 sm:py-3 rounded-xl font-semibold text-white transition-all text-sm sm:text-base ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 size={18} className="animate-spin mr-2 sm:w-5 sm:h-5" />
                {text.creatingAccount}
              </div>
            ) : (
              text.createAccount
            )}
          </button>



          {/* Login Link */}
          <div className="text-center mt-4 sm:mt-6">
            <span className="text-white/90 text-sm sm:text-base">{text.hasAccount} </span>
            <button
              onClick={onLogin}
              className="text-white font-semibold hover:text-white/80 transition-colors text-sm sm:text-base"
            >
              {text.signIn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
