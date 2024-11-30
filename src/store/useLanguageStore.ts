import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language, LanguageState } from '../types/language';

interface LanguageStore extends LanguageState {
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      currentLanguage: 'en',
      translations: {
        // Navigation
        'nav.memoryFeed': {
          en: 'Memory Feed',
          es: 'Feed de Memorias'
        },
        'nav.timeline': {
          en: 'Timeline',
          es: 'Línea de Tiempo'
        },
        'nav.teamStories': {
          en: 'Team Stories',
          es: 'Historias del Equipo'
        },
        'nav.achievements': {
          en: 'Achievements',
          es: 'Logros'
        },
        'nav.analytics': {
          en: 'Analytics',
          es: 'Análisis'
        },
        'nav.settings': {
          en: 'Settings',
          es: 'Configuración'
        },

        // Memory Feed
        'memory.create.title': {
          en: 'Create Memory',
          es: 'Crear Memoria'
        },
        'memory.type.milestone': {
          en: 'Milestone',
          es: 'Hito'
        },
        'memory.type.achievement': {
          en: 'Achievement',
          es: 'Logro'
        },
        'memory.type.project': {
          en: 'Project',
          es: 'Proyecto'
        },
        'memory.type.story': {
          en: 'Story',
          es: 'Historia'
        },
        'memory.visibility.private': {
          en: 'Private',
          es: 'Privado'
        },
        'memory.visibility.team': {
          en: 'Team',
          es: 'Equipo'
        },
        'memory.visibility.company': {
          en: 'Company',
          es: 'Empresa'
        },
        'memory.visibility.public': {
          en: 'Public',
          es: 'Público'
        },

        // Groups
        'groups.title': {
          en: 'Groups',
          es: 'Grupos'
        },
        'groups.create': {
          en: 'Create New Group',
          es: 'Crear Nuevo Grupo'
        },
        'groups.select': {
          en: 'Select a Group',
          es: 'Seleccionar un Grupo'
        },
        'groups.metrics.subsidiaries': {
          en: 'Total Subsidiaries',
          es: 'Total de Subsidiarias'
        },
        'groups.metrics.employees': {
          en: 'Total Employees',
          es: 'Total de Empleados'
        },
        'groups.metrics.growth': {
          en: 'Growth Rate',
          es: 'Tasa de Crecimiento'
        },
        'groups.metrics.performance': {
          en: 'Performance Index',
          es: 'Índice de Rendimiento'
        },

        // Auth
        'auth.hasAccount': {
          en: 'Already have an account?',
          es: '¿Ya tienes una cuenta?'
        },
        'auth.forgotPassword': {
          en: 'Forgot your password?',
          es: '¿Olvidaste tu contraseña?'
        },
        'auth.rememberMe': {
          en: 'Remember me',
          es: 'Recordarme'
        },

        // Settings
        'settings.appearance': {
          en: 'Appearance',
          es: 'Apariencia'
        },
        'settings.notifications': {
          en: 'Notifications',
          es: 'Notificaciones'
        },
        'settings.privacy': {
          en: 'Privacy & Security',
          es: 'Privacidad y Seguridad'
        },

        // Common Actions
        'actions.save': {
          en: 'Save Changes',
          es: 'Guardar Cambios'
        },
        'actions.cancel': {
          en: 'Cancel',
          es: 'Cancelar'
        },
        'actions.edit': {
          en: 'Edit',
          es: 'Editar'
        },
        'actions.delete': {
          en: 'Delete',
          es: 'Eliminar'
        },
        'actions.create': {
          en: 'Create',
          es: 'Crear'
        },
        'actions.search': {
          en: 'Search',
          es: 'Buscar'
        },
        'actions.filter': {
          en: 'Filter',
          es: 'Filtrar'
        },
        'actions.sort': {
          en: 'Sort',
          es: 'Ordenar'
        },
        'actions.view': {
          en: 'View',
          es: 'Ver'
        },
        'actions.share': {
          en: 'Share',
          es: 'Compartir'
        },

        // Metrics
        'metrics.views': {
          en: 'views',
          es: 'vistas'
        },
        'metrics.likes': {
          en: 'likes',
          es: 'me gusta'
        },
        'metrics.comments': {
          en: 'comments',
          es: 'comentarios'
        },
        'metrics.impact': {
          en: 'Impact Score',
          es: 'Puntuación de Impacto'
        }
      },
      setLanguage: (language) => set({ currentLanguage: language }),
    }),
    {
      name: 'language-store',
    }
  )
);