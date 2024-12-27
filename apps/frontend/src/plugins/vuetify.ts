// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const theme38c3: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#0F000A',
    surface: '#190B2F',
    'surface-bright': '#261A66',
    'surface-light': '#29114C',
    'surface-variant': '#6A5FDB',
    'on-surface-variant': '#B2AAFF',
    primary: '#FF5053',
    'primary-darken-1': '#640002',
    secondary: '#B2AAFF',
    'secondary-darken-1': '#6A5FDB',
    error: '#FF5053',
    info: '#08B2E3',
    success: '#57A773',
    warning: '#8D80AD',
  },
  variables: {
    'border-color': '#FEF2FF',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#B2AAFF',
    'theme-on-kbd': '#0F000A',
    'theme-code': '#190B2F',
    'theme-on-code': '#FEF2FF',
    'body-font-family': 'uncut-sans, Roboto, sans-serif',
    'heading-font-family': 'pilowlava, Roboto, sans-serif',
  },
}

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'theme38c3',
    themes: {
      theme38c3
    }
  }
})