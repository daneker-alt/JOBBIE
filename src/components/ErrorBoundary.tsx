import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Unhandled UI error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-canvas flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold tracking-tightest text-ink">Что-то пошло не так</h1>
            <p className="mt-3 text-muted leading-relaxed">
              Попробуйте обновить страницу. Если ошибка повторяется, свяжитесь с поддержкой.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white bg-brand-blue hover:opacity-85 px-6 py-3 rounded-md transition-opacity"
            >
              Обновить страницу
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
