import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, Building, User, Globe } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useTranslation } from '../../hooks/useTranslation';
import { LanguageSelector } from '../../components/language/LanguageSelector';
import type { RegisterData, AuthError } from '../../types/auth';
import type { Language } from '../../types/language';

export function Register() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<RegisterData & { language: Language }>({
    name: '',
    email: '',
    password: '',
    department: '',
    language: 'en',
  });
  const [error, setError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // In a real app, this would make an API call
      const mockUser = {
        id: '1',
        name: formData.name,
        email: formData.email,
        role: 'user' as const,
        department: formData.department,
        joinedAt: new Date(),
        language: formData.language,
      };

      await login(mockUser);
      navigate('/');
    } catch (err) {
      setError({
        message: 'Registration failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t('auth.register')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('auth.hasAccount')}{' '}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {t('auth.login')}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error.message}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('language.select')}
              </label>
              <div className="mt-1">
                <LanguageSelector />
              </div>
            </div>

            {/* Rest of the form fields remain the same */}
          </form>
        </div>
      </div>
    </div>
  );
}